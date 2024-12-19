import './App.css';
import React from 'react';
// import Homepage from './Components/Homepage.jsx';
// import ProceduralTree from './ProceduralTree';
// import Task from './Components/Task.jsx';
import Dashboard from './Components/Dashboard.jsx';
import CityPage from './Components/MyCity/CityPage.jsx';
import { ThemeProvider } from './Components/ThemeContext';


function App() {
  return (
    <div >
      <ThemeProvider>
      {/* <LoginSignUp/> */}
      {/* <Homepage /> */}
      {/* <Task /> */}
      < CityPage />
      {/* <Homepage /> */}
      {/* < Dashboard /> */}
      </ThemeProvider>

    </div>
  );
}


export default App;