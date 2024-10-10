import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { mainPath } from "@/routes/navbar.routes";
import { navItemsGenerator } from "@/utils/navItemsGenerator";
import { NavLink } from "react-router-dom";

export const NavbarItems = () => {
  const user = useAppSelector(selectCurrentUser);
  const navItems = navItemsGenerator(mainPath);
  const allNavItems = [...navItems];

  const dashboardAsNavItem = user
    ? {
        key: "dashboard",
        label: (
          <NavLink
            to={`/${user.role}/dashboard`}
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 border-b-2 dark:bg-white dark:text-black rounded-xl font-bold hover:bg-transparent hover:border-b-slate-700"
                : "font-bold text-[#49af88] dark:text-black hover:bg-transparent"
            }
          >
            Dashboard
          </NavLink>
        ),
      }
    : null;

  if (dashboardAsNavItem) {
    allNavItems.push(dashboardAsNavItem);
  }

  const navbar = (
    <>
      {allNavItems.map((navItem) => (
        <li key={navItem.key}>{navItem.label}</li>
      ))}
    </>
  );

  return navbar;
};
