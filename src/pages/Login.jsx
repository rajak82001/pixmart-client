import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email,
        password,
      });
      const data = res.data;
      toast.success(data.message);
      dispatch(login(data));

      const role = data?.role || data?.user?.role;

      if (role) {
        navigate(`/${role}/profile`);
      } else {
        toast.error("User role missing");
      }

      // console.log(data);
      // console.log(data.message);
      console.log("data.role: ", data.role);

      navigate(`/${data.role}/profile`);
      // dispatch karna hai login -> jo bhi data aa raha hai sab push karna hai state mai.
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <div className="mt-20 sm:mt-10 min-h-screen flex items-center justify-center w-full ">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[30vw] hover:border-gray-500 hover:shadow-2xl transition-colors duration-300">
        <h1 className="text-4xl tracking-wide font-bold text-center mb-1">
          Welcome Back
        </h1>
        <h3 className="text-sm tracking-wide font-bold text-center mb-4">
          Sign in to continue to PixMart
        </h3>
        <form onSubmit={handleLogin}>
          {/* for email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* for password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* For forget password */}
          <a href="#" className="text-xs text-gray-600 hover:text-black">
            Forgot Password?
          </a>

          {/* Signup with account */}
          <div className="flex items-center justify-end mb-4">
            <Link className="text-xs text-black" to="/signup">
              Don't have an account? Create one
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
