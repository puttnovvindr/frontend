import React, { useState } from "react";

// Quest data for daily and weekly
const dailyQuests = [
  { id: 1, task: "Complete 3 To-Do List Tasks", xp: 10, image: "/Assets/Quest.png" },
  { id: 2, task: "Organize Your Workspace", xp: 5, image: "/Assets/Quest.png" },
  { id: 3, task: "Set Priorities for the Day", xp: 8, image: "/Assets/Quest.png" },
  { id: 4, task: "Focus for 30 Minutes", xp: 7, image: "/Assets/Quest.png" },
  { id: 5, task: "Reflect on the Day's Progress", xp: 6, image: "/Assets/Quest.png" },
  { id: 6, task: "Complete 1 Major Task", xp: 15, image: "/Assets/Quest.png" },
  { id: 7, task: "Organize Files", xp: 5, image: "/Assets/Quest.png" },
];

const weeklyQuests = [
  { id: 1, task: "Complete 5 Major To-Do List Tasks", xp: 20, image: "/Assets/Quest.png" },
  { id: 2, task: "Create a Weekly Plan", xp: 15, image: "/Assets/Quest.png" },
  { id: 3, task: "Stay Organized for 3 Days", xp: 12, image: "/Assets/Quest.png" },
  { id: 4, task: "Complete a Time-Management Exercise", xp: 10, image: "/Assets/Quest.png" },
  { id: 5, task: "Review and Improve a Process", xp: 15, image: "/Assets/Quest.png" },
  { id: 6, task: "Complete 3 Reflection Tasks", xp: 10, image: "/Assets/Quest.png" },
];

const QuestComponent = () => {
    const [dailyCompleted, setDailyCompleted] = useState({});
    const [weeklyCompleted, setWeeklyCompleted] = useState({});
    const [totalXP, setTotalXP] = useState(0);
    const [selectedQuestType, setSelectedQuestType] = useState("daily");

    const handleQuestCompletion = (id, type) => {
      if (type === "daily") {
        setDailyCompleted((prev) => ({ ...prev, [id]: true }));
        const quest = dailyQuests.find((q) => q.id === id);
        setTotalXP((prev) => prev + quest.xp);
      } else if (type === "weekly") {
        setWeeklyCompleted((prev) => ({ ...prev, [id]: true }));
        const quest = weeklyQuests.find((q) => q.id === id);
        setTotalXP((prev) => prev + quest.xp);
      }
    };

    const quests = selectedQuestType === "daily" ? dailyQuests : weeklyQuests;
    const completedQuests = selectedQuestType === "daily" ? dailyCompleted : weeklyCompleted;

    const pendingQuests = quests.filter((quest) => !completedQuests[quest.id]);
    const completedQuestsList = quests.filter((quest) => completedQuests[quest.id]);

    return (
      <div className="pl-2 pr-2 bg-gray-50 max-w-[320px] min-w-[320px] mx-auto" style={{ fontFamily: "Geist, sans-serif" }}>
        {/* Quest Type Header in Rounded Box */}
        <div className="p-2 mt-0 mb-2 rounded-lg">
          <h2 className="text-lg font-bold">{selectedQuestType === "daily" ? "Daily Quests" : "Weekly Quests"}</h2>
        </div>

        {/* Toggle buttons placed above the quest list */}
        <div className="mb-4 mt-1 ml-[65px] ">
          <button
            onClick={() => setSelectedQuestType("daily")}
            className={`mr-2 px-5 py-1 rounded-3xl font-bold ${selectedQuestType === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Daily
          </button>
          <button
            onClick={() => setSelectedQuestType("weekly")}
            className={`px-5 py-1 rounded-3xl font-bold ${selectedQuestType === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Weekly
          </button>
        </div>

        {/* Pending Quests List with Scroll */}
        <div className="grid grid-cols-1 gap-1 mb-3 ml-1 max-h-[350px] overflow-y-auto">
          {pendingQuests.map((quest) => (
            <div
              key={quest.id}
              className={`p-1 border border-gray-300 rounded-lg bg-gray-50 flex items-center max-w-xs min-w-[130px] max-h-[70px] min-h-[70px]`}
            >
              {/* Quest Image */}
              <img
                src={quest.image}
                alt={quest.task}
                className="w-8 h-8 object-cover rounded mr-2"
              />
              <div className="text-xs">
                <h3
                  className={`font-semibold ${
                    completedQuests[quest.id] ? "line-through text-gray-500" : ""
                  }`}
                >
                  {quest.task}
                </h3>
                <p className="text-xs">+{quest.xp} XP</p>
                {!completedQuests[quest.id] && (
                  <button
                    className="mt-1 px-1.5 py-0.5 bg-blue-500 text-white rounded text-xs"
                    onClick={() => handleQuestCompletion(quest.id, selectedQuestType)}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completed Quests List */}
        <div className="grid grid-cols-1 gap-2">
          {completedQuestsList.map((quest) => (
            <div
              key={quest.id}
              className="p-1 border border-gray-300 rounded-lg bg-gray-200 flex items-center max-w-xs min-w-[200px] max-h-[100px] min-h-[70px]"
            >
              {/* Quest Image */}
              <img
                src={quest.image}
                alt={quest.task}
                className="w-8 h-8 object-cover rounded mr-2"
              />
              <div className="text-xs">
                <h3 className="font-semibold line-through text-gray-500">{quest.task}</h3>
                <p className="text-xs">+{quest.xp} XP</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total XP */}
        {/* <div className="mt-4">
          <h3 className="text-sm font-semibold">Total XP: {totalXP}</h3>
        </div> */}
      </div>
    );
  };
  
export default QuestComponent;
