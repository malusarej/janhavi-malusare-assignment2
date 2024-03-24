import React, { useState, useEffect, useContext } from 'react';
import Cell from '../components/Cell';
import { GameSettingsContext } from '../components/GameSettingsContext';
import './GameOfLife.css';

const GameOfLife = () => {
  const [grid, setGrid] = useState([]);
  const [livingCellsCount, setLivingCellsCount] = useState(0);
  const { gridSize, setGridSize } = useContext(GameSettingsContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [heatmap, setHeatmap] = useState(false);
  const [autoplay, setAutoplay] = useState(false); 
  const [autoplayIntervalId, setAutoplayIntervalId] = useState(null); 
  const { height, width } = gridSize;

  useEffect(() => {
    initializeGrid();
  }, [gridSize]);

  useEffect(() => {
    if (autoplay) {
      const intervalId = setInterval(() => {
        progressSimulation();
      }, 100);
      setAutoplayIntervalId(intervalId);
    } else {
      clearInterval(autoplayIntervalId);
    }
  
    return () => clearInterval(autoplayIntervalId);
  }, [autoplay, grid]);
  
  const initializeGrid = () => {
    const newGrid = [];
    let livingCount = 0;
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const isAlive = Math.random() < 0.05; 
        if (isAlive) livingCount++;
        row.push({ alive: isAlive, age: 0 });
      }
      newGrid.push(row);
    }
    console.log("New grid:", newGrid);
    setGrid(newGrid);
    setLivingCellsCount(livingCount);
  };

  const handleHeightChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 3 && value <= 40) {
      setGridSize({ ...gridSize, height: value });
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a value between 3 and 40');
    }
  };

  const handleWidthChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 3 && value <= 40) {
      setGridSize({ ...gridSize, width: value });
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a value between 3 and 40');
    }
  };

  const handleSubmit = () => {
    initializeGrid();
  };

  const resetGrid = () => {
    const newHeight = 20;
    const newWidth = 20;
    const newGrid = [];
    let livingCount = 0;
    
    for (let i = 0; i < newHeight; i++) {
      const row = [];
      for (let j = 0; j < newWidth; j++) {
        const isAlive = Math.random() < 0.05; 
        if (isAlive) livingCount++;
        row.push({ alive: isAlive, age: 0 });
      }
      newGrid.push(row);
    }
  
    setGrid(newGrid);
    setLivingCellsCount(livingCount);
    setGridSize({ height: newHeight, width: newWidth }); 
  };
  
  
  const progressSimulation = () => {
    const newGrid = grid.map((row, rowIndex) => 
      row.map((cell, colIndex) => {
        const neighbors = countNeighbors(rowIndex, colIndex);
        const isAlive = cell.alive;
        const age = cell.age;
        if (isAlive && (neighbors < 2 || neighbors > 3)) {
          return { alive: false, age: 0 }; 
        } else if (!isAlive && neighbors === 3) {
          return { alive: true, age: 0 }; 
        } else {
          return { alive: isAlive, age: isAlive ? age + 1 : age }; 
        }
      })
    );
    setGrid(newGrid);
    setLivingCellsCount(newGrid.flat().filter(cell => cell.alive).length);
  };

  const countNeighbors = (x, y) => {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const row = (x + i + height) % height;
        const col = (y + j + width) % width;
        if (grid[row][col].alive) {
          count++;
        }
      }
    }
    return count;
  };

  const toggleHeatmap = () => {
    setHeatmap(!heatmap);
  };

  const getColorForCell = (age) => {
    if (!heatmap) return gridColor;

    const maxAge = 10;
    const gradientStart = [0, 255, 255]; 
    const gradientEnd = [128, 0, 128]; 

    const ratio = Math.min(age / maxAge, 1);
    const gradient = gradientStart.map((channel, index) =>
      Math.round(channel * (1 - ratio) + gradientEnd[index] * ratio)
    );

    return `rgb(${gradient.join(',')})`;
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex].alive = !newGrid[rowIndex][colIndex].alive;
    setGrid(newGrid);
  };

  const gridColor = heatmap ? '#000000' : '#00FFFF'; 

  return (
    <div className="game-container">
      <div class="variables">
        Height: <input type="number" value={height} onChange={handleHeightChange} />
        Width: <input type="number" value={width} onChange={handleWidthChange} />
      </div>
      <div class="submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="grid">
        {grid.map((row, rowIndex) =>
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isAlive={cell.alive}
                color={getColorForCell(cell.age)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="controls">
        <button class="reset" onClick={resetGrid}>Reset</button>
        <button onClick={progressSimulation}>Next Frame</button>
        <button onClick={() => setAutoplay(!autoplay)}>
          {autoplay ? 'Stop Autoplay' : 'Start Autoplay'}
        </button>
        <label id="heatmap">
          Heatmap:
          <input
            type="checkbox"
            checked={heatmap}
            onChange={toggleHeatmap}
          />
        </label>
      </div>
      <div className="living-cells-count">Living Cells: {livingCellsCount}</div>
    </div>
  );
  
};

export default GameOfLife;
