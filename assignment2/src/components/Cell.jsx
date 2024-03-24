import React from 'react';

const Cell = ({ isAlive, onClick, heatmapColor }) => {
  return (
    <div
      className={`cell ${isAlive ? 'alive' : ''}`}
      onClick={onClick}
      style={{ backgroundColor: heatmapColor }}
    ></div>
  );
};

export default Cell;