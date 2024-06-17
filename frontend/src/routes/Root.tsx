import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import useDarkMode from "use-dark-mode";

import LoadingScreen from "../components/LoadingScreen.tsx";
import darkModeConfig from "../services/darkModeConfig.ts";

export default function Root() {
  useDarkMode(false, darkModeConfig);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}
