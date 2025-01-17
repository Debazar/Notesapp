import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs w-full mx-auto my-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {note.title}
      </h2>
      <p className="text-gray-600 text-sm mb-4">{note.description}</p>
      <div className="flex justify-end space-x-3">
        <button
          className="text-blue-500 hover:text-blue-700 focus:outline-none transition duration-150 ease-in-out"
          onClick={() => onEdit(note)}
        >
          <FaEdit className="text-xl" />
        </button>
        <button className="text-red-500 hover:text-red-700 focus:outline-none transition duration-150 ease-in-out">
          <FaTrash className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
