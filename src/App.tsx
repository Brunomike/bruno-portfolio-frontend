import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AnimatedRoutes from './components/AnimatedRoutes';
import './App.scss';

function App() {
  const savedTheme = localStorage.getItem("myTheme")
  if (savedTheme === null || savedTheme === 'undefined') {
    localStorage.setItem("myTheme", "dark")
  }

  const [theme, setTheme] = useState(savedTheme != null ? savedTheme : "dark");

  const handleThemeSelection = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    localStorage.setItem("myTheme", theme === "light" ? "dark" : "light");
  }

  //  const isAuth = localStorage.getItem("token")

  return (
    <>
      <div className={`app ${theme === 'dark' ? 'app__dark' : ""}`}>
        <AnimatedRoutes theme={theme} handleThemeSelection={handleThemeSelection} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
