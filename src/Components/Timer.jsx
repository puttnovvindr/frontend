import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

function Timer() {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer status
  const [isWorkSession, setIsWorkSession] = useState(true); // Work or break session
  const [inputTime, setInputTime] = useState({ hours: 0, minutes: 25, seconds: 0 }); // Default Pomodoro time (25 minutes)

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputTime((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min(parseInt(value, 10) || 0, 59)), // Validate input (0-59)
    }));
  };

  // Start timer with input time
  const startTimer = () => {
    const totalSeconds =
      inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds;
    setTime(totalSeconds);
    setIsRunning(true);
    setIsWorkSession(true); // Start with work session
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      // Switch between work and break when time is up
      if (isWorkSession) {
        setIsWorkSession(false);
        setTime(5 * 60); // Set break duration (5 minutes)
      } else {
        setIsWorkSession(true);
        setTime(25 * 60); // Set work session duration (25 minutes)
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, time, isWorkSession]);

  const toggleTimer = () => setIsRunning(!isRunning); // Play/Pause button
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setInputTime({ hours: 0, minutes: 25, seconds: 0 });
    setIsWorkSession(true); // Reset to work session
  };

  // Format time (hh:mm:ss)
  const formatTime = () => {
    const hours = Math.floor(time / 3600); // Hours
    const minutes = Math.floor((time % 3600) / 60); // Minutes
    const seconds = time % 60; // Seconds
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Pomodoro Timer</h2>
      <div className="mb-4 w-full flex justify-between space-x-2">
        {/* Input hours */}
        <input
          type="number"
          name="hours"
          value={inputTime.hours}
          onChange={handleInputChange}
          placeholder="HH"
          className="w-1/3 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Input minutes */}
        <input
          type="number"
          name="minutes"
          value={inputTime.minutes}
          onChange={handleInputChange}
          placeholder="MM"
          className="w-1/3 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* Input seconds */}
        <input
          type="number"
          name="seconds"
          value={inputTime.seconds}
          onChange={handleInputChange}
          placeholder="SS"
          className="w-1/3 p-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        onClick={startTimer}
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition"
      >
        Set Timer
      </button>
      <div className="text-4xl font-bold text-blue-600 mb-6">
        {formatTime()}
      </div>
      <div className="flex space-x-4">
        {/* Play / Pause button */}
        <button
          onClick={toggleTimer}
          className={`p-3 rounded-full ${
            isRunning
              ? "bg-yellow-400 hover:bg-yellow-500"
              : "bg-green-500 hover:bg-green-600"
          } text-white shadow-md transition`}
          title={isRunning ? "Pause Timer" : "Start Timer"}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>

       {/* Reset button */}
       <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
          title="Reset Timer"
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
}

export default Timer;
