const plotHealth = (health) => {
  const healthBar = document.querySelector('#filled-health-bar');
  healthBar.style.setProperty('--hearts', health);
};

const plotMaxHealth = (maxHealth) => {
  const healthBar = document.querySelector('#empty-health-bar');
  healthBar.style.setProperty('--hearts', maxHealth);
};

export { plotHealth, plotMaxHealth };
