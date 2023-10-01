const backgroundImage = new Image();
backgroundImage.src = 'assets/images/backgrounds/abandonned-tiles.png';

const backgroundEntity = {
  position: { x: 0, y: 0 },
  size: { x: 1024, y: 1024 },
  display: {
    image: backgroundImage,
    sw: 1024,
    sh: 1024,
    animationFrames: 1,
  },
};

export { backgroundEntity, backgroundImage };
