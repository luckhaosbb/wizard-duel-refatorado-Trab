const express = require('express');
const { fetchCharacters, shuffleArray } = require('../services/potterApi');
const { calculateCharacterStats } = require('../services/statsCalculator');
const { GAME_CONSTANTS } = require('../constants');

const router = express.Router();

router.get('/pack', async (req, res) => {
  try {
    const rawCharacters = await fetchCharacters();
    const charactersList = [];

    for (let i = 0; i < rawCharacters.length; i += 1) {
      const character = rawCharacters[i];
      const { attributes } = character;

      if (attributes.name && attributes.name !== '' && attributes.image) {
        // Usa o serviço externo para calcular os atributos limpos
        const stats = calculateCharacterStats(attributes);

        const cardObject = {
          id: character.id,
          name: attributes.name,
          house: attributes.house || 'Unknown',
          species: attributes.species || 'Unknown',
          ancestry: attributes.ancestry || 'Unknown',
          image: attributes.image,
          power: stats.power,
          magic: stats.magic,
          defense: stats.defense,
          hp: stats.hp,
          maxHp: stats.hp,
        };

        charactersList.push(cardObject);
      }
    }

    res.json({ cards: shuffleArray(charactersList).slice(0, GAME_CONSTANTS.PACK_SIZE) });
  } catch (error) {
    res.status(500).json({ error: 'erro ao buscar personagens' });
  }
});

module.exports = router;
