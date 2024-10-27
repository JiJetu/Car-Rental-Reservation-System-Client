import BookingHistory from "@/pages/user/BookingHistory";
import UserDashboard from "@/pages/user/UserDashboard";
import { HistoryOutlined } from "@ant-design/icons";
import { DashboardIcon } from "@radix-ui/react-icons";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardIcon fontSize={20} />,
    element: <UserDashboard />,
  },
  {
    name: "Booking History",
    path: "booking-history",
    icon: <HistoryOutlined size={20} />,
    element: <BookingHistory />,
  },
];
