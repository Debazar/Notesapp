import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5001/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Failed to fetch notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, notes]);

  const closeModel = () => {
    setModelOpen(false);
    setCurrentNote(null);
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
        closeModel();
        toast.success("Note added successfully!");
      } else {
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
        closeModel();
        toast.success("Note updated successfully!");
      } else {
        toast.error("Failed to update note. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response?.data || error.message
      );
      toast.error("Error updating note. Please try again.");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        toast.success("Note deleted successfully!");
      } else {
        toast.error("Failed to delete note. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data || error.message
      );
      toast.error("Error deleting note. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center text-gray-500">
              Loading notes...
            </div>
          ) : filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={setCurrentNote}
                deleteNote={deleteNote}
              />
            ))
          ) : (
            <p>No notes available. Add your first note!</p>
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
