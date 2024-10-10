import { useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { dashboardItemsGenerator } from "@/utils/dashboardItemsGenerator";
import { userRole } from "@/constant/role";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import logo from "../../assets/images/preview (1).png";
import { adminPaths } from "@/routes/admin.routes";
import { userPaths } from "@/routes/user.routes";
import { navItemsGenerator } from "@/utils/navItemsGenerator";
import { mainPath } from "@/routes/navbar.routes";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = dashboardItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItems = dashboardItemsGenerator(userPaths, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        minHeight: "100vh",
        position: window.innerWidth <= 768 ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: 999,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink
          to={"/"}
          className="text-base md:text-xl font-semibold font-serif"
        >
          <div className="flex items-center gap-2">
            <img
              className="h-[20px] w-[20px] md:h-[50px] md:w-[50px]"
              src={logo}
              alt=""
            />
            <p className="hover:text-white flex gap-2 text-base">
              <span className="text-[#49af88] font-extrabold">Rental</span>
              Car
            </p>
          </div>
        </NavLink>
      </div>

      {/* Sidebar Menu */}
      <Menu theme="dark" mode="inline" items={sidebarItems} />

      <div className="divider divider-success p-2"></div>

      {/* Additional Nav Items */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={navItemsGenerator(mainPath)}
      />
    </Sider>
  );
};

export default Sidebar;
