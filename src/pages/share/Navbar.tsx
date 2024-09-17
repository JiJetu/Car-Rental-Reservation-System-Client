import { NavLink } from "react-router-dom";
import { navItems } from "../../routes/navRoutes";
import logo from "../../assets/images/preview (1).png";
import { Button } from "@/components/ui/button";

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
      <nav className="navbar bg-base-100 container mx-auto">
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
            <div className="flex items-center gap-2">
              <img
                className="h-[40px] w-[40px] md:h-[70px] md:w-[70px]"
                src={logo}
                alt=""
              />
              <p className="hover:text-black flex gap-2">
                <span className="text-[#49af88] font-extrabold">Rental</span>
                Car
              </p>
            </div>
          </NavLink>
        </div>

        <div className="navbar-end">
          <NavLink to={"/login"}>
            <Button className="bg-white text-black hover:bg-white">
              Login
            </Button>
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
