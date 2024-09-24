import AboutUs from "../pages/about us/AboutUs";
import Cars from "../pages/car listing/Cars";
import Home from "../pages/home/Home";
import Booking from "../pages/booking/Booking";
import Contact from "../pages/contact/Contact";
import CarDetails from "@/pages/carDetails/CarDetails";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export const mainPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Cars",
    path: "cars",
    element: <Cars />,
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
      <ProtectedRoute>
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
