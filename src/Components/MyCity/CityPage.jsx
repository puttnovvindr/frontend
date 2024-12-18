import React from 'react';
import {
  FaHome,
  FaBuilding,
  FaClipboardList,
  FaComment,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import QuestComponent from './Quest';
import Achievements from './Achievements';
import Board from './Board'; // Import Board component
import Navbar from '../Navbar';
import Leaderboard from './Leaderboard';
import Stats from './Stats';

// Komponen untuk menampilkan progress level
const LevelProgress = ({ currentXP, maxXP, level, userName, cityType }) => {
  const progress = (currentXP / maxXP) * 100;
  return (
    <div className="py-4 mb-8">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800 text-2xl">Level {level}</p>
        <p className="text-gray-500">
          {currentXP}/{maxXP} XP
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Informasi tambahan */}
      <div className="mt-4 text-gray-700">
        <p className="font-semibold">{userName}</p>
        <p className="text-gray-500">{cityType}</p>
      </div>
    </div>
  );
};

const CityPage = () => {
  // Data untuk navigasi, statistik, leaderboard, dan level

  const stats = {
    citizens: 126500,
    buildings: 136,
    tasks: 376,
  };

  const currentXP = 4370;
  const maxXP = 5000;
  const level = 56;
  const userName = 'Artika Latifa';
  const cityType = 'Metropolitan';

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-100 p-8 flex-shrink-0">
        <Navbar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col border-l border-r">
        {/* Top Section: Board and Quest */}
        <div className="flex flex-col items-center">
          {/* Board */}
          <div className="w-[680px] flex-shrink-0">
            <div className="py-8">
              <Board />
            </div>
          </div>

          {/* Level Progress */}
          <div className="flex flex-row space-x-1 min-w-[300px] mt-4">
            <div className="w-[680px] flex-shrink-0">
              <LevelProgress
                currentXP={currentXP}
                maxXP={maxXP}
                level={level}
                userName={userName}
                cityType={cityType}
              />
            </div>
          </div>
        </div>


        {/* Bottom Section: Stats, Leaderboard, and Achievements */}
        <div className="flex space-x-7 px-4">
          {/* Stats Section */}
          <Stats />

          {/* Leaderboard Section */}
          <div className="flex-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
              <Leaderboard />
            </div>
          </div>
      </div>      
    </div>

    <div>
      {/* Quest */}
      <div className="w-[390px] flex-shrink-0 ml-auto">
        <div className="bg-gray-50 p-8 border-b">
          <QuestComponent />
        </div>
      </div>

      {/* Achievements Section */}
      <div className="flex-1">
        <div className="bg-gray-50 p-6">
          <Achievements />
        </div>
      </div>
    </div>
  </div>
  );
};

export default CityPage;
