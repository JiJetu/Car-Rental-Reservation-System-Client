import { ReactNode } from "react";
import AboutUs from "../pages/about us/AboutUs";
import Cars from "../pages/car listing/Cars";
import Home from "../pages/home/Home";
import { NavLink } from "react-router-dom";
import Booking from "../pages/booking/Booking";
import Contact from "../pages/contact/Contact";
import CarDetails from "@/pages/carDetails/CarDetails";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

type TRoute = {
  path: string;
  element: ReactNode;
};
type TItems = {
  key: string;
  label: ReactNode;
};

const path = [
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
export const navRoutes = path.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }

  return acc;
}, []);

export const navItems = path.reduce((acc: TItems[], item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: (
        <NavLink
          to={`${item.path}`}
          className={({ isActive, isPending }) =>
            isActive
              ? "px-5 py-2 border-b-2 rounded-xl font-bold hover:bg-transparent hover:border-b-slate-700"
              : isPending
              ? "pending"
              : "hover:bg-transparent"
          }
        >
          {item.name}
        </NavLink>
      ),
    });
  }

  return acc;
}, []);
