const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

const gridSize = {
  width: 3,
  height: 3,
};

const cellSize = 40; // px

for (let y = 0; y < gridSize.height; ++y) {
  for (let x = 0; x < gridSize.width; ++x) {
    ctx.fillRect(x * (cellSize + 1), y * (cellSize + 1), cellSize, cellSize);
  }
}
