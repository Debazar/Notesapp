import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5001/api/note");
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
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
        fetchNotes();
        navigate("/");
        closeModel();
        toast.success("Note added successfully!");
      } else {
        console.error("Failed to add note:", response.data.message);
        toast.error("Failed to add note. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response?.data || error.message
      );
      toast.error("Error adding note. Please try again.");
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        navigate("/");
        closeModel();
        toast.success("Note added successfully!");
      } else {
        console.error("Failed to add note:", response.data.message);
        toast.error("Failed to add note. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response?.data || error.message
      );
      toast.error("Error adding note. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">
              Loading notes...
            </div>
          ) : (
            notes.map((note) => (
              <NoteCard key={note._id} note={note} onEdit={onEdit} />
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => setModelOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center text-4xl"
        aria-label="Add new note"
      >
        +
      </button>

      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
