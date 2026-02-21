import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      //const res = await axios.post("/signup");
      console.log(email, accountType);
      const res = await axios.post(import.meta.env.VITE_API_URL + "/signup", {
        username,
        email,
        password,
        accountType,
      });
      const data = res.data;
      if (data.success === true) {
        setUsername("");
        setEmail("");
        setPassword("");
        setAccountType("");
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-20 sm:mt-12 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[35vw] hover:border-gray-500 hover:shadow-2xl transition-colors duration-300">
        <h1 className="text-4xl tracking-wide font-bold text-center mb-1">
          Create Your PixMart Account
        </h1>
        <h3 className="text-sm tracking-wide font-bold text-center mb-4">
          Join our marketplace and start exploring premium visuals
        </h3>
        <form onSubmit={handleSignup}>
          {/* for username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="rajak82001"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

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

          {/* For account selection */}
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Your Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="">Select account type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Sign In Link */}
          <div className="pt-2 ">
            <Link
              to="/login"
              className="text-sm text-gray-500 hover:text-gray-900 transition"
            >
              Already have an account?{" "}
              <span className="text-gray-900 font-medium">Sign In</span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 rounded-md shadow-md text-sm font-medium text-white bg-black"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
