import type { Layer } from "@lottiefiles/lottie-types";
import { get } from "radash";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import usePlaygroundStore from "../../stores/playgroundStore.ts";
import { extractColorsFromLayer } from "../../utils/extractColors.ts";
import Button from "../Button.tsx";
import ColorEditor from "./ColorEditor.tsx";
import ScaleEditor from "./ScaleEditor.tsx";

type LayerActionsProps = {
  layerKey: string;
};

export default function LayerActions({ layerKey }: LayerActionsProps) {
  const [path, index] = [
    layerKey.split(".").slice(0, -1).join("."),
    Number(layerKey.split(".").slice(-1)[0]),
  ];

  const { deleteArrayItem, selectLayer, json } = usePlaygroundStore(
    useShallow(({ deleteArrayItem, selectedLayers, selectLayer, json }) => ({
      deleteArrayItem,
      selectedLayers,
      selectLayer,
      json,
    }))
  );

  function deleteLayer() {
    selectLayer(layerKey);
    deleteArrayItem(path, index);
  }

  const currentLayer = useMemo(
    () => get(json, layerKey) as Layer.Value,
    [layerKey, json]
  );

  const layerColors = useMemo(
    () => extractColorsFromLayer(currentLayer),
    [currentLayer]
  );

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm heading font-semibold text-t-text mb-1">
          Scale
        </div>
        <ScaleEditor path={`${layerKey}.ks.s.k`} />
      </div>

      {!!Object.keys(layerColors).length && (
        <div>
          <div className="text-sm heading font-semibold text-t-text mb-1">
            Colors
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(layerColors).map(([key, color]) => (
              <ColorEditor
                color={color}
                colorPath={`${layerKey}.${key}`}
                key={key}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        <Button
          title="Delete layer"
          onClick={deleteLayer}
          preIcon="ri:delete-bin-2-line"
          themeClass="theme-error hover:theme-error-tint"
          roundedClass="rounded-xl"
          block
        />
        <Button
          title="Remove selection"
          onClick={() => selectLayer(layerKey)}
          roundedClass="rounded-xl"
          themeClass=""
          preIcon="ri:close-line"
          className="!border !border-t-border hover:!border-t-text"
          block
        />
      </div>
    </div>
  );
}
