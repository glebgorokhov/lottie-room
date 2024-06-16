import { useContext, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { SocketMessage } from "../../../types/playgroundSocket.ts";
import { socketContext } from "../routes/Playground.tsx";
import usePlaygroundStore from "../stores/playgroundStore.ts";

export default function useUpdatesFromSocket() {
  const { lastMessage: socketLastMessage } = useContext(socketContext)!;

  const { updateProp, deleteArrayItem, setJSON } = usePlaygroundStore(
    useShallow(({ updateProp, deleteArrayItem, setJSON }) => ({
      updateProp,
      deleteArrayItem,
      setJSON,
    }))
  );

  useEffect(() => {
    if (socketLastMessage !== null) {
      const data = JSON.parse(socketLastMessage?.data) as SocketMessage;

      switch (data.type) {
        case "updateProp":
          updateProp(data.path, JSON.parse(data.value));
          break;

        case "deleteArrayItem":
          deleteArrayItem(data.path, data.index);
          break;

        case "update":
          setJSON(JSON.parse(data.json));
          break;

        default:
          break;
      }
    }
  }, [socketLastMessage]);
}
