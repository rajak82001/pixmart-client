import { toggleSidebar } from "../../store/slices/navSlice";
import { IoClose } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const HomeHeader = () => {
   const sidebar = useSelector((state) => state.nav.sidebar);
    return(
        <>
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
    )
}

export default HomeHeader;
