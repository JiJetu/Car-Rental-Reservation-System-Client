import { Button, Layout, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "./ProtectedRoute";

const { Header, Content } = Layout;
const { Title } = Typography;

const UserAdminLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <ProtectedRoute>
      <Layout style={{ height: "100%", backgroundColor: "#f0f2f5" }}>
        <Sidebar />
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: "0 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title level={3} style={{ margin: 0, color: "#001529" }}>
              {user?.role === "admin"
                ? "Admin"
                : user?.role === "user" && "User"}{" "}
              Dashboard
            </Title>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                borderRadius: "8px",
                backgroundColor: "#FF4D4F",
                borderColor: "#FF4D4F",
                fontWeight: "500",
              }}
            >
              Logout
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              minHeight: "calc(100vh - 112px)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default UserAdminLayout;
