import React, { useState } from 'react';

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
  { id: 3, start: '2024-11-20T09:00', end: '2024-11-20T10:00', title: 'Task 3', priority: 'medium' },
  { id: 3, start: '2024-11-20T09:00', end: '2024-11-20T10:00', title: 'Task 4', priority: 'medium' },
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
    <div className="container mx-auto p-10">
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => handleChangeView('prev')}
          className="px-6 py-6 bg-blue-500 text-white rounded-lg shadow-md"
          style={{ width: '60px' }}
        >
          &lt; {/* Left Arrow */}
        </button>
        <div className="text-center flex-1 text-3xl font-semibold">
          {view === 1 && 'Scheduler 1'}
          {view === 2 && 'Scheduler 2'}
          {view === 3 && 'Scheduler 3'}
        </div>
        <button
          onClick={() => handleChangeView('next')}
          className="px-6 py-6 bg-blue-500 text-white rounded-lg shadow-md"
          style={{ width: '60px' }}
        >
          &gt; {/* Right Arrow */}
        </button>
      </div>

      {/* Scheduler Views */}
      <div className="border p-10 rounded-lg shadow-xl mt-10" style={{ minWidth: '800px', maxWidth: '800px', height: 'auto' }}>
        {view === 1 && (
          <div className="relative flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-6">
                {selectedDate.toLocaleString('default', { weekday: 'long' })}, 
                {selectedDate.toLocaleString('default', { day: '2-digit', month: 'long' })}
                </h2>
            <div className="overflow-x-auto">
              <div className="relative flex flex-col">
           {/* Task Progress Bar Row */}
<div className="relative flex flex-col w-full mb-6" style={{ minHeight: '120px', position: 'relative' }}>
  {/* Container for task bars */}
  <div className="relative flex w-full" style={{ position: 'absolute', top: '0', left: '0' }}>
    {getTasksForSelectedDate(selectedDate).map((task, index) => (
      <div
        key={task.id}
        className="task-bar"
        style={{
          ...getTaskStyle(task, index),
          marginBottom: '10px', // Added margin-bottom to each task bar for spacing between them
        }}
      >
        <div className="task-details text-white ml-1">{task.title}</div> {/* Added ml-1 for margin-left */}
      </div>
    ))}
  </div>
</div>

{/* Hour Labels Row (Below the Progress Bars) */}
<div className="flex border-t mt-4 w-full" style={{ marginTop: '20px' }}>
  {[...Array(24)].map((_, idx) => (
    <div
      key={idx}
      className="flex-shrink-0 text-center text-sm py-2"
      style={{
        minWidth: '4rem',
        marginTop: '20px', // Ensure a consistent gap between task bars and hour labels
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
      const startOfWeek = firstDayOfMonth.getDay(); // Get day of the week (0 - Sunday, 6 - Saturday)
      const diff = selectedDate.getDate() - 1 + startOfWeek; // Get days from the start of the month
      const weekNumber = Math.ceil(diff / 7); // Calculate week number
      return (
        <h2 className="text-2xl font-bold mb-6"> {/* Reduced font size */}
          Week {weekNumber}
        </h2>
      );
    })()}

    {/* Get the start and end of the week */}
    {(() => {
      const startOfWeek = selectedDate.getDate() - selectedDate.getDay() + 1; // Ensure week starts on Monday
      const endOfWeek = startOfWeek + 6; // End the week on Sunday

      const weekDays = [];
      for (let i = startOfWeek; i <= endOfWeek; i++) {
        const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
        weekDays.push(day);
      }

      return (
        <div className="flex justify-between mb-6"> {/* Reduced margin bottom */}
          {weekDays.map((day, idx) => {
            const isSelected = day.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={idx}
                onClick={() => handleDateClick(day)}
                className={`flex flex-col items-center justify-center w-16 h-20  /* Smaller width and height */
                            ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                            rounded-2xl`}
              >
                <div className="text-lg">{day.getDate()}</div> {/* Reduced font size */}
                <div className="text-xs">{day.toLocaleString('default', { weekday: 'short' })}</div> {/* Smaller weekday text */}
              </div>
            );
          })}
        </div>
      );
    })()}

    <div className="mt-4"> {/* Reduced margin top */}
      {getTasksForSelectedDate(selectedDate).map((task) => (
        <div key={task.id} className="bg-blue-100 p-6 mb-6 rounded-lg shadow-md"> {/* Reduced padding and margin */}
          <div className="text-lg font-semibold">{task.title}</div> {/* Smaller font size for task title */}
          <div className="text-sm text-gray-600">{`${new Date(task.start).toLocaleTimeString()} - ${new Date(task.end).toLocaleTimeString()}`}</div> {/* Smaller time text */}
        </div>
      ))}
    </div>
  </div>
)}


        
    
{view === 3 && (
  <div className="flex flex-col h-full">
    {/* Display the current month and year with navigation buttons to the right */}
    <div className="flex items-center mb-8">
      <h2 className="text-3xl font-bold mr-4" style={{ marginRight: '450px' }}>
        {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}
      </h2>
      <button
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        onClick={() => handleChangeMonth(-1)} // Decrease month
      >
        &lt; {/* Previous Month symbol */}
      </button>
      <button
        className="px-4 py-2 bg-gray-300 rounded ml-2 hover:bg-gray-400 transition"
        onClick={() => handleChangeMonth(1)} // Increase month
      >
        &gt; {/* Next Month symbol */}
      </button>
    </div>

    <div
      className="grid grid-cols-7 gap-2 overflow-auto"
      style={{
        maxWidth: '100%', // Ensure it fits within the parent container
        maxHeight: 'calc(100vh - 200px)', // Limit the height based on the screen size
      }}
    >
      {/* Render the current month with the correct number of days */}
      {Array.from({ length: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate() }, (_, i) => {
        const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
        const isSelected = day.toDateString() === selectedDate.toDateString();
        return (
          <div
            key={i}
            onClick={() => handleDateClick(day)}
            className={`flex items-center justify-center cursor-pointer
              ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'} 
              rounded`}
            style={{
              minHeight: '60px', // Smaller height for each date box
              height: 'auto', // Adjust height as needed
              width: '60px', // Make sure the items take up full width of the grid cell
              padding: '5px', // Adjust padding for a smaller date box
              fontSize: '17px', // Smaller font size for the date
            }}
          >
            {day.getDate()}
          </div>
        );
      })}
    </div>
  </div>
)}










      </div>
    </div>
  );
};

export default Scheduler;
