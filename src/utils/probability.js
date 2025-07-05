function getSuccessProbability() {
  return Math.floor(Math.random() * 41) + 60; // 60% - 100%
}

module.exports = getSuccessProbability;
