const jellyfishImage = new Image();
jellyfishImage.src = 'assets/images/animations/jellyfish.png';

const character = {
  name: 'character',
  position: { x: 30, y: 30 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: { x: 0, y: 0 },
  size: { x: 20, y: 20 },
  display: {
    image: jellyfishImage,
    sw: 16,
    sh: 16,
    animationFrames: 16,
  },
};

const platform1 = {
  name: 'platform1',
  position: { x: 10, y: 100 },
  size: { x: 280, y: 10 },
};

const platform2 = {
  name: 'platform2',
  position: { x: 200, y: 90 },
  size: { x: 10, y: 10 },
};

const flatLevel = [character, platform1, platform2];

export default flatLevel;