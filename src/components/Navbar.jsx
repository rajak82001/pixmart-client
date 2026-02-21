import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../../store/slices/authSlice";
import { useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  console.log(role);

  const refreshToken = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/refresh", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        },
      });

      const data = await res.data;
      dispatch(login(data));
    } catch (error) {
      dispatch(logout(data));
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshToken();
      },
      1000 * 60 * 13,
    ); // 13 min. interval

    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-3 sm:py-5 ${
        pathname === "/seller/profile" || pathname === "/buyer/profile"
          ? "hidden"
          : "fixed"
      } top-0 left-0 right-0 shadow-md gap-1 sm:gap-0 z-30 bg-white rounded-lg`}
    >
      {/* logo an site name */}
      <div className="flex justify-between items-center">
        {/* here we add the images later */}
        <Link to="/">
          <img src="/PixMart.png" alt="logo" className="sm:w-[220px] w-[150px]" />
        </Link>
      </div>

      {/* list of other tabs */}
      <ul className="flex gap-3 sm:gap-6 sm:text-lg text-base font-semibold text-gray-500 sm:ml-5 ">
        <Link to="/" className="cursor-pointer sm: p-2 hover:text-gray-900 transition-colors duration-300">
          About
        </Link>
        <Link to="/contact" className="cursor-pointer sm: p-2 hover:text-gray-900 transition-colors duration-300">
          Contact
        </Link>
        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="cursor-pointer sm: p-2 hover:text-gray-900 transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className=" cursor-pointer sm: p-2 hover:text-gray-900 transition-colors duration-300"
            >
              Get Started
            </Link>
          </>
        ) : (
          <Link
            to={`/${role}/profile`}
            className="cursor-pointer sm: p-2 hover:text-gray-900 transition-colors duration-300"
          >
            Profile
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
