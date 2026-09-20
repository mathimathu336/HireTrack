import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import Profile from "./pages/Profile";

import "./App.css";

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleTheme = () => {
    setDarkMode((currentMode) => {
      const newMode = !currentMode;

      localStorage.setItem("darkMode", newMode);

      return newMode;
    });
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>

      <BrowserRouter>

        {/* Global Dark / Light Mode Button */}
        <button
          className="global-theme-button"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <Routes>
        <Route path="/" element={<Login toggleTheme={toggleTheme} darkMode={darkMode} />} />

        <Route path="/login" element={<Login toggleTheme={toggleTheme} darkMode={darkMode} />} />

          <Route
            path="/register"
            element={
              <Register
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/applications"
            element={
              <Applications
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/interviews"
            element={
              <Interviews
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/skills"
            element={
              <Skills
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/resume"
            element={
              <Resume
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
                toggleTheme={toggleTheme}
                darkMode={darkMode}
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;