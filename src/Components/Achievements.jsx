import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";

const achievements = [
  { 
    id: 1, 
    task: "Task slasher!", 
    description: "Finish 500 overall tasks (376/500)", 
    xp: 1000, 
    progress: 376, 
    target: 500, 
    image: "./Task.png" 
  },
  { 
    id: 2, 
    task: "Big city!", 
    description: "Get 150 Buildings (136/150)", 
    xp: 1250, 
    progress: 136, 
    target: 150, 
    image: "./City1.png" 
  },
  { 
    id: 3, 
    task: "The Mayor!", 
    description: "Get 100K Citizens (126.5K/100K)", 
    xp: 1000, 
    progress: 126500, 
    target: 100000, 
    image: "./Mayor.png" 
  },
  { 
    id: 4, 
    task: "The Mayor!", 
    description: "Get 100K Citizens (126.5K/100K)", 
    xp: 1000, 
    progress: 126500, 
    target: 100000, 
    image: "./Mayor.png" 
  },
  { 
    id: 5, 
    task: "The Mayor!", 
    description: "Get 100K Citizens (126.5K/100K)", 
    xp: 1000, 
    progress: 126500, 
    target: 100000, 
    image: "./Mayor.png" 
  },
];

const Achievements = () => {
  const [visibleAchievements, setVisibleAchievements] = useState(achievements.slice(0, 5));
  const achievementsEndRef = useRef(null);

  const handleScroll = () => {
    const bottom = achievementsEndRef.current.getBoundingClientRect().bottom <= window.innerHeight;
    if (bottom) {
      loadMoreAchievements();
    }
  };

  const loadMoreAchievements = () => {
    if (visibleAchievements.length < achievements.length) {
      setVisibleAchievements((prevAchievements) => [
        ...prevAchievements,
        ...achievements.slice(prevAchievements.length, prevAchievements.length + 5),
      ]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleAchievements]);

  return (
    <div className="pl-4 pr-4 bg-gray-50 min-w-[320px] max-w-[320px] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Achievements</h2>

      {/* Achievements List */}
      <div className="space-y-2">
        {visibleAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center p-2 bg-gray-50 border border-gray-300 rounded-lg"
          >
            {/* Achievement Image */}
            <div className="flex items-center justify-center w-8 h-8">
              <img
                src={achievement.image}
                alt={achievement.task}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="ml-2 flex-1">
              {/* Achievement Title and Description */}
              <h3 className="text-sm font-semibold text-gray-700">{achievement.task}</h3>
              <p className="text-xs text-gray-600">{achievement.description}</p>

              {/* Progress */}
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs text-gray-500">{`${achievement.progress}/${achievement.target}`}</div>
                <div className="text-xs text-gray-500">+{achievement.xp} XP</div>
              </div>
            </div>

            {/* Completion Indicator */}
            {achievement.progress >= achievement.target && (
              <div className="ml-2 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                <FaCheckCircle className="text-green-500 text-lg" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Placeholder to trigger loading more achievements */}
      <div ref={achievementsEndRef} className="h-1"></div>
    </div>
  );
};

export default Achievements;
