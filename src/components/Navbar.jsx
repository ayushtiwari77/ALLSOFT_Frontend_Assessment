import React from "react";
import { useUserStore } from "../store/useUserStore";
import logo from "../assets/allsoft.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { handleLogout } = useUserStore();
  const navigate = useNavigate();
  const onLogout = () => {
    handleLogout();
    navigate("/login");
    toast.success("You Logged Out Successfully!");
  };

  return (
    <header
      className={`flex w-full items-center justify-center bg-blue-700 text-white dark:bg-dark`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <Link to="/" className="block w-full py-5">
              <img src={logo} alt="logo" className="h-16" />
            </Link>
          </div>
          <div className="flex w-full justify-between items-center md:justify-around md:px-4">
            <div>
              {/* <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button> */}
              <nav
                // :className="!navbarOpen && 'hidden' "
                id="navbarCollapse"
                className={` right-4 top-full w-full rounded-lg bg-transparent px-6 py-5  dark:bg-dark-2 static block max-w-full shadow-none   `}
              >
                <ul className=" flex flex-row gap-10  ">
                  <ListItem NavLink="/">Home</ListItem>
                  <ListItem NavLink="/upload">Upload</ListItem>
                  <ListItem NavLink="/admin">Admin</ListItem>
                </ul>
              </nav>
            </div>
            <div className=" justify-end pr-16 sm:flex flex lg:pr-0">
              <button
                onClick={onLogout}
                className="px-5 py-3   text-xl font-medium bg-red-600 cursor-pointer rounded hover:text-primary "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <Link
          to={NavLink}
          className="text-xl flex py-2  font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex  hover:underline"
        >
          {children}
        </Link>
      </li>
    </>
  );
};
