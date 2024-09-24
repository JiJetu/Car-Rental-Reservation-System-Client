import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import ProtectedRoute from "./ProtectedRoute";

const { Header, Content } = Layout;

const UserAdminLayout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <ProtectedRoute>
      <Layout style={{ height: "100%" }}>
        <Sidebar />
        <Layout>
          <Header>
            <Button onClick={handleLogout}>Logout</Button>{" "}
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default UserAdminLayout;
