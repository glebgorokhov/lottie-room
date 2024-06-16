import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen.tsx";

export default function Root() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
}
