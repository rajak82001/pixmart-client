import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { IoIosHeart, IoMdPhotos } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { setTab } from "../../store/slices/navSlice";
import { login, logout } from "../../store/slices/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { clearPosts } from "../../store/slices/postSlice";

const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebar = useSelector((state) => state.nav.sidebar);
  const tab = useSelector((state) => state.nav.tab);

  const author = useSelector((state) => state.auth.author);
  const role = useSelector((state) => state.auth.role);

  const switchProfile = async () => {
    const res = await axios.get(import.meta.env.VITE_API_URL + "/switch", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await res.data;
    console.log("data after switch: ", data);
    toast.success(data.message);
    
    dispatch(clearPosts());
    dispatch(login(data));
    navigate(`/${data.role}/profile`);
    // console.log("switch to: ", data.role);
  };

  return (
    <nav
      className={` fixed z-10  ${
        !sidebar == true ? "-translate-x-[500px] sm:translate-x-0" : "translate-x-0"
      } ease-in-out duration-300  flex sm:static text-lg font-semibold bg-[#212529] shadow-lg flex-col gap-2 w-fit sm:w-[325px] min-h-screen p-3 list-none justify-between items-center`}
    >
      <div className="w-[90%] items-center flex flex-col gap-4">
        {/* circle with my names first letter */}
        <div className="bg-white mt-5 w-fit rounded-full py-4 px-6 text-gray-900 font-bold text-4xl text-center">
          {/* {<img src="https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg" alt="profile" className="w-10 h-10 rounded-full object-cover inline mr-2 " />} */}
          {author.charAt(0).toUpperCase()}
          {/* {console.log("Author IS IN DashboardSidebar:", author)} */} 
        </div>
        <span className="text-white"> {role} Dashboard</span> 

        {/* list items */}
        <div className="flex flex-col gap-6 mt-10">

          <Link
            to="/"
            className={`w-full rounded-lg px-3 py-1 hover:bg-black hover:text-white cursor-pointer text-white transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "home" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("home"))}
          >
            <AiFillHome />
            Home
          </Link>

          {pathname === "/seller/profile" ? (
            <li
              className={`w-full rounded-lg px-3 py-1 hover:bg-black hover:text-white text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab === "photos-management" && "bg-black text-white"
              }`}
              onClick={() => dispatch(setTab("photos-management"))}
            >
              <IoMdPhotos />
              Photo Management
            </li>
          ) : (
            <li
              className={`w-full rounded-lg px-3 py-1 hover:bg-black hover:text-white text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
                tab === "photos-purchased" && "bg-black text-white"
              }`}
              onClick={() => dispatch(setTab("photos-purchased"))}
            >
              <IoMdPhotos />
              Photos Purchased
            </li>
          )}

          <li
            className={`w-full rounded-lg px-3 py-1 hover:bg-black hover:text-white text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "analytics" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("analytics"))}
          >
            <SiGoogleanalytics />
            Analytics
          </li>

          <li
            className={`w-full rounded-lg px-3 py-1 hover:bg-black hover:text-white text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "Orders" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("orders"))}
          >
            <FaList />
            Orders
          </li>

          <li
            className={`w-full rounded-lg px-3 py-1 hover:bg-black hover:text-white cursor-pointer text-white transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center ${
              tab === "favourites" && "bg-black text-white"
            }`}
            onClick={() => dispatch(setTab("favourites"))}
          >
            <IoIosHeart />
            Favourites
          </li>

          <button
            className="w-full px-2 hover:bg-black hover:text-white text-white cursor-pointer transition-all ease-linear duration-300 gap-2 border-b-2 border-white bg-gray-800 text-center uppercase text-sm py-2 rounded-lg"
            onClick={switchProfile}
          >
            Switch to {pathname == "/seller/profile" ? "buyer" : "seller"}
          </button>

        </div>
      </div>

      {/* logout button */}
      <li
        className="w-full rounded-lg px-2 hover:bg-black-900 text-white cursor-pointer transition-all ease-linear duration-300 hover:scale-105 flex gap-2 justify-start items-center"
        onClick={ () => dispatch(logout())}
      >
        <IoLogOut />
        Logout
      </li>
    </nav>
  );
};

export default DashboardSidebar;
