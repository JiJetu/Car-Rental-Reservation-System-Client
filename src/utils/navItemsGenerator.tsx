import { TPath, TPathItem } from "@/tyeps";
import { NavLink } from "react-router-dom";

export const navItemsGenerator = (items: TPath[]) => {
  const navItems = items.reduce((acc: TPathItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink
            to={item.path.startsWith("/") ? item.path : `/${item.path}`}
            className={({ isActive, isPending }) =>
              isActive
                ? "px-5 py-2 border-b-2 dark:bg-white dark:text-black rounded-xl font-bold hover:bg-transparent hover:border-b-slate-700"
                : isPending
                ? "hover:bg-transparent"
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

  return navItems;
};
