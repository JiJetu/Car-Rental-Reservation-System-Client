const path = [
  {
    name: "Home",
    path: "/",
    element: "<Home />",
  },
  {
    name: "Cars",
    path: "cars",
    element: "<Cars />",
  },
  {
    name: "About Us",
    path: "aboutUs",
    element: "<AboutUs />",
  },
];

const result = path.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      name: item.name,
      label: `<NavLink to=${item.path}>${item.name}</NavLink>`,
    });
  }

  return acc;
}, []);

console.log(result);
