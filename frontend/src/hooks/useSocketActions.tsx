import { debounce } from "radash";
import { useContext } from "react";
import { useShallow } from "zustand/react/shallow";

import { socketContext } from "../routes/Playground.tsx";
import usePlaygroundStore from "../stores/playgroundStore.ts";
import {
  SocketDeleteArrayItemMessage,
  SocketUpdatePropMessage,
} from "../types";

export default function useSocketActions() {
  const { sendMessage } = useContext(socketContext)!;

  const { updateProp, deleteArrayItem } = usePlaygroundStore(
    useShallow(({ updateProp, deleteArrayItem }) => ({
      updateProp,
      deleteArrayItem,
    }))
  );

  const debouncedSocketPropUpdate = debounce(
    { delay: 50 },
    (key: string, value: any) => {
      const socketMessage: SocketUpdatePropMessage = {
        type: "updateProp",
        path: key,
        value: JSON.stringify(value),
      };

      sendMessage(JSON.stringify(socketMessage));
    }
  );

  function updatePropAndSocket(key: string, value: any) {
    updateProp(key, value);
    debouncedSocketPropUpdate(key, value);
  }

  function deleteArrayItemAndUpdateSocket(key: string, index: number) {
    deleteArrayItem(key, index);

    const socketMessage: SocketDeleteArrayItemMessage = {
      type: "deleteArrayItem",
      path: key,
      index,
    };

    sendMessage(JSON.stringify(socketMessage));
  }

  return {
    updateProp: updatePropAndSocket,
    deleteArrayItem: deleteArrayItemAndUpdateSocket,
  };
}
