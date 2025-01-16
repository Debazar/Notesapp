import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);

  const closeModel = () => {
    setModelOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorisation: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/");
        closeModel();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 mon-h-screen">
      <Navbar />

      <button
        onClick={() => setModelOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center text-4xl"
      >
        +
      </button>

      {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote} />}
    </div>
  );
};

export default Home;
