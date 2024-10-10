import AdminDashboard from "@/pages/admin/AdminDashboard";
import AllBookings from "@/pages/admin/manage-bookings/AllBookings";
import AddCar from "@/pages/admin/manage-cars/AddCar";
import AllCars from "@/pages/admin/manage-cars/AllCars";
import AllReturnCars from "@/pages/admin/manage-return-cars/AllReturnCars";
import AllUsers from "../pages/admin/manage-user/AllUsers";
import UpdateCar from "@/pages/admin/manage-cars/UpdateCar";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Manage Cars",
    children: [
      {
        name: "Add Car",
        path: "add-car",
        element: <AddCar />,
      },
      {
        name: "View Cars",
        path: "view-cars",
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
    children: [
      {
        name: "View Bookings",
        path: "view-bookings",
        element: <AllBookings />,
      },
    ],
  },
  {
    name: "Manage Returns",
    children: [
      {
        name: "View Return Cars",
        path: "view-return-Cars",
        element: <AllReturnCars />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "View Users",
        path: "view-users",
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
