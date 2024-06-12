import { Icon } from "@iconify/react";
import clsx from "clsx";
import Lottie from "lottie-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button.tsx";
import Logo from "../components/icons/Logo.tsx";
import Layers from "../components/playground/Layers.tsx";
import mockPlaygroundData from "../mocks/mockPlaygroundData.ts";

export default function Playground() {
  const originalJSON = mockPlaygroundData.json;
  const [json, setJson] = useState({ ...originalJSON });
  const [scale, setScale] = useState(100);
  const [speed, setSpeed] = useState(originalJSON.fr);

  const style = {
    col: "flex flex-col p-3 gap-3 flex-1 overflow-hidden",
    card: "theme-neutral-light bg-t-bg text-t-text-light border border-t-border rounded-2xl overflow-auto shadow-sm",
    cardTitle:
      "text-t-text text-lg border-b border-t-border px-4 py-2.5 heading sticky top-0 bg-t-bg",
    cardContent: "p-4 w-full",
    animationCol: "p-4",
  };

  function getOriginalJSON() {
    return JSON.parse(JSON.stringify(originalJSON));
  }

  const computedJSON = useMemo(() => {
    const newJSON = getOriginalJSON();

    // ######
    // Speed
    // ######
    newJSON.fr = speed;
    // newJSON.assets = newJSON.assets.map((a) => ({
    //   ...a,
    //   fr: speed,
    // }));

    // ######
    // Scale
    // ######
    const newH = newJSON.h / (scale / 100);
    const newW = newJSON.w / (scale / 100);
    const hDiff = newH - newJSON.h;
    const wDiff = newW - newJSON.w;

    newJSON.h = newH;
    newJSON.w = newW;

    // function setTransform(layer: Record<string, any>) {
    //   const newLayer = layer;
    //   newLayer.ks = {
    //     ...(newLayer.ks || {}),
    //     p: {
    //       ...(newLayer.ks?.p || {}),
    //       k: newLayer.ks?.p?.k?.map((s, i) => {
    //         switch (i) {
    //           case 0:
    //             return s + wDiff / 2;
    //           case 1:
    //             return s + hDiff / 2;
    //           case 2:
    //             return s;
    //         }
    //       }) ?? [wDiff, hDiff],
    //     },
    //   };
    //   return newLayer;
    // }
    //
    // newJSON.assets = newJSON.assets.map((a) => ({
    //   ...a,
    //   layers: a?.layers?.map(setTransform) ?? undefined,
    // }));
    // newJSON.layers = newJSON.layers.map(setTransform);

    return newJSON;
  }, [originalJSON, speed, scale]);

  useEffect(() => {
    console.log("Original json", originalJSON);
  }, [originalJSON]);

  useEffect(() => {
    console.log("New json", computedJSON);
  }, [computedJSON]);

  return (
    <>
      <div className="overflow-hidden h-screen grid grid-cols-[18rem,1fr,18rem]">
        <div className={style.col}>
          <div className={style.card}>
            <div className={style.cardContent}>
              <Logo className="h-6 text-t-text" />
              <Link
                to="/"
                className="flex items-center gap-1.5 mt-2 transition-colors hover:text-t-text"
              >
                <Icon icon="tabler:arrow-left" className="w-4 h-4" />
                <span>Back to Main Page</span>
              </Link>
              <Button
                type="button"
                title="Upload JSON File"
                roundedClass="rounded-xl"
                className="mt-3"
                themeClass="theme-brand-tint hover:theme-brand"
                preIcon="ri:upload-line"
                block
              />
            </div>
          </div>
          <div className={clsx(style.card, "flex-1")}>
            <div className={style.cardTitle}>Layers</div>
            <Layers layers={[json]} />
          </div>
        </div>

        {/* Animation */}
        <div className={style.animationCol}>
          <div className="w-full h-full relative">
            <Lottie
              animationData={computedJSON}
              loop={true}
              className="absolute inset-0"
            />
          </div>
        </div>

        <div className={style.col}>
          {/* Settings */}
          <div className={style.card}>
            <div className={style.cardTitle}>Settings</div>
            <div className={style.cardContent}>
              <div>
                <p>Scale</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={scale}
                  onChange={(e) => {
                    setScale(Number(e.target.value));
                  }}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p>Speed</p>
                  <p className="text-t-text">{speed} fps</p>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={speed}
                  step={1}
                  onChange={(e) => {
                    setSpeed(Number(e.target.value));
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Discussion */}
          <div className={clsx(style.card, "flex-grow")}>
            <div className={style.cardTitle}>Discussion</div>
            <div className={style.cardContent}>Messages will be there</div>
          </div>
        </div>
      </div>
    </>
  );
}
