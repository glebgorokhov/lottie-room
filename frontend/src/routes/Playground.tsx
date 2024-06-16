import { Icon } from "@iconify/react";
import { Animation } from "@lottiefiles/lottie-types";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

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
import usePlaygroundStore from "../stores/playgroundStore.ts";

export default function PlaygroundLoader() {
  const { playgroundId } = useParams();
  const { getPlaygroundById } = useAPI();
  const { setPlaygroundId, setJSON, setMessages, setInitialJSON, json } =
    usePlaygroundStore(
      useShallow(
        ({ setPlaygroundId, setJSON, setMessages, setInitialJSON, json }) => ({
          setPlaygroundId,
          setJSON,
          setMessages,
          setInitialJSON,
          json,
        })
      )
    );

  const { data, isFetched, error } = useQuery({
    queryKey: [playgroundId],
    queryFn: () => (playgroundId ? getPlaygroundById(playgroundId) : undefined),
    retry: false,
  });

  useEffect(() => {
    const json = data?.json ? (JSON.parse(data.json) as Animation) : null;

    setJSON(json);
    setInitialJSON(json);
    setPlaygroundId(data?.id ?? "");
    setMessages(data?.Message ?? []);
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

  return <Playground />;
}

export function Playground() {
  const { initialJSON, json, selectedLayers } = usePlaygroundStore(
    useShallow(({ initialJSON, json, selectedLayers }) => ({
      initialJSON,
      json,
      selectedLayers,
    }))
  );

  const [copied, setCopied] = useState(false);

  const style = {
    col: "flex flex-col p-3 gap-3 flex-1 overflow-hidden",
    card: "theme-neutral-light flex flex-col bg-t-bg text-t-text-light border border-t-border rounded-2xl overflow-auto relative shadow-sm",
    cardTitle:
      "text-t-text text-base border-b border-t-border px-3 py-2 heading sticky top-0 bg-t-bg",
    cardContent: "p-3 w-full",
    animationCol: "p-4",
  };

  useEffect(() => {
    console.log("Original json", initialJSON);
  }, [initialJSON]);

  useEffect(() => {
    console.log("Current json", json);
  }, [json]);

  return (
    <>
      <div className="overflow-hidden h-screen grid grid-cols-[18rem,1fr,18rem]">
        <div className={style.col}>
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
                      "theme-success text-t-bg hover:theme-success-tint":
                        copied,
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
          <div className={clsx(style.card, "flex-1")}>
            <div className={style.cardTitle}>
              <div className="flex items-center justify-between gap-3">
                <div>Layers</div>
                <div className="text-xs text-t-text-light font-normal">
                  Shift + Click for multi-select
                </div>
              </div>
            </div>
            {!!json && (
              <Layers layers={json.layers} path="layers" className="py-1" />
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
              className={clsx(
                style.card,
                "shrink-0 max-h-[40vh] overflow-auto"
              )}
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
              className={clsx(
                style.card,
                "shrink-0 max-h-[50vh] overflow-auto"
              )}
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
          <div className={clsx(style.card, "flex-grow")}>
            <div className={style.cardTitle}>Discussion</div>
            <ChatComponent />
          </div>
        </div>
      </div>
    </>
  );
}
