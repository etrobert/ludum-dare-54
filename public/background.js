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

const stoneTileImage = new Image();
stoneTileImage.src = 'assets/images/backgrounds/stone-tile.png';

const stoneTileEntity = {
  position: { x: 0, y: 0 },
  size: { x: 757 * 0.5, y: 672 * 0.5 },
  display: {
    image: stoneTileImage,
    sw: 757,
    sh: 672,
    animationFrames: 1,
  },
};

const stoneTileSize = { x: 757 * 0.5, y: 672 * 0.5 };

const stoneTileAnimation = {
  image: stoneTileImage,
  sw: 757,
  sh: 672,
  animationFrames: 1,
};

const createStoneTileEntity = (position) => ({
  position,
  size: stoneTileSize,
  display: stoneTileAnimation,
});

export {
  backgroundEntity,
  stoneTileEntity,
  stoneTileSize,
  createStoneTileEntity,
};
