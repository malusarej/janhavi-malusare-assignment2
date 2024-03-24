import React, { createContext, useState } from 'react';

export const GameSettingsContext = createContext();

export const GameSettingsProvider = ({ children }) => {
  const [gridSize, setGridSize] = useState({ height: 20, width: 20 }); // Default grid size

  return (
    <GameSettingsContext.Provider value={{ gridSize, setGridSize }}>
      {children}
    </GameSettingsContext.Provider>
  );
};