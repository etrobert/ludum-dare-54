const scoreOneKill = (n) => {
  if (n === 0) return 0;
  if (n < 2) return 1;
  if (n < 5) return 2;
  if (n < 10) return 3;
  else return 4;
};

export { scoreOneKill };
