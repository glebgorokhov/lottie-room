import { useShallow } from "zustand/react/shallow";

import usePlaygroundStore from "../../stores/playgroundStore.ts";
import RangeInput from "../RangeInput.tsx";

export default function Settings() {
  const { json, updateProp } = usePlaygroundStore(
    useShallow(({ json, updateProp }) => ({
      json,
      updateProp,
    }))
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="heading text-sm text-t-text">Speed</p>
        <p className="text-t-text text-sm">{json?.fr} fps</p>
      </div>
      <RangeInput
        type="range"
        min={0}
        max={200}
        value={json?.fr}
        step={1}
        onChange={(e) => {
          updateProp("fr", Number(e.target.value));
        }}
        className="w-full"
      />
    </div>
  );
}
