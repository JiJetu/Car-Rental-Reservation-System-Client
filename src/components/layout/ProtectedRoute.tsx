import { logOut, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = { children: ReactNode; role: string | undefined };

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  useEffect(() => {
    if (role !== undefined && role !== user?.role) {
      dispatch(logOut());
    }
  }, [dispatch, role, user]);

  if (!token || (role !== undefined && role !== user?.role)) {
    return <Navigate to={"/signIn"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
