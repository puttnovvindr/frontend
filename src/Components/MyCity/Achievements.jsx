import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { debounce } from "lodash";

const achievements = [
  { id: 1, task: "Task slasher!", description: "Finish 500 overall tasks", xp: 1000, progress: 376, target: 500, image: "/Assets/Task.png" },
  { id: 2, task: "Big city!", description: "Get 150 Buildings", xp: 1250, progress: 136, target: 150, image: "/Assets/City.png" },
  { id: 3, task: "The Mayor!", description: "Get 100K Citizens", xp: 1000, progress: 126500, target: 100000, image: "/Assets/Mayor.png" },
  { id: 4, task: "Super Tasker", description: "Complete 1000 tasks", xp: 1500, progress: 850, target: 1000, image: "/Assets/Task.png" },
  { id: 5, task: "Mega Builder", description: "Build 300 Buildings", xp: 1600, progress: 280, target: 300, image: "/Assets/City.png" },
];

const Achievements = () => {
  const [visibleAchievements, setVisibleAchievements] = useState(achievements.slice(0, 3)); // Load 3 at a time
  const achievementsEndRef = useRef(null);

  const loadMoreAchievements = () => {
    if (visibleAchievements.length < achievements.length) {
      setVisibleAchievements((prevAchievements) => [
        ...prevAchievements,
        ...achievements.slice(prevAchievements.length, prevAchievements.length + 3),
      ]);
    }
  };

  const handleScroll = debounce(() => {
    if (achievementsEndRef.current) {
      const bottom =
        achievementsEndRef.current.getBoundingClientRect().top <= window.innerHeight;
      if (bottom) loadMoreAchievements();
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleAchievements]);

  return (
    <div className="pl-4 pr-4 bg-gray-50 min-w-[320px] max-w-[320px] mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Achievements</h2>

      {/* Achievements List with Scroll */}
      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {visibleAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center p-3 bg-gray-50 border border-gray-300 rounded-lg"
          >
            {/* Achievement Image */}
            <div className="flex items-center justify-center w-10 h-10">
              <img
                src={achievement.image}
                alt={achievement.task}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div className="ml-3 flex-1">
              {/* Achievement Title and Description */}
              <h3 className="text-sm font-semibold text-gray-700">{achievement.task}</h3>
              <p className="text-xs text-gray-600">{achievement.description}</p>

              {/* Progress */}
              <div className="flex items-center justify-between mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{
                      width: `${(achievement.progress / achievement.target) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  {achievement.progress}/{achievement.target}
                </span>
              </div>

              {/* XP Gained */}
              <p className="text-xs text-gray-500 mt-1">+{achievement.xp} XP</p>
            </div>

            {/* Completion Indicator */}
            {achievement.progress >= achievement.target && (
              <div className="ml-3 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
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
