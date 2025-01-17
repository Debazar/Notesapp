import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteModel = ({ closeModel, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border border-gray-300 rounded-lg p-2 w-full h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={closeModel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModel;
