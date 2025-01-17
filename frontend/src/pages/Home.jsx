import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/note");
        setNotes(data.notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const closeModel = () => {
    setModelOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/");
        closeModel();
      } else {
        console.error("Failed to add note:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div>
        {notes.map((note) => (
          <NoteCard note={note} />
        ))}
      </div>

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
