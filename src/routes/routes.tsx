import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { navRoutes } from "./navRoutes";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: navRoutes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default router;
