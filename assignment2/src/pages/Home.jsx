import React from 'react';
import './Home.css'
import logo from '../assets/conway.gif'

const Home = () => {
  return (
    <div> 
      <div class="container">   
        <p>This is a simulation of Conway's Game of Life. a simple mathematical simulation involving units on a grid that will generate, live, or die depending on the cells around it.  After each in-game moment, the grid changes based on a series of rules.</p> 
        <p>Here are the rules:</p>
        <div class ="rules">
        <ul>
          <li>If a living cell has less than two neighbors, it dies</li>
          <li>A live cell with two or three live neighbors lives</li>
          <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
          <li>A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ul>
        </div>
        <div class="gif"><img src={logo} alt="conway game of life" /></div>
      </div>
    </div>
  );
};

export default Home;
