import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {firebaseAuth} from "../utils/firebase";
import {toast} from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const methods = await fetchSignInMethodsForEmail(firebaseAuth, email);

      if (methods.length > 0) {
        toast.error("Email is already in use. Please use a different email.");
      } else {
        // Email is not in use, proceed with account creation
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        navigate("/login");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Email is already in use. Please use a different email.");
      console.error("Error during user registration:", error.message);
    }
  };

  return (
    <div className="background min-h-screen flex items-center justify-center p-4">
      <div className=" bg-white-200 rounded-md overflow-hidden shadow-xl w-full max-w-md mx-auto ">
        <h2 className="text-2xl md:text-4xl uppercase font-bold mb-4 text-center text-white pt-6">
          Sign Up
        </h2>

        <form onSubmit={handleRegister} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white text-sm md:text-xl font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

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
            Sign Up
          </button>
          <span className="text-white text-sm mt-2 block  md:text-xl">
            Already have an account ? {""}
            <Link
              to="/login"
              className="text-black underline font-bold hover:text-blue-600 "
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
