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
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { userRole } from "@/constant/role";
import ForgetPassword from "@/pages/forgotPassword/ForgetPassword";
import ResetPassword from "@/pages/forgotPassword/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: routesGenerator(mainPath),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={userRole.ADMIN}>
        <UserAdminLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role={userRole.USER}>
        <UserAdminLayout />
      </ProtectedRoute>
    ),
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
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
