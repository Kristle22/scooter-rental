function getRandomFloat(min, max) {
  const float = (Math.random() * (max - min) + min).toFixed(2);

  return parseFloat(float);
}

export default getRandomFloat;