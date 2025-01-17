import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const handleLogout = () => {};
  const { user } = useAuth();
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-2xl font-semibold text-indigo-600 hover:text-indigo-700 transition duration-300"
        >
          NoteApp
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <input
          type="text"
          placeholder="Search Notes..."
          className="px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-700 transition duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">{user.name}</span>

              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
