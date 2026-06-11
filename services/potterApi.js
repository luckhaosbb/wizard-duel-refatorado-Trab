const fetch = require('node-fetch');
const { GAME_CONSTANTS } = require('../constants');

// A função de embaralhar fica aqui para ser exportada junto com os dados da API
function shuffleArray(array) {
  const shuffled = [...array];
  for (let currentIndex = shuffled.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    const tempValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = tempValue;
  }
  return shuffled;
}

async function fetchCharacters() {
  const randomPage = Math.floor(Math.random() * 8) + 1;
  const apiResponse = await fetch(`https://api.potterdb.com/v1/characters?page[size]=${GAME_CONSTANTS.API_PAGE_SIZE}&page[number]=${randomPage}`);
  const parsedData = await apiResponse.json();
  return parsedData.data;
}

async function fetchSpells() {
  const apiResponse = await fetch(`https://api.potterdb.com/v1/spells?page[size]=${GAME_CONSTANTS.API_PAGE_SIZE}`);
  const parsedData = await apiResponse.json();
  return parsedData.data;
}

module.exports = {
  fetchCharacters,
  fetchSpells,
  shuffleArray,
};
