import React, { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";

function StreakSummary() {
  const [streakData, setStreakData] = useState({
    streakDays: 0,
    tasksClosed: 0,
    progressIncrease: 0,
    meetingsDecrease: 0,
  });

  useEffect(() => {
    // Simulasi fetch data dari server atau database
    setTimeout(() => {
      setStreakData({
        streakDays: 3,
        tasksClosed: 2,
        progressIncrease: 40,
        meetingsDecrease: 10,
      });
    }, 2000); // Data muncul setelah 2 detik
  }, []);

  return (
    <div className="daily-summary bg-white p-4 border-l-">
      <h2 className="text-lg font-bold mb-2">Daily Summary</h2>
      <div className="flex items-center space-x-2 mb-4">
        <FaFire className="text-red-500 text-xl" />
        <span className="text-gray-700 text-sm font-medium">
          Today is your <span className="font-bold">{streakData.streakDays}rd streak!</span>
        </span>
      </div>
      <p className="text-gray-700 text-sm">
        You had <span className="font-bold">{streakData.progressIncrease}%</span> more focus than usual. You closed{" "}
        <span className="font-bold">{streakData.tasksClosed} tasks</span> on two projects, but the meetings were{" "}
        <span className="font-bold">{streakData.meetingsDecrease}%</span> lower than yesterday.
      </p>
    </div>
  );
}

export default StreakSummary;
