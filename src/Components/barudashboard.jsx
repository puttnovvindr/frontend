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
import Board from "./Board";
import Cell from "./Cell";

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
        {/* sidebar kiri */}
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

            {/* gamification */}
            <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
              <Board />

              {/* Informasi Pengguna dengan Followers */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h1
                    style={{
                      textAlign: "start",
                      marginBottom: "0",
                      marginTop: "7px",
                      fontWeight: "bold",
                    }}
                  >
                    Putri Sandia
                  </h1>
                  <h2
                    style={{
                      textAlign: "start",
                      marginTop: "-3px",
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: "12px",
                    }}
                  >
                    Metropolis
                  </h2>
                </div>

                {/* Followers Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginLeft: "auto", // Posisikan ke kanan
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      role="img"
                      aria-label="icon"
                      style={{ marginRight: "5px" }}
                    >
                      👤
                    </span>
                    126.5K
                  </span>
                </div>
              </div>

              {/* Kotak Level dan Rewards */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  width: "270px",
                  marginTop: "10px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
              >
                {/* Level dan XP */}
                <div>
                  <p style={{ margin: "0 0 5px", fontWeight: "bold" }}>
                    Lv. 56{" "}
                    <span style={{ color: "gray", fontWeight: "normal" }}>
                      4370/5000 XP
                    </span>
                  </p>
                  <div
                    style={{
                      height: "5px",
                      width: "120px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "5px",
                        width: "87%", // Sesuaikan progress XP
                        backgroundColor: "black",
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Rewards */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <span
                      role="img"
                      aria-label="building"
                      style={{ fontSize: "20px" }}
                    >
                      🏢
                    </span>
                    <p style={{ margin: "5px 0 0", fontWeight: "bold" }}>2</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "50px",
                      height: "50px",
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <span
                      role="img"
                      aria-label="reward"
                      style={{ fontSize: "20px" }}
                    >
                      🏅
                    </span>
                    <p style={{ margin: "5px 0 0", fontWeight: "bold" }}>
                      1000
                    </p>
                  </div>
                </div>
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
          </div>
        </main>
      </div>
    </section>
  );
}

export default Dashboard;