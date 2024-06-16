import Lottie from "lottie-react";
import { useShallow } from "zustand/react/shallow";

import usePlaygroundStore from "../../stores/playgroundStore.ts";

export default function AnimationPreview() {
  const { json } = usePlaygroundStore(
    useShallow(({ json }) => ({
      json,
    }))
  );

  if (!json) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full relative">
      <Lottie animationData={json} loop={true} className="absolute inset-0" />
    </div>
  );
}
