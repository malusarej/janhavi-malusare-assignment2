import React from 'react';
import './App.css'
import Home from './pages/Home';
import GameOfLife from './pages/GameOfLife';
import { GameSettingsProvider } from './components/GameSettingsContext';
import Credits from './pages/Credits';
import Navbar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameSettingsProvider><GameOfLife /></GameSettingsProvider>} />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </div>
    </>
  )
}

export default App;


