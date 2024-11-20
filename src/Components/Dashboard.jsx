import React, { useState } from "react";
import { FaBell, FaUser, FaTrashAlt, FaList, FaFire } from "react-icons/fa";
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaComment,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Dashboard.css";
import StreakSummary from "./StreakSummary";
import Topbar from "./Topbar";
import "./Topbar.css";
import Timer from "./Timer"; // Pastikan path sesuai dengan lokasi timer.jsx
import Scheduler from "./Scheduler";


function Dashboard() {
  const navGroups = [
    [
      { name: "Dashboard", href: "#", icon: <FaHome /> },
      { name: "My City", href: "#", icon: <FaBuilding /> },
      { name: "Project & Task", href: "#", icon: <FaClipboardList /> },
      { name: "Socials", href: "#", icon: <FaComment /> },
    ],
    [
      { name: "Help", href: "#", icon: <FaQuestionCircle /> },
      { name: "Settings", href: "#", icon: <FaCog /> },
      { name: "Logout", href: "#", icon: <FaSignOutAlt /> },
    ],
  ];

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleInputChange = (e) => setTask(e.target.value);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task.trim(), completed: false },
      ]);
      setTask("");
      setShowMenu(false);
    }
  };

  const handleDeleteTask = () => {
    if (tasks.length > 0) {
      setTasks([]);
      setShowMenu(false);
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const handleAddNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteInput.trim() }]);
      setNoteInput("");
    }
  };

  const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));

  const calculateProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);
  };

  const streakDays = 3; //Total streak hari ini
  const tasksClosed = 2; //jumlah task yang diselesaikan
  const progressIncrease = 40; //presentase peningkatan fokus
  const meetingsDecrease = 10; //presentase penurunan meeting

  return (
    <section className="min-h-screen flex flex-col bg-white text-gray-900">
      <div className="flex flex-1">
        <aside className="w-1/5 bg-gray-100 p-8">
          <div className="logo mb-8 flex items-center space-x-4">
            <img
              src="/t_logo.svg"
              alt="Taskspring Logo"
              className="w-10 h-10"
            />
            <h3 className="text-2xl font-semibold text-black">Taskspring</h3>
          </div>
          <nav>
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex} className={groupIndex > 0 ? "mt-40" : ""}>
                {group.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center py-2 px-4 rounded text-gray-800 hover:bg-gray-200 space-x-2"
                  >
                    {link.icon && <span>{link.icon}</span>}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Topbar />
          {/* Timer Section at Top Right below Header */}
          <div className="flex justify-end mb-8">
            <div className="w-3/2 flex space-x-6">
              <Scheduler className="w-full"/> 
              <div className="w-1/6"></div>
              <div className="flex-3">
              <Timer className=" h-auto" />
              </div>
            </div>
          </div>


          <div className="grid grid-cols-3 gap-6 mt-8">
            {/* To-Do List Section */}
            <div className="task-overview p-6 bg-gray-100 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="text-4xl font-bold text-blue-500 mr-4">
                    {calculateProgress()}%
                  </div>
                  <h3 className="text-lg font-semibold">Home Tasks</h3>
                </div>
                <div className="text-red-500 text-sm font-semibold">
                  3 days left
                </div>
              </div>
              <div className="relative w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-yellow-400"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>

              {/* Task List Header with Icons */}
              <div className="flex justify-between items-center mt-4">
                <h4 className="text-lg font-semibold">Tasks</h4>
                <div className="flex space-x-2">
                  {/* Add Task Icon */}
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full"
                    title="Add Task"
                  >
                    <FaList className="text-lg" />
                  </button>
                  {/* Delete Completed Tasks Icon */}
                  <button
                    onClick={() =>
                      setTasks(tasks.filter((task) => !task.completed))
                    }
                    className="text-red-500 hover:text-red-700 p-2 rounded-full"
                    title="Delete Completed Tasks"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Add Task Input and Actions */}
              {showMenu && (
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="text"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Enter new task"
                    className="border rounded p-2 w-full"
                  />
                  <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Task List */}
              <div className="task-list mt-4 space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center bg-white rounded-lg shadow p-4"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                      />
                      <span
                        className={`${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded"
                      title="Delete Task"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-bold">Notes</h2>
              <div className="mt-4">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Add a new note"
                  className="border rounded p-2 w-full"
                />
                <button
                  onClick={handleAddNote}
                  className="bg-green-500 text-white p-2 rounded w-full mt-2"
                >
                  Add Note
                </button>
              </div>
              <div className="notes-list mt-4 space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="note flex justify-between items-center bg-gray-100 p-4 rounded shadow"
                  >
                    <span>{note.text}</span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            

            {/* Streak Summary Section */}
            <div className="p-6 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-bold">Streak Summary</h2>
              <StreakSummary
                streakDays={streakDays}
                tasksClosed={tasksClosed}
                progressIncrease={progressIncrease}
                meetingsDecrease={meetingsDecrease}
              />
            </div>

            {/* Timer Section */}
            {/* <div className="p-6 bg-gray-100 rounded-lg shadow">
              <Timer />
            </div> */}

          </div>
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
