import React, { useState } from "react";
import StreakSummary from "./StreakSummary";
import Topbar from "./Topbar";
import Timer from "./Timer"; // Pastikan path sesuai dengan lokasi timer.jsx
import Scheduler from "./Scheduler";
import Notes from "./Notes";
import TaskDashboard from "./TaskDashboard";
import City from "./City";
import Cell from "./Cell";
import Board from "./Board";
import Navbar from "./Navbar";


function Dashboard() {
  return (
    <section className="min-h-screen flex bg-white text-gray-900">
      {/* Sidebar kiri */}
      <aside className="w-1/5 bg-white p-8 border-r">
        <Navbar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-1/5"> {/* Add margin-left to avoid overlap with sidebar */}
        {/* Topbar above scheduler and timer */}
        <div className="w-full">
          <Topbar /> {/* Topbar stays here */}
        </div>

        {/* Content Section below Topbar */}
        <div className="flex-1 bg-white flex border-l">
          {/* Scheduler & Notes Section */}
          <div className="flex flex-col">
            <Scheduler />
            <div className="grid grid-cols-2">
              <TaskDashboard />
              <Notes />
            </div>
          </div>

          {/* Timer Section */}
          <div className="border-l">
            <Timer/>
            <City />
            <StreakSummary />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
