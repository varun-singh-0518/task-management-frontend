import React, {useEffect} from "react";
import ToDoForm from "../components/ToDoForm";
import ToDoList from "../components/ToDoList";
import {useNavigate} from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.userInfo;
    if (!storedUserInfo) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container mx-auto p-3 bg-gradient-to-b from-blue-200 to-blue-400 min-h-screen">
      <div className="relative max-w-2xl lg:max-w-6xl mx-auto bg-white rounded p-6 shadow-lg">
        {/* Logout Button */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 m-4"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="mb-4 lg:text-center md:text-left">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase heading-text">
            Task Manager
          </h1>
        </div>

        <ToDoForm />
        <ToDoList />
      </div>
    </div>
  );
};

export default Homepage;
