import { Button, Layout, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "./ProtectedRoute";
import { useMode } from "@/hooks/useMode";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { modeItem } from "@/constant/mode";

const { Header, Content } = Layout;
const { Title } = Typography;

const UserAdminLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { changeMode, mode } = useMode();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <ProtectedRoute>
      <Layout
        className={`h-full ${
          mode === modeItem.DARK ? "dark:bg-[#1a1919]" : "bg-[#f0f2f5]"
        }`}
      >
        <Sidebar />
        <Layout>
          <Header
            className={`flex justify-between items-center px-6 shadow-sm ${
              mode === modeItem.DARK ? "dark:bg-[#1a1919]" : "bg-white"
            }`}
          >
            <Title level={3} style={{ margin: 0, color: "#001529" }}>
              <span className="dark:text-white">
                {user?.role === "admin"
                  ? "Admin"
                  : user?.role === "user" && "User"}{" "}
                Dashboard
              </span>
            </Title>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Button
                className="bg-white text-slate-800 hover:bg-white"
                onClick={changeMode}
              >
                {mode === modeItem.DARK ? <SunIcon /> : <MoonIcon />}
              </Button>
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
            </div>
          </Header>
          <Content
            className={`rounded-lg ${
              mode === modeItem.DARK
                ? "dark:bg-[#1a1919] dark:text-white dark:border-2 dark:border-[#4d4b4b] m-0 p-12 shadow-none"
                : "bg-white m-6 p-6 shadow-lg"
            }`}
            style={{ minHeight: "calc(100vh - 112px)" }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ProtectedRoute>
  );
};

export default UserAdminLayout;
