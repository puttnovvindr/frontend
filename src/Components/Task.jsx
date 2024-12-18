import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Task() {
  const navLinks = [
    { name: "Dashboard", href: "#" },
    { name: "My City", href: "#" },
    { name: "Project & Task", href: "#" },
    { name: "Socials", href: "#" },
    { name: "Help", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Logout", href: "#" },
  ];

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", note: "", dueDate: "", id: null });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(null); // Track which task has the menu open

  // Function to group tasks into columns
  const groupTasksIntoColumns = (tasks, tasksPerColumn) => {
    let columns = [];
    for (let i = 0; i < tasks.length; i += tasksPerColumn) {
      columns.push(tasks.slice(i, i + tasksPerColumn));
    }
    return columns;
  };

  const handleAddTask = () => {
    const dueDate = new Date(newTask.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    if (newTask.id) {
      // If task has an ID, it's an edit, so update the existing task
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? { ...task, title: newTask.title, note: newTask.note, dueDate: formattedDueDate } : task
      );
      setTasks(updatedTasks);
    } else {
      // Otherwise, add a new task
      setTasks([...tasks, { ...newTask, dueDate: formattedDueDate, id: tasks.length + 1 }]);
    }
    
    setNewTask({ title: "", note: "", dueDate: "", id: null });
    setIsModalOpen(false);
  };

  const handleDateChange = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    setSelectedDate(selectedDate);

    const tasksOnSelectedDate = tasks.filter(
      (task) => task.dueDate === selectedDate.toISOString().split('T')[0]
    );
    setTasksForSelectedDate(tasksOnSelectedDate);
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const completedTask = tasks.find((task) => task.id === taskId);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setIsMenuOpen(null); // Close the menu after deletion
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask({ title: taskToEdit.title, note: taskToEdit.note, dueDate: taskToEdit.dueDate, id: taskToEdit.id });
    setIsModalOpen(true);
    setIsMenuOpen(null); // Close the menu after editing
  };

  const tasksGrouped = groupTasksIntoColumns(tasks, 5); // Group tasks into columns, each with 5 tasks

  return (
    <section className="min-h-screen flex bg-white text-gray-900">
      {/* Sidebar kiri */}
      <aside className="w-1/4 bg-gray-100 p-8">
        <div className="logo mb-8">
          <h3 className="text-2xl font-semibold text-black">Taskspring</h3>
        </div>
        <nav>
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block py-2 px-4 rounded text-gray-800 hover:bg-gray-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Konten utama */}
      <main className="flex-grow p-8 bg-white flex gap-8">
        {/* Kolom tugas utama */}
        <section className="w-full space-y-6">
          <h2 className="text-3xl font-semibold mb-4 text-black">Your Tasks:</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks added yet.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto">
              {tasksGrouped.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col space-y-4 w-1/2"> {/* Mengatur lebar kolom menjadi setengah */}
                  {column.map((task) => (
                    <div
                      key={task.id}
                      className="bg-gray-100 p-4 rounded-lg shadow-md border border-gray-300 relative"
                    >
                      <h4 className="text-xl font-semibold text-black">{task.title}</h4>
                      <p className="text-gray-600">{task.note}</p>
                      <p className="text-sm text-gray-500">{task.dueDate}</p>
                      <div className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          className="mr-2"
                          onChange={() => handleTaskCompletion(task.id)}
                        />
                        <span className="text-sm text-gray-500">Mark as complete</span>
                      </div>

                      {/* Icon 3 Titik untuk Menu */}
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => setIsMenuOpen(isMenuOpen === task.id ? null : task.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          ⋮
                        </button>
                        {isMenuOpen === task.id && (
                          <div className="absolute right-0 bg-white shadow-lg rounded-lg border border-gray-300 mt-2 w-32">
                            <button
                              onClick={() => handleEditTask(task.id)}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Your Task
          </button>
        </section>

        {/* Kolom kanan */}
        <aside className="w-full max-w-xs space-y-10">
          {/* Kalender Mini */}
          <div className="bg-gray-100 rounded-lg p-4 shadow-lg border border-gray-300">
            <h4 className="text-lg font-semibold mb-2 text-black">Calendar</h4>
            <Calendar
              value={selectedDate}
              minDate={new Date()}
              onChange={handleDateChange}
              className="react-calendar !border-none !bg-gray-100 text-black"
              tileClassName="relative rounded-full text-center !hover:bg-gray-200"
              tileContent={({ date }) => {
                const dateString = date.toISOString().split('T')[0];
                const hasTask = tasks.some((task) => task.dueDate === dateString);
                return hasTask ? (
                  <div className="absolute down-0 right-2 transform -translate-y-2 w-2 h-2 bg-red-600 rounded-full"></div>
                ) : null;
              }}
            />
          </div>

          {/* Tugas Selesai */}
          <div className="bg-gray-100 rounded-lg p-4 shadow-lg border border-gray-300">
            <h4 className="text-lg font-semibold mb-2 text-black">Completed Tasks</h4>
            {completedTasks.length > 0 ? (
              <ul className="space-y-4">
                {completedTasks.map((task) => (
                  <li key={task.id} className="flex flex-col items-start bg-gray-200 px-4 py-2 rounded-xs">
                    <span className="text-gray-600 font-bold line-through">{task.title}</span>
                    <span className="text-gray-600 line-through text-xs">{task.dueDate}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks completed yet.</p>
            )}
          </div>
        </aside>
      </main>

      {/* Modal Add/Edit Task */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add/Edit Task</h3>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task Title"
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <textarea
              value={newTask.note}
              onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
              placeholder="Task Note"
              className="w-full mb-4 p-2 border rounded-lg"
            ></textarea>
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Task;