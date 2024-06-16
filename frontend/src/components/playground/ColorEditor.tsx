import { AnimatedProperty } from "@lottiefiles/lottie-types";
import { get } from "radash";
import { useMemo } from "react";
import { RgbaColorPicker } from "react-colorful";
import { useShallow } from "zustand/react/shallow";

import usePlaygroundStore from "../../stores/playgroundStore.ts";
import { lottieColorToRgba, rgbaToLottieColor } from "../../utils/colors.ts";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover.tsx";

type ColorEditorProps = {
  color: AnimatedProperty.Color;
  colorPath: string;
};

export default function ColorEditor({ color, colorPath }: ColorEditorProps) {
  const { updateProp, json } = usePlaygroundStore(
    useShallow(({ json, updateProp }) => ({
      json,
      updateProp,
    }))
  );

  const rgba = useMemo(
    () => lottieColorToRgba(get(json, colorPath)),
    [color, json]
  );

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <div
          className="w-7 h-7 rounded-lg relative group"
          style={{
            backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
          }}
        >
          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 bg-gradient-to-t from-black/5 to-black/0 group-hover:ring-black/50"></div>
        </div>
      </PopoverTrigger>

      <PopoverContent>
        <RgbaColorPicker
          color={rgba}
          onChange={(newColor) =>
            updateProp(`${colorPath}.k`, rgbaToLottieColor(newColor))
          }
        />
      </PopoverContent>
    </Popover>
  );
}
