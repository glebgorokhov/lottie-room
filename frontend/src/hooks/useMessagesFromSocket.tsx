import { useContext, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { SocketMessage } from "../../../types/playgroundSocket.ts";
import { socketContext } from "../routes/Playground.tsx";
import usePlaygroundStore from "../stores/playgroundStore.ts";

export default function useMessagesFromSocket() {
  const { lastMessage: socketLastMessage } = useContext(socketContext)!;

  const addMessage = usePlaygroundStore(
    useShallow(({ addMessage }) => addMessage)
  );

  useEffect(() => {
    if (socketLastMessage !== null) {
      const data = JSON.parse(socketLastMessage?.data) as SocketMessage;

      if (data.type === "message") {
        addMessage(data);
      }
    }
  }, [socketLastMessage]);
}
