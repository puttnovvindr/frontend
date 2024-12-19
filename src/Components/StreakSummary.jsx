import React, { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";

function StreakSummary({ isDarkMode }) {
  const [streakData, setStreakData] = useState({
    streakDays: 0,
    tasksClosed: 0,
    progressIncrease: 0,
    meetingsDecrease: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStreakData({
        streakDays: 3,
        tasksClosed: 2,
        progressIncrease: 40,
        meetingsDecrease: 10,
      });
    }, 2000); 
  }, []);

  return (
      <div
        className={`daily-summary p-4 border-l-4 ${
          isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
        } w-full max-w-5xl mx-auto transition-colors duration-300`}
        style={{ padding: '20px' }} 
      >
        <h2 className="text-lg font-bold mb-2">Daily Summary</h2>
        <div className="flex items-center space-x-2 mb-4">
          <FaFire className="text-red-500 text-xl" />
          <span className="text-sm font-medium">
            Today is your <span className="font-bold">{streakData.streakDays}rd streak!</span>
          </span>
        </div>
        <p className="text-sm">
          You had <span className="font-bold">{streakData.progressIncrease}%</span> more focus than usual. You closed{" "}
          <span className="font-bold">{streakData.tasksClosed} tasks</span> on two projects, but the meetings were{" "}
          <span className="font-bold">{streakData.meetingsDecrease}%</span> lower than yesterday.
        </p>
      </div>
    );
}

export default StreakSummary;
