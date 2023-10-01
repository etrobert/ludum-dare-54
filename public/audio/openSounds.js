const AudioCtx = new AudioContext();

const jumpSound = document.querySelector('#jump-sound');
const trackJumpTrack = AudioCtx.createMediaElementSource(jumpSound);
trackJumpTrack.connect(AudioCtx.destination);

const gameMusic = document.querySelector('#game-music');
const gameMusicTrack = AudioCtx.createMediaElementSource(gameMusic);
gameMusicTrack.connect(AudioCtx.destination);

const startMusic = document.querySelector('#start-music');
const startMusicTrack = AudioCtx.createMediaElementSource(startMusic);
startMusicTrack.connect(AudioCtx.destination);

export { AudioCtx, jumpSound, gameMusic, startMusic };
