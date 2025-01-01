import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
   
    localStorage.removeItem("token");

   
    navigate("/"); 
  };

 
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-3xl font-semibold text-blue-600 mb-4"></h1>
        <p className="text-gray-600 mb-6">Choose an option to get started:</p>
        <p className="text-gray-600 mb-6">After successfull login please stay on logged-in page for atleast 10 seconds.</p>
        <div className="space-y-4">
          {!isLoggedIn && (
            <>
              <Link to="/login">
                <button className="w-full bg-blue-500 text-white py-2 my-5 rounded-lg hover:bg-blue-600 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full bg-green-500 text-white py-2 my-5 rounded-lg hover:bg-green-600 transition">
                  Register
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition">
                  Admin
                </button>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <button
                onClick={handleLogout} 
                className="w-full bg-red-500 text-white py-2 my-5 rounded-lg hover:bg-red-600 transition"
              >
                Log Out
              </button>
              <Link to="/dashboard">
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition">
                  Admin
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
