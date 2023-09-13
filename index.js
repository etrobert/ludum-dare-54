const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

const gridSize = {
  width: 3,
  height: 3,
};

const cellSize = 40; // px

/**
 * @returns an array of consecutive integers from 0 to n-1
 * @example range(4) // [0, 1, 2, 3]
 */
const range = (n) => Array.from(Array(n).keys());

const combination = (a1, a2) => a1.flatMap((e1) => a2.map((e2) => [e1, e2]));

/**
 * @returns The combination of two ranges n1 and n2
 * @example range2d(2, 2) // [[0, 0], [0, 1], [1, 0], [1, 1]]
 */
const range2d = (n1, n2) => combination(range(n1), range(n2));

range2d(gridSize.width, gridSize.height).forEach(([x, y]) =>
  ctx.fillRect(x * (cellSize + 1), y * (cellSize + 1), cellSize, cellSize)
);
