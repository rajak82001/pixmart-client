import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";

const HeroSection = () => {

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      const search = e.target.value;
      const res = await axios.get(
        import.meta.env.VITE_API_URL + `/post/search?search=${search} `
      );
      const { data } = await res.data;
      dispatch(setAllPosts(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="sm:w-[99vw] h-[60vh] overflow-clip mx-auto flex flex-col justify-center items-center text-center bg-[url('/hero.jpg')] bg-cover bg-center relative ">
      
      {/* Headline + Subtext */}
      <div className="mb-6 px-4">
        <h1 className="text-4xl text-white sm:text-5xl font-bold drop-shadow-lg">
          Your Ultimate Digital Image Marketplace
        </h1>
        <p className="mt-3 text-sm sm:text-lg text-white font-bold max-w-3xl mx-auto drop-shadow-md">
          Discover millions of high-quality stock images, videos and music from creators around the world.
        </p>
      </div>

      <form className="flex justify-center items-center">
        <div className="relative">
          <input
            type="search"
            id="search"
            name="search"
            className="py-2 sm:py-3 px-4 pl-12 w-[85vw] sm:w-[60vw] text-lg sm:text-xl outline-none border-2 border-gray-300 rounded-full bg-white bg-opacity-90 shadow-lg focus:border-gray-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
            placeholder="Search high-quality images..."
            onChange={handleSearch}
          />
          <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl sm:text-3xl text-gray-400" />
        </div>
      </form>
    </div>
  );
};

export default HeroSection;
