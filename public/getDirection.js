const getDirection = (character) => {
  if (character.speed.x < 0) return 'left';
  if (character.speed.x > 0) return 'right';
  return 'none';
};

export default getDirection;
