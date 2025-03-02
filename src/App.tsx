import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import GamePage from './pages/GamePage';
import SensitivityPage from './pages/SensitivityPage';
import TutorialsPage from './pages/TutorialsPage';
import { colorThemes } from './constants/themes';

function App() {
  const [colorTheme, setColorTheme] = useState<keyof typeof colorThemes>('gray');
  
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme && Object.keys(colorThemes).includes(savedTheme)) {
      setColorTheme(savedTheme as keyof typeof colorThemes);
    }
  }, []);
  
  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  return (
    <>
      <Helmet>
        <title>AimTrainer - Free Aim Training for CS2, Valorant, Fortnite</title>
        <meta name="description" content="Free aim trainer to improve precision and reaction time for FPS games. Practice with customizable targets, difficulty levels, and track your progress." />
      </Helmet>
      
      <Routes>
        <Route path="/sensitivity" element={<SensitivityPage colorTheme={colorTheme} />} />
        <Route path="/precision" element={<GamePage colorTheme={colorTheme} setColorTheme={setColorTheme} />} />
        <Route path="/tracking" element={<GamePage colorTheme={colorTheme} setColorTheme={setColorTheme} />} />
        <Route path="/tutorials" element={<TutorialsPage colorTheme={colorTheme} />} />
        <Route path="/" element={<GamePage colorTheme={colorTheme} setColorTheme={setColorTheme} />} />
      </Routes>
    </>
  );
}

export default App;