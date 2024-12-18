import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function ToDoListApp() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTask, setNewTask] = useState({ categoryIndex: null, taskName: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(null);
  const [editingTask, setEditingTask] = useState({ categoryIndex: null, taskId: null });

  const calculateProgress = (tasks) => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    return tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        { name: newCategory.trim(), tasks: [], color: "blue-500" },
      ]);
      setNewCategory("");
    }
  };

  const handleAddTask = () => {
    if (newTask.taskName.trim() && newTask.categoryIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[newTask.categoryIndex].tasks.push({
        id: Date.now(),
        text: newTask.taskName.trim(),
        completed: false,
      });
      setCategories(updatedCategories);
      setNewTask({ categoryIndex: null, taskName: "" });
      setIsAddingTask(null);
    }
  };

  const handleEditCategory = (index, newName) => {
    if (newName.trim()) {
      const updatedCategories = [...categories];
      updatedCategories[index].name = newName.trim();
      setCategories(updatedCategories);
      setEditingCategory(null);
    }
  };

  const handleEditTask = (categoryIndex, taskId, newTaskName) => {
    const updatedCategories = [...categories];
    const tasks = updatedCategories[categoryIndex].tasks.map((task) =>
      task.id === taskId ? { ...task, text: newTaskName.trim() } : task
    );
    updatedCategories[categoryIndex].tasks = tasks;
    setCategories(updatedCategories);
    setEditingTask({ categoryIndex: null, taskId: null });
  };

  const handleDeleteTask = (categoryIndex, taskId) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].tasks = updatedCategories[categoryIndex].tasks.filter(
      (task) => task.id !== taskId
    );
    setCategories(updatedCategories);
  };

  const toggleTaskCompletion = (categoryIndex, taskId) => {
    const updatedCategories = [...categories];
    const tasks = updatedCategories[categoryIndex].tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updatedCategories[categoryIndex].tasks = tasks;
    setCategories(updatedCategories);
  };

  return (
    <div className="p-6 py-12">
      <h2 className="text-2xl font-bold mb-6">To-do List</h2>

      {/* Categories */}
      <div className="space-y-6">
        <div
          className={`${
            categories.length > 1 ? "max-h-60 overflow-y-auto" : ""
          } space-y-6`} // Conditionally add scroll
        >
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white p-4 rounded-lg shadow">
              {/* Category Header */}
              <div className="flex gap-2 mb-2 flex-col">
                <div className="flex justify-between items-center space-x-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCategory(categoryIndex)}
                      className="rounded-md p-1 bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <BiEdit className="text-xl" />
                    </button>
                    {editingCategory === categoryIndex ? (
                      <input
                        type="text"
                        defaultValue={category.name}
                        onBlur={(e) =>
                          handleEditCategory(categoryIndex, e.target.value)
                        }
                        autoFocus
                        className="border rounded p-1 text-sm w-40"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold rounded-lg bg-blue-500 px-2 text-white">
                        {category.name}
                      </h3>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setIsAddingTask(
                        isAddingTask === categoryIndex ? null : categoryIndex
                      )
                    }
                    className="text-gray-500 rounded-full p-1 bg-gray-200 hover:bg-gray-300"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="text-gray-500 text-sm">
                  {calculateProgress(category.tasks)}% Completed
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full bg-gray-200 h-2 rounded-full mb-4">
                <div
                  className={`absolute top-0 left-0 h-full bg-${category.color}`}
                  style={{ width: `${calculateProgress(category.tasks)}%` }}
                ></div>
              </div>

              {/* Tasks */}
              <div className="pl-6 space-y-2">
                {category.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          toggleTaskCompletion(categoryIndex, task.id)
                        }
                        className="cursor-pointer"
                      />
                      {editingTask.categoryIndex === categoryIndex &&
                      editingTask.taskId === task.id ? (
                        <input
                          type="text"
                          defaultValue={task.text}
                          onBlur={(e) =>
                            handleEditTask(
                              categoryIndex,
                              task.id,
                              e.target.value
                            )
                          }
                          autoFocus
                          className="border rounded p-1 text-sm"
                        />
                      ) : (
                        <span
                          onClick={() =>
                            setEditingTask({
                              categoryIndex: categoryIndex,
                              taskId: task.id,
                            })
                          }
                          className={`cursor-pointer ${
                            task.completed
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {task.text}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTask(categoryIndex, task.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Task Input */}
              {isAddingTask === categoryIndex && (
                <div className="flex mt-4 space-x-2">
                  <input
                    type="text"
                    value={
                      newTask.categoryIndex === categoryIndex
                        ? newTask.taskName
                        : ""
                    }
                    onChange={(e) =>
                      setNewTask({
                        categoryIndex: categoryIndex,
                        taskName: e.target.value,
                      })
                    }
                    placeholder="Add new task"
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
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Section */}
      <div className="mt-6 flex space-x-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default ToDoListApp;
