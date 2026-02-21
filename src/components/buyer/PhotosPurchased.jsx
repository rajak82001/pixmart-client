import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { logout } from "../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DashboardHeader from "../DashboardHeader";
import ImageCard from "../ImageCard";
import { setMyPosts } from "../../../store/slices/postSlice";
import { IoArrowDownCircle } from "react-icons/io5";

const PhotosPurchased = () => {
  const dispatch = useDispatch();

  const myPosts = useSelector((state) => state.posts.myPosts);

  const getMyPosts = async () => {
    try {
      // if (myPosts.length > 0) return;
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/post/myPosts",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        },
      );
      const { data } = await res.data;
      // sometimes backend may return undefined entries if wrong id was stored
      const safe = Array.isArray(data) ? data.filter((p) => p && p._id) : [];
      dispatch(setMyPosts(safe));
    } catch (error) {
      toast.error("Failed to fetch photos");
      dispatch(logout());
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const downloadImage = async (image, title) => {
    try {
      // fetch the image from provided url
      const response = await fetch(image);
      if (!response.ok) throw new Error("Failed to download image");

      //   convert the image response to blob
      const blob = await response.blob();

      //   create an object url for the blob
      const url = URL.createObjectURL(blob);

      //   create a temporary anchor element (a) to download the image
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.jpg`;

      // Append the anchor element to the body
      document.body.appendChild(a);
      // Trigger a click on the anchor element to start the download
      a.click();
      //   remove the anchor element from the body and revoke the object url
      document.body.removeChild(a);
      URL.revokeObjectURL(url);


    } catch (error) {
      console.log("Error donwloading image ", error);
    }
  };

  return (
    <div>
      <DashboardHeader />
      <div>
        {/* if post zero render message */}
        {myPosts.length === 0 && (
          <p className=" flex justify-center items-center text-lg sm:text-3xl max-h-max my-7 sm:my-20 text-gray-500">
            No photos purchased yet.
          </p>
        )}
      </div>
      <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myPosts?.map(({ _id, title, image, author, price }) => (
          <ImageCard
            key={_id}
            title={title}
            price={price}
            author={author}
            img={image}
            icon2={
              <IoArrowDownCircle
                title="Download Now"
                className="text-2xl  text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                onClick={() => downloadImage(image, title)}
              />
            }
          />
        ))}

      </div>
    </div>
  );
};

export default PhotosPurchased;
