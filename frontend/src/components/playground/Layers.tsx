import { Icon } from "@iconify/react";
import type { Layer } from "@lottiefiles/lottie-types";
import clsx from "clsx";
import { useEffect, useReducer } from "react";
import { useShallow } from "zustand/react/shallow";

import useShift from "../../hooks/useShift.tsx";
import useSocketActions from "../../hooks/useSocketActions.tsx";
import usePlaygroundStore from "../../stores/playgroundStore.ts";

export type LayerType = Layer.Value & {
  layers?: LayerType[];
};

type LayersProps = {
  layers: LayerType[];
  path: string;
  index?: number;
  level?: number;
  className?: string;
};

type LayerProps = {
  layer: LayerType;
  path: string;
  index: number;
  level: number;
};

type SquareButtonProps = {
  icon: string;
  onClick: () => void;
  className?: string;
};

function SquareButton({ icon, onClick, className }: SquareButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "flex w-5 h-5 rounded border border-t-border p-0.5 shrink-0 transition-colors hover:text-t-text hover:border-t-text",
        className
      )}
      onClick={onClick}
    >
      <Icon icon={icon} className="w-full h-full" />
    </button>
  );
}

function Layer({ layer, index, path, level }: LayerProps) {
  const layerKey = `${path}.${index}`;
  const shiftUsed = useShift();
  const { deleteArrayItem } = useSocketActions();
  const { selectLayer, selectedLayers, clearSelectedLayers } =
    usePlaygroundStore(
      useShallow(({ selectLayer, selectedLayers, clearSelectedLayers }) => ({
        selectLayer,
        selectedLayers,
        clearSelectedLayers,
      }))
    );

  function deleteLayer() {
    selectedLayers
      .filter((l) => l.startsWith(layerKey))
      .forEach((l) => {
        selectLayer(l);
      });

    deleteArrayItem(path, index);
  }

  function handleSelectLayer() {
    if (!shiftUsed) {
      clearSelectedLayers();
      if (!selectedLayers.includes(layerKey)) {
        selectLayer(layerKey);
      }
      return;
    }

    selectLayer(layerKey);
  }

  return (
    <div className="select-none">
      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-1.5 group border border-transparent hover:border-t-text",
          selectedLayers.includes(layerKey)
            ? "theme-neutral-light-tint dark:theme-neutral-tint bg-t-bg text-t-text font-semibold"
            : "hover:text-t-text"
        )}
        onClick={handleSelectLayer}
      >
        {Array(level)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="pl-1">
              <div className="w-1 h-1 rounded-full bg-current opacity-50"></div>
            </div>
          ))}
        <div className="text-sm leading-relaxed flex-1 truncate">
          {layer.nm}
        </div>
        <div className="flex gap-1 shrink-0 group-hover:opacity-100 opacity-0">
          <SquareButton icon="ri:close-line" onClick={deleteLayer} />
        </div>
      </div>

      {!!layer.layers?.length && (
        <Layers
          layers={layer.layers}
          path={path + "." + index + ".layers"}
          index={index}
          level={level + 1}
        />
      )}
    </div>
  );
}

export default function Layers({
  layers,
  path,
  level = 0,
  className,
}: LayersProps) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <div className={className}>
      {layers.map((layer, index) => (
        <Layer
          key={path + "." + index}
          layer={layer}
          path={path}
          index={index}
          level={level}
        />
      ))}
    </div>
  );
}
