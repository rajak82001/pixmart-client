import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAllPosts, setMyPosts } from "../../store/slices/postSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Footer from "./Footer";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.allPosts);
  const myPosts = useSelector((state) => state.posts.myPosts);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const getAllImages = async () => {
    // if (posts.length > 0) return;
    const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getAll");
    const { data } = res.data;
    console.log(data);
    dispatch(setAllPosts(data));
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const purchaseImage = async (price, id, image, author, title) => {
    if (!isAuthenticated) {
      toast.error("Please login to purchase asset");
      navigate("/login");
      return;
    }

    try {
      // create order on server
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/payment/generate",
        { price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        },
      );

      const orderData = res.data.data;

      // wait for payment + verification to succeed
      const purchasedPost = await handlePaymentVerify(
        orderData,
        id,
        image,
        author,
        title,
        price,
      );

      // refresh the buyer's list once confirmation arrives
      if (purchasedPost) {
        const refresh = await axios.get(
          import.meta.env.VITE_API_URL + "/post/myPosts",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        dispatch(setMyPosts(refresh.data.data));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handlePaymentVerify = (
    orderData,
    id,
    image,
    author,
    title,
    price,
  ) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Raja Khan",
        order_id: orderData.id,
        theme: {
          color: "#5f63b8",
        },
        handler: async (response) => {
          try {
            const res = await axios.post(
              import.meta.env.VITE_API_URL + "/payment/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                postId: id,
                postUrl: image,
                author,
                title,
                price,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                withCredentials: true,
              },
            );
            const data = res.data;
            toast.success(data.message);
            resolve(data.purchasedPost);
          } catch (error) {
            const msg = error?.response?.data?.message || error.message;
            toast.error(msg);
            reject(error);
          }
        },
      };
      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.open();
    });
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center pb-16">
        <h3 className="text-3xl font-semibold text-gray-900 my-8 sm:my-14">
          {" "}
          Explore Premium Photos
        </h3>

        {/* All my photos will be listed inside this div */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 bg-20">
          {/* Image Card */}

          {/* <ImageCard 
        title="The Beach"
        author="Coder786"
        img="https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg"
        price={10}
        icon1={
          <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
        }
        icon2={
          <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
        }
        /> */}

          {posts?.map(({ _id, title, image, price, author }) => {
            return (
              <ImageCard
                key={_id}
                id={_id}
                title={title}
                author={author}
                img={image}
                price={price}
                icon1={
                  <FaShoppingCart
                    title="Cart"
                    onClick={() =>
                      purchaseImage(price, _id, image, author, title)
                    }
                    className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                }
                icon2={
                  <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
                }
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PhotoGallery;
