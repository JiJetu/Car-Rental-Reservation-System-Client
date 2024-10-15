import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllBookings from "@/pages/admin/manage-bookings/AllBookings";
import AddCar from "@/pages/admin/manage-cars/AddCar";
import AllCars from "@/pages/admin/manage-cars/AllCars";
import AllReturnCars from "@/pages/admin/manage-return-cars/AllReturnCars";
import AllUsers from "../pages/admin/manage-user/AllUsers";
import UpdateCar from "@/pages/admin/manage-cars/UpdateCar";
import { DashboardIcon } from "@radix-ui/react-icons";
import { CarFilled, CarTwoTone } from "@ant-design/icons";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaRegAddressBook, FaUsers } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { TbView360Arrow } from "react-icons/tb";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <DashboardIcon fontSize={20} />,
    element: <AdminDashboard />,
  },
  {
    name: "Manage Cars",
    icon: <CarFilled size={20} />,
    children: [
      {
        name: "Add Car",
        path: "add-car",
        icon: <IoIosAddCircleOutline size={20} color="#14b3ab" />,
        element: <AddCar />,
      },
      {
        name: "View Cars",
        path: "view-cars",
        icon: <CarTwoTone size={20} twoToneColor="#14b3ab" />,
        element: <AllCars />,
      },
      {
        path: "update-cars/:id",
        element: <UpdateCar />,
      },
    ],
  },
  {
    name: "Manage Bookings",
    icon: <FaRegAddressBook />,
    children: [
      {
        name: "View Bookings",
        path: "view-bookings",
        icon: <MdOutlineCollectionsBookmark size={20} color="#14b3ab" />,
        element: <AllBookings />,
      },
    ],
  },
  {
    name: "Manage Returns",
    icon: <TbView360Arrow size={20} />,
    children: [
      {
        name: "View Return Cars",
        path: "view-return-Cars",
        icon: <TbTruckReturn size={20} color="#14b3ab" />,
        element: <AllReturnCars />,
      },
    ],
  },
  {
    name: "User Management",
    icon: <FaUsers size={20} />,
    children: [
      {
        name: "View Users",
        path: "view-users",
        icon: <FaUsers size={20} color="#14b3ab" />,
        element: <AllUsers />,
      },
    ],
  },
  // {
  //   name: "Reports",
  //   path: "reports",
  //   element: <Reports />,
  // },
];
