import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";

import ErrorPage from "../ErrorPage.tsx";

export default function PlaygroundGenerator() {
  const { lottieId } = useParams();

  if (!lottieId) {
    return <ErrorPage />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div>
        <Icon
          icon="ri:loader-4-line"
          className="w-10 h-10 animate-spin mx-auto"
        />
        <div className="mt-3">Preparing the playground for animation...</div>
      </div>
    </div>
  );
}
