import { Icon } from "@iconify/react";
import { Animation } from "@lottiefiles/lottie-types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { createContext, useContext, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { useShallow } from "zustand/react/shallow";

import Button from "../components/Button.tsx";
import Logo from "../components/icons/Logo.tsx";
import LoadingScreen from "../components/LoadingScreen.tsx";
import AnimationPreview from "../components/playground/AnimationPreview.tsx";
import ChatComponent from "../components/playground/Chat.tsx";
import LayerActions from "../components/playground/LayerActions.tsx";
import Layers from "../components/playground/Layers.tsx";
import MultipleLayerActions from "../components/playground/MultipleLayerActions.tsx";
import Settings from "../components/playground/Settings.tsx";
import ErrorPage from "../ErrorPage.tsx";
import useAPI from "../hooks/useAPI.ts";
import useMessagesFromSocket from "../hooks/useMessagesFromSocket.tsx";
import useUpdatesFromSocket from "../hooks/useUpdatesFromSocket.tsx";
import usePlaygroundStore from "../stores/playgroundStore.ts";
import { SocketMessage } from "../types";

export const socketContext = createContext<null | WebSocketHook<SocketMessage>>(
  null
);

export default function PlaygroundLoader() {
  const { playgroundId } = useParams();
  const { getPlaygroundById } = useAPI();
  const {
    setPlaygroundId,
    setJSON,
    setMessages,
    setInitialJSON,
    json,
    clearSelectedLayers,
  } = usePlaygroundStore(
    useShallow(
      ({
        json,
        setPlaygroundId,
        setJSON,
        setMessages,
        setInitialJSON,
        clearSelectedLayers,
      }) => ({
        json,
        setPlaygroundId,
        setJSON,
        setMessages,
        setInitialJSON,
        clearSelectedLayers,
      })
    )
  );

  const { data, isFetched, error } = useQuery({
    queryKey: [playgroundId],
    queryFn: () => (playgroundId ? getPlaygroundById(playgroundId) : undefined),
    retry: false,
  });

  const socket = useWebSocket<SocketMessage>(
    `${import.meta.env.VITE_WS_ENDPOINT}v1/playground/${playgroundId}/ws`
  );

  useEffect(() => {
    const parsedJson = data?.json ? (JSON.parse(data.json) as Animation) : null;

    setJSON(parsedJson);
    setInitialJSON(parsedJson);
    setPlaygroundId(data?.id ?? "");
    setMessages(data?.Message ?? []);
    clearSelectedLayers();
  }, [data]);

  if (!playgroundId) {
    return <ErrorPage />;
  }

  if (!isFetched) {
    return <LoadingScreen />;
  }

  if (!data || error) {
    return <ErrorPage />;
  }

  if (!json) {
    return <LoadingScreen />;
  }

  return (
    <socketContext.Provider value={socket}>
      <Playground />
    </socketContext.Provider>
  );
}

