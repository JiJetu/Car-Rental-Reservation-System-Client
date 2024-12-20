import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { mainPath } from "@/routes/navbar.routes";
import { navItemsGenerator } from "@/utils/navItemsGenerator";
import { NavLink } from "react-router-dom";

export const NavbarItems = () => {
  // getting current user from local storage
  const user = useAppSelector(selectCurrentUser);
  // creating navbar items with require path
  const navItems = navItemsGenerator(mainPath);
  const allNavItems = [...navItems];

  // dashboard as nav item
  const dashboardAsNavItem = user
    ? {
        key: "dashboard",
        label: (
          <NavLink
            to={`/${user.role}/dashboard`}
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 border-b-2 dark:bg-white dark:text-black rounded-xl font-bold hover:bg-transparent hover:border-b-slate-700"
                : "font-bold text-[#49af88] hover:bg-transparent"
            }
          >
            Dashboard
          </NavLink>
        ),
      }
    : null;

  // adding dashboard with nav item if user exits
  if (dashboardAsNavItem) {
    allNavItems.push(dashboardAsNavItem);
  }

  const navbar = (
    <>
      {allNavItems.map((navItem) => (
        <li key={navItem?.key}>{navItem?.label}</li>
      ))}
    </>
  );

  return navbar;
};
