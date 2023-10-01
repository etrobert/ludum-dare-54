const AudioCtx = new AudioContext();

const jumpSfx = document.querySelector('#jump-sfx');
const trackJumpSfx = AudioCtx.createMediaElementSource(jumpSfx);
trackJumpSfx.connect(AudioCtx.destination);

const dashSfx = document.querySelector('#dash-sfx');
const trackdashSfx = AudioCtx.createMediaElementSource(dashSfx);
trackdashSfx.connect(AudioCtx.destination);

const gameMusic = document.querySelector('#game-music');
const gameMusicTrack = AudioCtx.createMediaElementSource(gameMusic);
gameMusicTrack.connect(AudioCtx.destination);

const startMusic = document.querySelector('#start-music');
const startMusicTrack = AudioCtx.createMediaElementSource(startMusic);
startMusicTrack.connect(AudioCtx.destination);

export { AudioCtx, jumpSfx, dashSfx, gameMusic, startMusic };
