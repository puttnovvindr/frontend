import React, { useState } from "react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { useTheme } from "./ThemeContext";

function Notes() {
  const { isDarkMode } = useTheme();
  const [notes, setNotes] = useState([]);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", text: "" });
  const [contextMenu, setContextMenu] = useState(null); // State for context menu
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Store selected note ID for actions

  const handleAddNote = () => {
    if (newNote.title.trim()) {
      setShowTitleInput(false);
      setNotes([
        ...notes,
        {
          id: Date.now(),
          title: newNote.title.trim(),
          text: newNote.text.trim(),
        },
      ]);
      setNewNote({ title: "", text: "" });
    }
  };

  const toggleTitleInput = () => {
    setShowTitleInput((prev) => !prev);
    if (showTitleInput) setNewNote({ title: "", text: "" });
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setContextMenu(null); // Close context menu after deleting
  };

  const handleRightClick = (e, noteId) => {
    e.preventDefault(); 
    setContextMenu({ x: e.clientX, y: e.clientY }); 
    setSelectedNoteId(noteId); 
  };

  const closeContextMenu = () => setContextMenu(null); 

  return (
    <section onClick={closeContextMenu}>
      <div
        className={`p-6 py-12 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } border-l`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notes</h2>
          <button
            onClick={toggleTitleInput}
            className="text-gray-600 p-1 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            title="Add Note"
          >
            <HiOutlineEllipsisVertical className="text-xl" />
          </button>
        </div>

        {showTitleInput && (
          <div className="mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddNote();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="noteTitle"
                  className={`block ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  } font-semibold mb-2`}
                >
                  Note Title
                </label>
                <div className="flex gap-2 h-10">
                  <input
                    type="text"
                    id="noteTitle"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    placeholder="Enter note title"
                    className={`border ${
                      isDarkMode ? "border-gray-600" : "border-gray-300"
                    } rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="notes-list mt-4 space-y-2 overflow-y-auto max-h-80">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`relative note flex flex-col ${
                isDarkMode ? "bg-orange-400" : "bg-orange-200"
              } p-4 rounded-b-2xl rounded-t-lg`}
              onContextMenu={(e) => handleRightClick(e, note.id)} // Right-click handler
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-white">
                  {note.title}
                </h3>
              </div>
              <textarea
                value={note.text}
                onChange={(e) => {
                  setNotes(
                    notes.map((n) =>
                      n.id === note.id ? { ...n, text: e.target.value } : n
                    )
                  );
                }}
                placeholder="Enter note text"
                className={`text-white bg-transparent border-none outline-none w-full mt-2 resize-none placeholder-gray-100 ${
                  isDarkMode ? "placeholder-gray-300" : "placeholder-gray-500"
                }`}
                rows="1"
                style={{ height: "auto", minHeight: "50px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-2 border transform -translate-x-18 translate-y-60 dark:bg-gray-800 dark:border-gray-600"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => handleDeleteNote(selectedNoteId)}
            className="text-red-500 px-1 py-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700 dark:text-red-300"
          >
            <MdDelete className="text-2xl" />
          </button>
        </div>
      )}
    </section>
  );
}

export default Notes;
