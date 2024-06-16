import { useShallow } from "zustand/react/shallow";

import useSocketActions from "../../hooks/useSocketActions.tsx";
import usePlaygroundStore from "../../stores/playgroundStore.ts";
import Button from "../Button.tsx";

export default function MultipleLayerActions() {
  const { deleteArrayItem } = useSocketActions();
  const { selectedLayers, clearSelectedLayers } = usePlaygroundStore(
    useShallow(({ selectedLayers, clearSelectedLayers }) => ({
      selectedLayers,
      clearSelectedLayers,
    }))
  );

  function deleteLayers() {
    // Group indexes by path and sort indexes to avoid mistakes when removing
    // layers by the index (going from the end)
    const indexesToRemoveByPath = selectedLayers.reduce(
      (acc, layerKey) => {
        const [path, index] = [
          layerKey.split(".").slice(0, -1).join("."),
          Number(layerKey.split(".").slice(-1)[0]),
        ];

        if (acc[path]) {
          acc[path] = [...acc[path], index].sort((a, b) => b - a);
          return acc;
        }

        acc[path] = [index];

        return acc;
      },
      {} as Record<string, number[]>
    );

    Object.entries(indexesToRemoveByPath).forEach(([path, indexes]) => {
      indexes.forEach((index) => {
        deleteArrayItem(path, index);
      });
    });

    clearSelectedLayers();
  }

  return (
    <div className="space-y-3">
      <Button
        title="Delete layers"
        onClick={deleteLayers}
        preIcon="ri:delete-bin-2-line"
        themeClass="theme-error hover:theme-error-tint"
        roundedClass="rounded-xl"
        block
      />
      <Button
        title="Remove selection"
        onClick={clearSelectedLayers}
        roundedClass="rounded-xl"
        themeClass=""
        preIcon="ri:close-line"
        className="!border !border-t-border hover:!border-t-text"
        block
      />
    </div>
  );
}
