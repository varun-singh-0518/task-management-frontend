import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {signInWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      const currentUser = firebaseAuth.currentUser;
      localStorage.setItem("userInfo", JSON.stringify(currentUser));
      navigate("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="background min-h-screen flex items-center justify-center p-4">
      <div className=" bg-white-200 rounded-md overflow-hidden shadow-xl w-full max-w-md mx-auto ">
        <h2 className="text-2xl md:text-4xl uppercase font-bold mb-4 text-center text-white pt-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm md:text-xl font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm md:text-xl font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 md:text-xl text-white py-2 px-4 rounded-md hover:bg-emerald-800 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >
            Login
          </button>
          <span className="text-white text-sm mt-2 block  md:text-xl">
            Don't have an account ? {""}
            <Link
              to="/register"
              className="text-black underline font-bold hover:text-blue-600 "
            >
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
