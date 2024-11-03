import AboutUs from "../pages/about us/AboutUs";
import Home from "../pages/home/Home";
import Booking from "../pages/booking/Booking";
import Contact from "../pages/contact/Contact";
import CarDetails from "@/pages/carDetails/CarDetails";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import CarListing from "@/pages/car listing/CarListing";
import { userRole } from "@/constant/role";

export const mainPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Cars",
    path: "cars",
    element: <CarListing />,
  },
  {
    name: "About Us",
    path: "aboutUs",
    element: <AboutUs />,
  },
  {
    name: "Booking",
    path: "booking",
    element: (
      <ProtectedRoute role={userRole.USER || userRole.ADMIN}>
        <Booking />
      </ProtectedRoute>
    ),
  },
  {
    name: "Contact",
    path: "contact",
    element: <Contact />,
  },
  {
    path: "car/:id",
    element: <CarDetails />,
  },
];
