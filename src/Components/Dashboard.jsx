import React from "react";
import { useTheme } from "./ThemeContext";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import StreakSummary from "./StreakSummary";
import Timer from "./Timer";
import Scheduler from "./Scheduler";
import Notes from "./Notes";
import TaskDashboard from "./TaskDashboard";
import City from "./City";

function Dashboard() {
  const { isDarkMode } = useTheme(); // Access dark mode state from context

  return (
    <section className={`min-h-screen flex ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <aside className="w-1/5 p-8 border-r">
        <Navbar /> {/* Navbar will automatically adjust based on dark mode */}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-1/5">
        <div className="w-full">
          <Topbar /> {/* Topbar will adjust based on dark mode */}
        </div>

        {/* Content Section below Topbar */}
        <div className="flex-1 flex border-l">
          <div className="flex flex-col">
            <Scheduler />
            <div className="grid grid-cols-2 gap-4">
              <TaskDashboard />
              <Notes />
            </div>
          </div>

          {/* Timer Section */}
          <div className="border-l">
            <Timer />
            <City />
            <StreakSummary /> {/* StreakSummary will adjust based on dark mode */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
