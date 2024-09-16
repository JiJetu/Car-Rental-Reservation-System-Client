import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { navRoutes } from "./navRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: navRoutes,
  },
]);

export default router;
