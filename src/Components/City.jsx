import React, { useState, useEffect } from 'react'
import Board from './Board'
import Cell from './Cell'

function City() {
  // Dummy data untuk level dan XP
  const [levelData, setLevelData] = useState({
    level: 56,
    xpCurrent: 4370,
    xpMax: 5000
  });

  // Dummy data untuk rewards
  const [rewardsData, setRewardsData] = useState({
    buildings: 2,
    trophies: 1000
  });

  // Update progress bar
  const xpProgress = (levelData.xpCurrent / levelData.xpMax) * 100;

  // Simulasi fetch data dari database (gunakan setTimeout untuk efek dummy)
  useEffect(() => {
    setTimeout(() => {
      setLevelData({
        level: 58,
        xpCurrent: 4500,
        xpMax: 5000
      });
    }, 2000); // Simulasi perubahan level setelah 2 detik
  }, []);

  // Dummy data untuk Followers
    const [followersData, setFollowersData] = useState(126500); // misalnya 126.5K followers

  return (
    <section className="border-b">
      {/* gamification */}
      <div className="p-5 font-sans">
        <Board />

        {/* Informasi Pengguna dengan Followers */}
        <div className="flex items-center mb-2 mt-2 justify-between">
          <div>
            <h1 className="text-start mb-0 mt-1 font-bold">Putri Sandia</h1>
            <h2 className="text-start mt-[-3px] font-bold text-gray-500 text-xs">
              Metropolis
            </h2>
          </div>

          {/* Followers Section */}
            <span className="flex items-center text-lg font-bold">
            <span role="img" aria-label="icon" className="mr-2">
                👤
            </span>
            {followersData.toLocaleString()} {/* Format angka ke format ribuan */}
            </span>
        </div>

        {/* Kotak Level dan Rewards */}
        <div className="flex justify-between items-center w-full mt-2 rounded-lg bg-white">
          {/* Level dan XP */}
          <div className="w-full">
            <p className="m-0 mb-1 font-bold">
              Lv. {levelData.level}{' '}
              <span className="text-gray-400 font-normal">
                {levelData.xpCurrent}/{levelData.xpMax} XP
              </span>
            </p>
            <div className="h-1.5 w-3/4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-1.5 bg-black rounded-full"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Rewards */}
          <div className="flex gap-2">
            <div className="flex items-center justify-center flex-col p-1 w-14 rounded-lg bg-gray-200 shadow-md">
              <span role="img" aria-label="building" className="text-xl">
                🏢
              </span>
              <p className="m-1 font-bold">{rewardsData.buildings}</p>
            </div>

            <div className="flex items-center justify-center flex-col p-1 w-14 rounded-lg bg-gray-200 shadow-md">
              <span role="img" aria-label="reward" className="text-xl">
                🏅
              </span>
              <p className="m-1 font-bold">{rewardsData.trophies}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default City
