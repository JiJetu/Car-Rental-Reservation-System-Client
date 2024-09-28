import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import { routesGenerator } from "@/utils/routesGenerator";
import { mainPath } from "./navbar.routes";
import UserAdminLayout from "@/components/layout/UserAdminLayout";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import NotFoundPage from "@/pages/not-found-page/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: routesGenerator(mainPath),
  },
  {
    path: "/admin",
    element: <UserAdminLayout />,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <UserAdminLayout />,
    children: routesGenerator(userPaths),
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
