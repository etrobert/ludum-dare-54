const add2Vectors = (vector1, vector2) => ({
  x: vector1.x + vector2.x,
  y: vector1.y + vector2.y,
});

const addVectors = (...vectors) =>
  vectors.reduce((sum, currentValue) => add2Vectors(sum, currentValue), {
    x: 0,
    y: 0,
  });

const multiplyVector = (num, vector) => ({
  x: vector.x * num,
  y: vector.y * num,
});

const normalizeVector = (vector) => {
  const d = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return { x: vector.x / d, y: vector.y / d };
};

export { addVectors, multiplyVector, normalizeVector };
