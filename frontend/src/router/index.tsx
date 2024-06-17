import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../ErrorPage.tsx";

const MainPage = lazy(() => import("../routes/MainPage.tsx"));
const PlaygroundLoader = lazy(() => import("../routes/Playground.tsx"));
const Root = lazy(() => import("../routes/Root.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/:playgroundId",
        element: <PlaygroundLoader />,
      },
    ],
  },
]);

export default router;
