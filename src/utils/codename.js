const codenames = [
  "The Nightingale",
  "The Kraken",
  "Ghost Viper",
  "Shadow Falcon",
  "Phantom Echo",
  "Black Mamba",
  "Crimson Whisper",
  "Steel Hornet"
];

function generateCodename() {
  const index = Math.floor(Math.random() * codenames.length);
  return codenames[index];
}

module.exports = generateCodename;
