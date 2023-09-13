import { range2d } from './tools.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

const gridSize = {
  width: 3,
  height: 3,
};

const cellSize = 40; // px

range2d(gridSize.width, gridSize.height).forEach(([x, y]) =>
  ctx.fillRect(x * (cellSize + 1), y * (cellSize + 1), cellSize, cellSize)
);
