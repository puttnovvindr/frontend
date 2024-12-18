import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Helper function to generate an array of days for the current week
const generateWeek = (startDate) => {
  let week = [];
  let current = new Date(startDate);
  current.setDate(current.getDate() - current.getDay()); // start with Sunday

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return week;
};



// Dummy data for tasks
const tasks = [
  { id: 1, start: '2024-11-20T03:00', end: '2024-11-20T05:00', title: 'Task 1', priority: 'high' },
  { id: 2, start: '2024-11-20T10:00', end: '2024-11-20T12:00', title: 'Task 2', priority: 'low' },
  { id: 3, start: '2024-11-22T09:00', end: '2024-11-22T10:00', title: 'Task 3', priority: 'medium' },
  { id: 3, start: '2024-11-22T09:00', end: '2024-11-22T10:00', title: 'Task 4', priority: 'medium' },
 ];

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default selected date is today
  const [view, setView] = useState(1); // 1 for Scheduler1, 2 for Scheduler2, 3 for Scheduler3

  // Generate current week for Scheduler2
  const week = generateWeek(selectedDate);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleChangeView = (direction) => {
    setView((prevView) => {
      if (direction === 'next') {
        return prevView === 3 ? 1 : prevView + 1; // Cycle to next view
      }
      return prevView === 1 ? 3 : prevView - 1; // Cycle to previous view
    });
  };

  // Filter tasks for the selected date (only tasks that match the selected date)
  const getTasksForSelectedDate = (date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.start);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getTaskStyle = (task, index) => {
    const hourWidth = 72; // Width for one hour in pixels
    const taskStart = new Date(task.start);
    const taskEnd = new Date(task.end);
    const taskStartHour = taskStart.getHours() + taskStart.getMinutes() / 60;
    const taskEndHour = taskEnd.getHours() + taskEnd.getMinutes() / 60;
  
    // Use the start of the day (midnight) to align the task bars
    const startPosition = taskStartHour * hourWidth; // Position based on task's start hour
    const taskWidth = (taskEndHour - taskStartHour) * hourWidth; // Width based on task duration
  
    // Add an overlap offset to prevent task bars from overlapping
    const overlapOffset = index * 40; // Increased offset for better visual separation
  
    return {
      position: 'absolute',
     
      top: `${overlapOffset}px`, // Adjust this for vertical task bar spacing
      left: `${startPosition}px`, // Position the task based on the start time
      width: `${taskWidth}px`, // Width based on task duration
      height: '30px', // Height for each task bar
      backgroundColor: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981',
      borderRadius: '5px', // Rounded corners for the task bars
    };
  };
  
  const handleChangeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction); // Add or subtract one month
    setSelectedDate(newDate); // Update selectedDate
  };
  
  const renderDaysInMonth = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // Get the number of days in the current month
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1); // Generate each day of the month
      const isSelected = day.toDateString() === selectedDate.toDateString(); // Check if this day is selected
      return (
        <div
          key={i}
          onClick={() => handleDateClick(day)} // Handle click on a date
          className={`flex items-center justify-center p-4 cursor-pointer 
          ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'} 
          rounded`} // Styling for selected or non-selected dates
          style={{
            minHeight: '80px',
            height: 'auto',
            width: '100%',
          }}
        >
          {day.getDate()}
        </div>
      );
    });
    
    return daysArray;
  };
  
  

  

  return (
    <div className="container mx-auto">
  
      {/* Scheduler Views */}
      <div className="border-b p-8" style={{ minWidth: '800px', maxWidth: '600px', height: '370px' }}>
      {view === 1 && (
        <div className="relative flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-start">
            {selectedDate.toLocaleString('default', { weekday: 'long' })}, {selectedDate.toLocaleString('default', { day: '2-digit', month: 'long' })}
            </h2>

            <div className="relative overflow-x-auto">
            <div className="relative flex flex-col w-full">
                {/* Task Progress Bar Row */}
                <div className="relative flex flex-col w-full mb-4" style={{ minHeight: '200px', position: 'relative' }}>
                {getTasksForSelectedDate(selectedDate).map((task, index) => (
                    <div
                    key={task.id}
                    className="task-bar"
                    style={{
                        ...getTaskStyle(task, index),
                        marginBottom: '8px', // Adjust margin to avoid overlap
                    }}
                    >
                    <div className="task-details text-white ml-1">{task.title}</div> {/* Add slight margin for text */}
                    </div>
                ))}
                </div>

                {/* Hour Labels Row */}
                <div className="flex w-full border-t">
                {[...Array(24)].map((_, idx) => (
                    <div
                    key={idx}
                    className="flex-shrink-0 text-center text-xs py-1"
                    style={{
                        minWidth: '3.5rem', // Adjusted width for better hour alignment
                    }}
                    >
                    {`${String(idx).padStart(2, '0')}:00`}
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        )}

  
        {/* Scheduler 2: Week-based task overview */}
        {view === 2 && (
          <div className="flex flex-col h-full">
            {/* Calculate the week number */}
            {(() => {
              const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
              const startOfWeek = firstDayOfMonth.getDay();
              const diff = selectedDate.getDate() - 1 + startOfWeek;
              const weekNumber = Math.ceil(diff / 7);
              return (
                <h2 className="text-xl font-bold mb-4">
                  Week {weekNumber}
                </h2>
              );
            })()}
  
            {/* Get the start and end of the week */}
            {(() => {
              const startOfWeek = selectedDate.getDate() - selectedDate.getDay() + 1;
              const endOfWeek = startOfWeek + 6;
  
              const weekDays = [];
              for (let i = startOfWeek; i <= endOfWeek; i++) {
                const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
                weekDays.push(day);
              }
  
              return (
                <div className="flex justify-between mb-4">
                  {weekDays.map((day, idx) => {
                    const isSelected = day.toDateString() === selectedDate.toDateString();
                    return (
                      <div
                        key={idx}
                        onClick={() => handleDateClick(day)}
                        className={`flex flex-col items-center justify-center w-20 h-28 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-xl`}
                      >
                        <div className="text-sm font-bold">{day.getDate()}</div> {/* Smaller font size */}
                        <div className="text-xs">{day.toLocaleString('default', { weekday: 'short' })}</div> {/* Smaller weekday text */}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
  
            <div className="mt-4">
              {getTasksForSelectedDate(selectedDate).map((task) => (
                <div key={task.id} className="bg-blue-100 p-4 mb-4 rounded-lg shadow-md">
                  <div className="text-sm font-semibold">{task.title}</div> {/* Smaller font size for task title */}
                  <div className="text-xs text-gray-600">{`${new Date(task.start).toLocaleTimeString()} - ${new Date(task.end).toLocaleTimeString()}`}</div> {/* Smaller time text */}
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Scheduler 3: Month-based task overview */}
        {view === 3 && (
          <div className="flex flex-col h-full">
            {/* Display the current month and year with navigation buttons to the right */}
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-bold" style={{ marginRight: '492px' }}>
                {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
              </h2>
              <button
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => handleChangeMonth(-1)} // Decrease month
              >
                <IoIosArrowBack size={16} /> {/* Left Arrow */}
              </button>
              <button
                className="px-2 py-1 bg-gray-300 rounded ml-2 hover:bg-gray-400 transition"
                onClick={() => handleChangeMonth(1)} // Increase month
              >
                <IoIosArrowForward size={16} /> {/* Right Arrow */}
              </button>
            </div>
  
            <div
              className="grid grid-cols-7 gap-2 overflow-auto"
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 200px)', // Adjust height
              }}
            >
              {Array.from({ length: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate() }, (_, i) => {
                const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
                const isSelected = day.toDateString() === selectedDate.toDateString();
                return (
                  <div
                    key={i}
                    onClick={() => handleDateClick(day)}
                    className={`flex items-center justify-center cursor-pointer
                      ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'} 
                      rounded-sm`}
                    style={{
                      minHeight: '40px', // Smaller height for each date box
                      height: 'auto', // Adjust height as needed
                      width: '80px', // Make sure the items take up full width of the grid cell
                      padding: '3px', // Adjust padding for a smaller date box
                      fontSize: '14px', // Smaller font size for the date
                    }}
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        )}
  
        <div className="flex justify-end gap-3 items-center w-full">
          <button
            onClick={() => handleChangeView('prev')}
            className="flex justify-center p-1 bg-blue-500 text-white rounded-full shadow-md"
            style={{ width: '35px' }}
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={() => handleChangeView('next')}
            className="flex justify-center p-1 bg-blue-500 text-white rounded-full shadow-md"
            style={{ width: '35px' }}
          >
            <IoIosArrowForward />
          </button>
        </div>
  
      </div>
  
    </div>
  );
  
};

export default Scheduler;