import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo, FaTimes, FaPlus } from "react-icons/fa";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [taskList, setTaskList] = useState({
    "2024-11-20": ["Task 1", "Task 2", "Task 3"], // Example task list with dates
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputTime((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(parseInt(value, 10) || 0, 59)),
    }));
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true); // Open the modal to set the timer after selecting task
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const startTimer = () => {
    const totalSeconds =
      inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
    setTime(totalSeconds);
    setIsRunning(true);
    setIsModalOpen(false); // Close modal after starting the timer
  };

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime({ hours: 0, minutes: 25, seconds: 0 });
    setSelectedTask("");
  };

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="py-8 px-6 bg-white text-black flex flex-col items-start relative space-y-2 border-b">
        <div className="flex gap-4 items-start">
            <div>
                {/* Display current date and day */}
                <h2 className="text-lg font-semibold">{getCurrentDate()}</h2>
                {/* Default Timer Info */}
                <p className="text-sm text-start text-gray-500">Default Timer</p>
            </div>
            {/* Button to open the modal to select task */}
            <button
            onClick={() => setIsModalOpen(true)}
            className="w-6 h-6 flex items-center justify-center bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-md transition-all duration-300"
            >
            <FaPlus size={10} />
            </button>
        </div>


      {/* Modal for selecting task, date, and setting timer */}
      {isModalOpen && (
 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
        <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Choose Your Task</h3>
            <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
            >
                <FaTimes size={20} />
            </button>
            </div>
    
            {/* Left part: Date Picker */}
            <div className="w-full mb-4">
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 w-full border-2 border-gray-300 rounded-lg"
            />
    
            {selectedDate && (
                <div className="space-y-4 mt-4">
                {taskList[selectedDate]?.map((task, index) => (
                    <button
                    key={index}
                    onClick={() => handleTaskSelect(task)} // Make sure this doesn't close the modal
                    className={`w-full p-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transform transition-all duration-300 ${
                        selectedTask === task ? 'bg-indigo-700' : ''
                    }`}
                    >
                    {task}
                    </button>
                ))}
                </div>
            )}
            </div>
    
            {/* Right part: Time Picker */}
            <div className="w-full mt-4">
            {selectedTask && (
            <div className="flex mb-4 space-x-4 justify-center">
            <input
                type="number"
                name="hours"
                value={inputTime.hours}
                onChange={handleInputChange}
                placeholder="HH"
                className="w-1/3 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center"
            />
            <input
                type="number"
                name="minutes"
                value={inputTime.minutes}
                onChange={handleInputChange}
                placeholder="MM"
                className="w-1/3 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center"
            />
            <input
                type="number"
                name="seconds"
                value={inputTime.seconds}
                onChange={handleInputChange}
                placeholder="SS"
                className="w-1/3 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-center"
            />
            </div>
        )}
    
            {/* Start Timer Button */}
            {selectedTask && (
            <button
            onClick={startTimer}
            className="w-full p-3 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transform transition-all duration-300"
            >
            Start Timer
            </button>
        )}
            </div>
        </div>
        </div>
    )}
  


      {/* Select Task */}
      {selectedTask && (
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold">Selected Task: {selectedTask}</p>
        </div>
      )}

      {/* Timer Countdown - Now in a horizontal layout */}
      <div className="w-full max-w-md flex items-center space-x-4 mb-6">
        <div className="text-5xl font-semibold">{formatTime()}</div>
        
        <div className="flex space-x-4">
            <button
                onClick={toggleTimer}
                className={`p-3 rounded-full ${
                isRunning
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-green-500 hover:bg-green-600"
                } text-white shadow-lg transition-all duration-300 w-8 h-8`}
            >
                {isRunning ? <FaPause size={8} /> : <FaPlay size={8} />}
            </button>

            <button
                onClick={resetTimer}
                className="w-8 h-8 flex justify-center items-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-300"
            >
                <FaRedo size={8} />
            </button>
            </div>

      </div>

      {/* Timer Controls */}
    </div>
  );
}

export default Timer;
