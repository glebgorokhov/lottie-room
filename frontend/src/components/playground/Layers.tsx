import { Icon } from "@iconify/react";
import type { Layer } from "@lottiefiles/lottie-types";
import clsx from "clsx";

export type LayerType = Layer.Value & {
  layers?: LayerType[];
};

type LayersProps = {
  layers: LayerType[];
  level?: number;
};

type LayerProps = {
  layer: LayerType;
  level?: number;
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

function Layer({ layer, level = 0 }: LayerProps) {
  function deleteLayer() {}

  return (
    <div className="not-last:border-b border-t-border">
      <div className="flex items-center gap-3 hover:text-t-text px-3 py-2 group">
        <div className="text-sm leading-relaxed flex-1 truncate">
          {layer.nm}
        </div>
        <div className="flex gap-1 shrink-0 group-hover:opacity-100 opacity-0">
          <SquareButton icon="ri:close-line" onClick={() => {}} />
        </div>
      </div>

      {!!layer.layers?.length && (
        <div className="border-y border-l border-t-border ml-3 mb-3 rounded-l-lg overflow-hidden">
          <Layers layers={layer.layers} level={level + 1} />
        </div>
      )}
    </div>
  );
}

export default function Layers({ layers, level = 0 }: LayersProps) {
  return (
    <div>
      {layers.map((layer, index) => (
        <Layer key={level + "-" + index} layer={layer} level={level} />
      ))}
    </div>
  );
}
