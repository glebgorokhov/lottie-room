import { get } from "radash";
import { useShallow } from "zustand/react/shallow";

import useSocketActions from "../../hooks/useSocketActions.tsx";
import usePlaygroundStore from "../../stores/playgroundStore.ts";
import RangeInput from "../RangeInput.tsx";

type ScaleEditorProps = {
  path: string;
};

export default function ScaleEditor({ path }: ScaleEditorProps) {
  const { updateProp } = useSocketActions();
  const { json } = usePlaygroundStore(
    useShallow(({ json }) => ({
      json,
    }))
  );

  const inputs = ["X", "Y", "Z"];

  return (
    <div className="space-y-2.5">
      {typeof get(json, `${path}.0`) === "number" ? (
        inputs.map((label, index) => (
          <div key={index}>
            <div className="relative">
              <div className=" absolute left-3 top-0 bottom-0 text-xs opacity-70 flex items-center">
                {label}
              </div>
              <input
                type="number"
                step={1}
                value={get(json, `${path}.${index}`) || 100}
                className="block border border-t-border h-9 appearance-none pl-6 pr-1 w-full rounded-t-xl text-t-text font-mono text-xs"
                min={0}
                onChange={(e) =>
                  updateProp(`${path}.${index}`, Number(e.target.value))
                }
              />
            </div>
            <RangeInput
              step={1}
              value={get(json, `${path}.${index}`) || 100}
              onChange={(e) =>
                updateProp(`${path}.${index}`, Number(e.target.value))
              }
              min={0}
              max={300}
              className="w-full -mt-0.5 block relative"
            />
          </div>
        ))
      ) : (
        <div className="text-sm">This layer is not scalable.</div>
      )}
    </div>
  );
}
