import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        { name, email, password }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="border border-blue-200 shadow-lg rounded-lg p-8 w-96 bg-white">
        <div>
          <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
            SIGNUP
          </h2>
          <form onSubmit={handleSubmit()}>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your Name..."
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email..."
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Signup
            </button>
            <p className="text-center text-gray-600 mt-4">
              Already Have an Account?{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
