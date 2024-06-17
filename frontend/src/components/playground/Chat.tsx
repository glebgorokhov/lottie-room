import clsx from "clsx";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { ReadyState } from "react-use-websocket";
import { useShallow } from "zustand/react/shallow";

import { socketContext } from "../../routes/Playground.tsx";
import usePlaygroundStore from "../../stores/playgroundStore.ts";
import Button from "../Button.tsx";

const ChatComponent = () => {
  const socket = useContext(socketContext)!;

  const messages = usePlaygroundStore(useShallow(({ messages }) => messages));

  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const messagesContainer = useRef<HTMLDivElement | null>(null);

  const { sendMessage: socketSendMessage, readyState: socketReadyState } =
    socket || {};

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = { type: "message", username, text: input };
    socketSendMessage?.(JSON.stringify(message));
    setInput("");
  };

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }
  }, [messages]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[socketReadyState || ReadyState.CLOSED];

  const themeByStatus = {
    [ReadyState.CONNECTING]: "bg-blue-500 text-white",
    [ReadyState.OPEN]: "theme-success bg-t-bg text-t-text",
    [ReadyState.CLOSING]: "theme-error bg-t-bg text-t-text",
    [ReadyState.CLOSED]: "theme-error bg-t-bg text-t-text",
    [ReadyState.UNINSTANTIATED]: "bg-gray-500 text-white",
  }[socketReadyState || ReadyState.CLOSED];

  const style = {
    form: "space-y-2.5 p-3 border-t border-t-border",
    messages: "flex-1 overflow-y-scroll scroll-smooth items-end flex p-3 gap-3",
    messagesWrapper:
      "mt-auto w-full flex flex-col items-start gap-3 justify-end",
    message:
      "theme-neutral-light-tint dark:theme-neutral-tint bg-t-bg text-t-text-light border border-t-border rounded-xl px-2.5 py-1.5",
    input:
      "flex-1 h-10 w-full appearance-none min-w-0 border border-t-border text-t-text placeholder-t-text-light rounded-xl text-sm px-3",
    messageAuthor: "text-sm leading-normal",
    messageText: "text-t-text text-base leading-normal",
  };

  return (
    <>
      {/* Messages */}
      <div className={style.messages} ref={messagesContainer}>
        <div className={style.messagesWrapper}>
          <div className="sticky top-0 w-full flex justify-center">
            <div
              className={clsx(
                themeByStatus,
                "px-2.5 rounded-full text-sm font-bold"
              )}
            >
              {connectionStatus}
            </div>
          </div>

          {messages.length ? (
            messages.map((msg, n) => (
              <div className={style.message} key={n}>
                <div className={style.messageAuthor}>{msg.username}</div>
                <div className={style.messageText}>{msg.text}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm px-2 pb-2">
              There are no messages yet. Be the first to comment this out!
            </div>
          )}
        </div>
      </div>
      {/* Message form */}
      <form onSubmit={sendMessage} className={style.form}>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => setUsername(e.target.value)}
          className={style.input}
          required
          name="name"
          minLength={2}
        />
        <div className="flex gap-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            placeholder="Your message..."
            name="message"
            required
          />
          <Button
            title="Send"
            type="submit"
            roundedClass="rounded-xl"
            themeClass="theme-brand-tint hover:theme-brand"
          />
        </div>
      </form>
    </>
  );
};

export default ChatComponent;
