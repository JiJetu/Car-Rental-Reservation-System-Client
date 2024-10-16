import { TPath, TPathItem } from "@/tyeps";
import { NavLink } from "react-router-dom";

export const dashboardItemsGenerator = (items: TPath[], role: string) => {
  const pathItems = items.reduce((acc: TPathItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        icon: item.icon,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name!,
        icon: item.icon!,
        label: item.name!,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name!,
              icon: child.icon!,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return pathItems;
};