export function Playground() {
  const { readyState } = useContext(socketContext)!;

  useMessagesFromSocket();
  useUpdatesFromSocket();

  const { json, selectedLayers } = usePlaygroundStore(
    useShallow(({ json, selectedLayers }) => ({
      json,
      selectedLayers,
    }))
  );

  const [copied, setCopied] = useState(false);

  const style = {
    layout:
      "overflow-hidden flex flex-col lg:h-screen lg:grid lg:grid-cols-[18rem,1fr,18rem]",
    col: "flex flex-col px-3 lg:p-3 last:mt-3 lg:last:mt-0 last:pb-3 gap-3 flex-1 overflow-hidden",
    card: "theme-neutral-light flex flex-col bg-t-bg text-t-text-light border border-t-border rounded-2xl overflow-auto relative shadow-sm",
    cardTitle:
      "text-t-text text-base border-b border-t-border px-3 py-2 heading sticky top-0 bg-t-bg z-[1]",
    cardContent: "p-3 w-full",
    animationCol: "order-[-1] h-[100vw] lg:order-none lg:h-auto p-4",
    layersCard: "max-h-[15rem] lg:max-h-none",
    discussionCard: "",
    offlineCard: "shrink-0 !theme-error !border-0",
    offlineTitle: "text-base heading text-t-text font-semibold",
    offlineText: "text-sm mt-1",
    offlineButton: "mt-3",
  };

  return (
    <div className={style.layout}>
      <div className={style.col}>
        {/* Offline */}
        {readyState === ReadyState.CLOSED && (
          <div className={clsx(style.card, style.offlineCard)}>
            <div className={style.cardContent}>
              <div className={style.offlineTitle}>You are offline</div>
              <div className={style.offlineText}>
                Connection has been closed. Please refresh your page.
              </div>
              <Button
                title="Refresh"
                onClick={() => location.reload()}
                preIcon="ri:refresh-line"
                roundedClass="rounded-xl"
                themeClass="theme-error-tint hover:theme-neutral-light"
                className={style.offlineButton}
              />
            </div>
          </div>
        )}

        {/* Header */}
        <div className={clsx(style.card, "shrink-0")}>
          <div className={style.cardContent}>
            <Logo className="h-6 text-t-text" />
            {/* Back */}
            <Link
              to="/"
              className="flex items-center gap-1.5 mt-2.5 transition-colors hover:text-t-text"
            >
              <Icon icon="tabler:arrow-left" className="w-4 h-4" />
              <span>Back to Main Page</span>
            </Link>
            {/* Copy */}
            <CopyToClipboard
              text={location.href}
              onCopy={() => setCopied(true)}
            >
              <div
                className={clsx(
                  "flex items-center gap-1.5 mt-1 -mb-1 transition-[color] cursor-pointer",
                  {
                    "theme-success text-t-bg hover:theme-success-tint": copied,
                    "hover:text-t-text": !copied,
                  }
                )}
              >
                <Icon
                  icon={copied ? "ri:check-line" : "ri:link"}
                  className="w-4 h-4"
                />
                <span>{copied ? "Link copied!" : "Copy link"}</span>
              </div>
            </CopyToClipboard>
          </div>
        </div>

        {/* Layers */}
        <div className={clsx(style.card, style.layersCard, "flex-1")}>
          <div className={style.cardTitle}>
            <div className="flex items-center justify-between gap-3">
              <div>Layers</div>
              <div className="hidden lg:block text-xs text-t-text-light font-normal">
                Shift + Click for multi-select
              </div>
            </div>
          </div>
          {json?.layers?.length ? (
            <Layers layers={json.layers} path="layers" className="py-1" />
          ) : (
            <div className="text-t-text-light p-3 text-sm">
              No layers available.
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
      <div className={style.animationCol}>
        <AnimationPreview />
      </div>

      <div className={style.col}>
        {/* Layer properties */}
        {selectedLayers.length === 1 && (
          <div
            className={clsx(style.card, "shrink-0 max-h-[40vh] overflow-auto")}
          >
            <div className={style.cardTitle}>Selected layer</div>
            <div className={style.cardContent}>
              <LayerActions layerKey={selectedLayers[0]} />
            </div>
          </div>
        )}

        {/* Multiple selection */}
        {selectedLayers.length > 1 && (
          <div
            className={clsx(style.card, "shrink-0 max-h-[50vh] overflow-auto")}
          >
            <div className={style.cardTitle}>
              Selected layers ({selectedLayers.length})
            </div>
            <div className={style.cardContent}>
              <MultipleLayerActions />
            </div>
          </div>
        )}

        {/* Settings */}
        <div className={clsx(style.card, "shrink-0")}>
          <div className={style.cardTitle}>Settings</div>
          <div className={style.cardContent}>
            <Settings />
          </div>
        </div>

        {/* Discussion */}
        <div className={clsx(style.card, "h-[24rem] lg:h-auto lg:flex-grow")}>
          <div className={style.cardTitle}>Discussion</div>
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}
