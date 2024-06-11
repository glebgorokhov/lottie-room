import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../ErrorPage.tsx";
import Root from "../routes/Root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
