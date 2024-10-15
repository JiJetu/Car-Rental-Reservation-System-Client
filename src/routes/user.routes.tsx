import UserDashboard from "@/pages/user/UserDashboard";
import { DashboardIcon } from "@radix-ui/react-icons";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardIcon fontSize={20} />,
    element: <UserDashboard />,
  },
];
