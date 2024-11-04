import { useGetUserQuery } from "@/redux/features/admin/user.api";
import { logOut, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = { children: ReactNode; role: string | undefined };

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const { data: userInfo } = useGetUserQuery(undefined);
  const dispatch = useAppDispatch();

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  console.log(userInfo);

  useEffect(() => {
    if (
      (role !== undefined && role !== user?.role) ||
      userInfo?.data?.isBlocked
    ) {
      dispatch(logOut());
    }
  }, [dispatch, role, user, userInfo?.data?.isBlocked]);

  if (
    !token ||
    (role !== undefined && role !== user?.role) ||
    userInfo?.data?.isBlocked
  ) {
    return <Navigate to={"/signIn"} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
