import { Button, Layout, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useMode } from "@/hooks/useMode";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { modeItem } from "@/constant/mode";
import { useEffect, useState } from "react";
import moment from "moment";
import { userRole } from "@/constant/role";

const { Header, Content } = Layout;
const { Title } = Typography;

const UserAdminLayout = () => {
  // getting RTK local saving info for wishListCarInfo
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  // getting current mode and change handler
  const { changeMode, mode } = useMode();

  // for showing date and time
  const [currentDateTime, setCurrentDateTime] = useState(moment());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // logout handler
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Layout
      className={`h-full ${
        mode === modeItem.DARK ? "dark:bg-[#1a1919]" : "bg-[#f0f2f5]"
      }`}
    >
      {/* sidebar */}
      <Sidebar mode={mode} />
      <Layout>
        {/* header of dashboard */}
        <Header
          className={`flex justify-between items-center px-6 shadow-sm ${
            mode === modeItem.DARK ? "dark:bg-[#1a1919]" : "bg-white"
          }`}
        >
          <Title level={4} style={{ margin: 0, color: "#001529" }}>
            {user?.role === userRole.ADMIN ? (
              <p className="mt-3 dark:text-white">
                Hello, <span className="text-green-500">Admin</span>{" "}
                {user?.name} <br />
                <span className="text-[12px]">
                  {currentDateTime.format("MMMM Do YYYY, h:mm:ss A")}
                </span>
              </p>
            ) : (
              user?.role === userRole.USER && (
                <p className="mt-3 dark:text-white">
                  Hello, {user?.name} <br />
                  <span className="text-[12px]">
                    {currentDateTime.format("MMMM Do YYYY")}
                  </span>
                </p>
              )
            )}
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
          {/* main layout section */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserAdminLayout;
