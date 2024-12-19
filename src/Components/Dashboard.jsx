import React from "react";
import { useTheme } from "./ThemeContext";
import Topbar from "./Topbar";
import StreakSummary from "./StreakSummary";
import Timer from "./Timer";
import Scheduler from "./Scheduler";
import Notes from "./Notes";
import TaskDashboard from "./TaskDashboard";
import City from "./City";
import Navbar from "./Navbar";

function Dashboard() {
  const { isDarkMode } = useTheme();

  return (
    <section className={`min-h-screen flex ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* Sidebar */}
      <aside className={`w-1/7 p-8 flex-shrink-0 flex flex-col justify-center items-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <Navbar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <div className="w-full">
          <Topbar />
        </div>

        {/* Content Section below Topbar */}
        <div className="flex-1 flex border-l">
          <div className="flex flex-col w-full">
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
            <StreakSummary />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
