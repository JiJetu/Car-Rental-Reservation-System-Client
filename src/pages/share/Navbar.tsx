import { NavLink } from "react-router-dom";
import { navItems } from "../../routes/navRoutes";
// import { Button } from "../ui/button";

console.log(navItems);

const Navbar = () => {
  const navbar = (
    <>
      {navItems.map((navItem) => (
        <li key={navItem.key}>{navItem.label}</li>
      ))}
    </>
  );

  return (
    <>
      <nav className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navbar}
            </ul>
          </div>

          {/* logo and name */}
          <NavLink
            to={"/"}
            className="text-base md:text-xl font-semibold font-serif"
          >
            <div className="flex items-center gap-3">
              <img
                className="h-[40px] w-[40px] md:h-[70px] md:w-[70px]"
                src="https://th.bing.com/th/id/OIG2.DyrLryTuvTHAWqJO16H9?pid=ImgGn"
                alt=""
              />
              <p className="hover:text-black flex gap-2">
                <span className="text-[#70E6D2] font-extrabold">Campers</span>
                Shop
              </p>
            </div>
          </NavLink>
        </div>

        <div className="navbar-end">
          <NavLink to={"/cart"}>
            {/* <Button className="bg-white hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              {cart.length > 0 ? (
                <sup className="text-xl text-blue-500">+{cart.length}</sup>
              ) : (
                <></>
              )}
            </Button> */}
          </NavLink>
        </div>
      </nav>
      <nav className="navbar lg:flex lg:justify-center lg:items-center bg-base-100 hidden lg:visible">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navbar}</ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
