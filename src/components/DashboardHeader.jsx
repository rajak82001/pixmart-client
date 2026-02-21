import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/slices/navSlice";
import { IoClose } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";

const DashboardHeader = () => {
  const author = useSelector((state) => state.auth.author);
  const sidebar = useSelector((state) => state.nav.sidebar);

  const dispatch = useDispatch();

  return (
    <>
      <div className="my-12 mx-3 sm:my-5 sm:mx-8">
        <h1 className=" text-lg sm:text-3xl font-bold ">
          Welcome back, {author.charAt(0).toUpperCase() + author.slice(1)} 👋
        </h1>
        <p className="text-xs">Manage your purchases and downloads.</p>
      </div>

      {/* Hamburger icon just for phone */}
      <RiMenu3Fill
        onClick={() => dispatch(toggleSidebar())}
        className={` ${
          sidebar === true ? "hidden" : "block sm:hidden"
        } text-3xl absolute top-5 right-5`}
      />

      <IoClose
        onClick={() => dispatch(toggleSidebar())}
        className={`${
          sidebar === true ? "block sm:hidden" : "hidden"
        } text-3xl absolute top-5 right-5`}
      />
    </>
  );
};

export default DashboardHeader;
