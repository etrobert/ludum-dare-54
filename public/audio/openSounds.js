const AudioCtx = new AudioContext();

const jumpSfx = document.querySelector('#jump-sfx');
const trackJumpSfx = AudioCtx.createMediaElementSource(jumpSfx);
trackJumpSfx.connect(AudioCtx.destination);

const dashSfx = document.querySelector('#dash-sfx');
const trackdashSfx = AudioCtx.createMediaElementSource(dashSfx);
trackdashSfx.connect(AudioCtx.destination);
dashSfx.volume = 0.5;

const enemyDeath1 = document.querySelector('#enemy-death-1-sfx');
const trackenemyDeath1Sfx = AudioCtx.createMediaElementSource(enemyDeath1);
trackenemyDeath1Sfx.connect(AudioCtx.destination);
enemyDeath1.volume = 0.3;

const enemyDeath2 = document.querySelector('#enemy-death-2-sfx');
const trackenemyDeath2Sfx = AudioCtx.createMediaElementSource(enemyDeath2);
trackenemyDeath2Sfx.connect(AudioCtx.destination);
enemyDeath2.volume = 0.3;

const enemyDeath3 = document.querySelector('#enemy-death-3-sfx');
const trackenemyDeath3Sfx = AudioCtx.createMediaElementSource(enemyDeath3);
trackenemyDeath3Sfx.connect(AudioCtx.destination);
enemyDeath3.volume = 0.3;

const enemyDeath4 = document.querySelector('#enemy-death-4-sfx');
const trackenemyDeath4Sfx = AudioCtx.createMediaElementSource(enemyDeath4);
trackenemyDeath4Sfx.connect(AudioCtx.destination);
enemyDeath4.volume = 0.3;

const enemyDeath5 = document.querySelector('#enemy-death-5-sfx');
const trackenemyDeath5Sfx = AudioCtx.createMediaElementSource(enemyDeath5);
trackenemyDeath5Sfx.connect(AudioCtx.destination);
enemyDeath5.volume = 0.3;

const enemyDeath6 = document.querySelector('#enemy-death-6-sfx');
const trackenemyDeath6Sfx = AudioCtx.createMediaElementSource(enemyDeath6);
trackenemyDeath6Sfx.connect(AudioCtx.destination);
enemyDeath6.volume = 0.3;

const enemyDeath7 = document.querySelector('#enemy-death-7-sfx');
const trackenemyDeath7Sfx = AudioCtx.createMediaElementSource(enemyDeath7);
trackenemyDeath7Sfx.connect(AudioCtx.destination);
enemyDeath7.volume = 0.3;

const enemyDeath = [
  enemyDeath1,
  enemyDeath2,
  enemyDeath3,
  enemyDeath4,
  enemyDeath5,
  enemyDeath6,
  enemyDeath7,
];

const lossHealthSfx = document.querySelector('#loss-health-sfx');
const tracklossHealthSfx = AudioCtx.createMediaElementSource(lossHealthSfx);
tracklossHealthSfx.connect(AudioCtx.destination);
lossHealthSfx.volume = 0.3;

const specialSfx = document.querySelector('#special-sfx');
const trackspecialSfx = AudioCtx.createMediaElementSource(specialSfx);
trackspecialSfx.connect(AudioCtx.destination);
specialSfx.volume = 1;

const shroudMusic = document.querySelector('#shroud-music');
const trackshroudMusic = AudioCtx.createMediaElementSource(shroudMusic);
trackshroudMusic.connect(AudioCtx.destination);

const gameMusic = document.querySelector('#game-music');
const gameMusicTrack = AudioCtx.createMediaElementSource(gameMusic);
gameMusicTrack.connect(AudioCtx.destination);
gameMusic.volume = 1;

const startMusic = document.querySelector('#start-music');
const startMusicTrack = AudioCtx.createMediaElementSource(startMusic);
startMusicTrack.connect(AudioCtx.destination);
startMusic.volume = 0.6;

export {
  AudioCtx,
  jumpSfx,
  dashSfx,
  enemyDeath,
  lossHealthSfx,
  specialSfx,
  shroudMusic,
  gameMusic,
  startMusic,
};
