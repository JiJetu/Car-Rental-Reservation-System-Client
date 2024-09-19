import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { navRoutes } from "./navRoutes";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: navRoutes,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default router;
