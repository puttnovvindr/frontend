import React from "react";
import { FaFire } from "react-icons/fa";

function StreakSummary({ streakDays, tasksClosed, progressIncrease, meetingsDecrease }) {
    return(
        <div className="daily-summary bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Daily Summary</h2>
            <div className="flex items-center space-x-2 mb-4">
                <FaFire className="text-red-500 text-xl" />
                <span className="text-gray-700 text-sm font-medium">
                    Today is your <span className="font-bold">{streakDays}rd streak!</span>
                </span>
            </div>
            <p className="text-gray-700 text-sm">
                You had <span className="font-bold">{progressIncrease}%</span> more focus than usual. You closed{" "}
                <span className="font-bold">{tasksClosed} tasks</span> on two projects, but the meetings were{" "}
                <span className="font-bold">{meetingsDecrease}%</span> lower than yesterday.
            </p>
        </div>
    );
}

export default StreakSummary;