import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../ErrorPage.tsx";
import MainPage from "../routes/MainPage.tsx";
import Playground from "../routes/Playground.tsx";
import PlaygroundGenerator from "../routes/PlaygroundGenerator.tsx";
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
        path: "/playground",
        element: <Playground />,
      },
      {
        path: "/lottie/:lottieId",
        element: <PlaygroundGenerator />,
      },
    ],
  },
]);

export default router;
