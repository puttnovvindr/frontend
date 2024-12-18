import React from 'react';

function Stats() {
  const stats = {
    citizens: 126500,
    buildings: 136,
    tasks: 376,
  };

  return (
    <div className="w-[200px] flex-shrink-0">
      <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col gap-4">
        {/* Title */}
        <div className="text-black text-center font-bold text-xl">City Stats</div>

        {/* Stats */}
        <div className="flex flex-col gap-6">
          {/* Citizens Stat */}
          <div className="flex items-center justify-between text-black text-lg">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">👤</span>
              <span className="text-[14px]">{stats.citizens.toLocaleString()} Citizens</span>
            </div>
          </div>

          {/* Buildings Stat */}
          <div className="flex items-center justify-between text-black text-lg">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🏢</span>
              <span className="text-[14px]">{stats.buildings} Buildings</span>
            </div>
          </div>

          {/* Tasks Stat */}
          <div className="flex items-center justify-between text-black text-lg">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">📋</span>
              <span className="text-[14px]">{stats.tasks} Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
