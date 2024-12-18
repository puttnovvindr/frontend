import React from 'react';

function Leaderboard() {
  const leaderboard = {
    global: [
      { name: 'Artika Latifa', city: 'Lavinea City', level: 87, trophy: 'gold' },
      { name: 'Puput Novita', city: 'Wistenia Land', level: 82, trophy: 'silver' },
      { name: 'Jade Austin', city: 'Sky City', level: 75, trophy: 'bronze' },
      { name: 'Mira Sinta', city: 'Terra Hills', level: 65, trophy: 'gold' },
    ],
    friends: [
      { name: 'Artika Latifa', city: 'Lavinea City', level: 87, trophy: 'gold' },
      { name: 'Puput Novita', city: 'Wistenia Land', level: 82, trophy: 'silver' },
    ],
  };

  return (
    <section className="w-[450px] space-y-6 bg-gray-50 rounded-lg p-4">
      {/* Global and Friends Leaderboard Section */}
      <div className="flex justify-between gap-6">
        {/* Global Leaderboard Section */}
        <div className="w-[45%] max-h-[250px] overflow-y-auto space-y-4">
          <h3 className="font-semibold text-gray-800 mb-2">Global Rankings</h3>
          {leaderboard.global.map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <span className="text-2xl">
                {user.trophy === 'gold' ? '🏆' : '🥈'}
              </span>
              <div className="ml-3">
                <p className="text-gray-800 font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.city}</p>
                <p className="text-gray-600 text-xs">Level {user.level}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Friends Leaderboard Section */}
        <div className="w-[45%] max-h-[250px] overflow-y-auto space-y-4">
          <h3 className="font-semibold text-gray-800 mb-2">Friends Rankings</h3>
          {leaderboard.friends.map((user, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <span className="text-2xl">
                {user.trophy === 'gold' ? '🏆' : '🥈'}
              </span>
              <div className="ml-3">
                <p className="text-gray-800 font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.city}</p>
                <p className="text-gray-600 text-xs">Level {user.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
