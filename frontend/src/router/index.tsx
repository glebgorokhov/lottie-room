import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../ErrorPage.tsx";
import MainPage from "../routes/MainPage.tsx";
import PlaygroundLoader from "../routes/Playground.tsx";
import Root from "../routes/Root.tsx";

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
