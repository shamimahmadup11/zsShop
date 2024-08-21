import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/storeSlices";
import { useState, useEffect } from "react";

const Header = () => {
  const user = useSelector((state) => state?.user?.value);
  const cartProductCount = useSelector(
    (state) => state.user.cartProductCount || 0
  );
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/currentUser", {
          method: "GET",
          credentials: "include",
        });

        const userData = await response.json();
        if (userData) {
          dispatch(setUser(userData));
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    console.log("User:", user); // Check if the user is being set correctly
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/userLogOut", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Logout successful!");
        dispatch(setUser(null));
        window.location.href = "/login";
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (e) {
      toast.error("An error occurred while logging out.");
      console.error("Logout error:", e);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Render loading or fallback content if user is undefined or null
  if (typeof user === "undefined") {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="navbar flex items-center justify-between">
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
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
            </button>
          </div>

          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-800 transition duration-300"
          >
            {/* Logo Icon or Image */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-blue-600"
            >
              <path d="M3 12l9-9 9 9-9 9-9-9z" />
            </svg>
            {/* Logo Text */}
            <span className="text-2xl font-extrabold text-blue-600">
              ZSshop
            </span>
          </Link>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="hidden md:block">
            <label className="px-3 py-1 border rounded-md flex items-center gap-2 bg-gray-100">
              <input
                type="text"
                className="grow outline-none bg-gray-100"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          <div className="flex gap-8">
            <div className="relative inline-block">
              {user ? (
                <div>
                  <Link to="/addToCart">
                  <FaCartPlus className="h-6 w-6 text-gray-800 cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartProductCount || 0}
                  </span>
                  </Link>
                 
                </div>
              ) : null}
            </div>

            <div className="relative">
              {user ? (
                <CgProfile
                  className="h-5 w-5 cursor-pointer"
                  onClick={toggleDropdown}
                />
              ) : null}

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link
                    to="/admin/*"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      toast.info("Navigating to Admin Portal...");
                    }}
                  >
                    Admin Portal
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      toast.info("Navigating to Profile...");
                    }}
                  >
                    User Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {!user ? (
            <Link
              to="/login"
              className="bg-black text-white p-2 m-2 rounded hover:bg-slate-800 duration-300 cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                toast.info("Logging out...");
              }}
              className="bg-black text-white p-2 m-2 rounded hover:bg-slate-800 duration-300 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
