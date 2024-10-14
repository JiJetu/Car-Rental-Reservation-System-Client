import { NavLink } from "react-router-dom";
import logo from "../../assets/images/preview (1).png";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { NavbarItems } from "./NavbarItems";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { modeItem } from "@/constant/mode";
import { useMode } from "@/hooks/useMode";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { changeMode, mode } = useMode();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <nav className="navbar bg-base-100 dark:bg-black container mx-auto">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow"
            >
              <NavbarItems />
            </ul>
          </div>

          {/* logo and name */}
          <NavLink
            to={"/"}
            className="text-base md:text-xl font-semibold font-serif"
          >
            <div className="flex items-center md:gap-2">
              <img
                className="h-[30px] w-[30px] md:h-[70px] md:w-[70px]"
                src={logo}
                alt=""
              />
              <p className="flex gap-2">
                <span className="text-[#49af88] font-extrabold">Rental</span>
                Car
              </p>
            </div>
          </NavLink>
        </div>

        <div className="navbar-end space-x-1 md:space-x-3">
          <Button
            className="bg-white text-slate-800 hover:bg-white"
            onClick={changeMode}
          >
            {mode === modeItem.DARK ? <SunIcon /> : <MoonIcon />}
          </Button>

          {!user ? (
            <NavLink to={"/signIn"}>
              <Button className="bg-white text-black hover:bg-white">
                Sign In
              </Button>
            </NavLink>
          ) : (
            <Button
              onClick={handleLogout}
              className="bg-white text-black hover:bg-white"
            >
              Log out
            </Button>
          )}
        </div>
      </nav>
      <nav className="navbar lg:flex lg:justify-center lg:items-center bg-base-100 dark:bg-transparent hidden lg:visible">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <NavbarItems />
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
