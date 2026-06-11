const express = require('express');
const { fetchSpells, shuffleArray } = require('../services/potterApi');
const { calculateSpellDamage } = require('../services/statsCalculator');
const { GAME_CONSTANTS } = require('../constants');

const router = express.Router();

router.get('/spells', async (req, res) => {
  try {
    const rawSpells = await fetchSpells();
    const spellsList = [];

    for (let i = 0; i < rawSpells.length; i += 1) {
      const spell = rawSpells[i];
      const { attributes } = spell;

      if (attributes.name && attributes.name !== '') {
        const damage = calculateSpellDamage(attributes.category);

        const spellObject = {
          id: spell.id,
          name: attributes.name,
          effect: attributes.effect || 'Efeito desconhecido',
          category: attributes.category || 'Spell',
          light: attributes.light || 'Unknown',
          damage, // Sintaxe de desestruturação permitida pelo ESLint
        };

        spellsList.push(spellObject);
      }
    }

    res.json({ spells: shuffleArray(spellsList).slice(0, GAME_CONSTANTS.SPELLS_SIZE) });
  } catch (error) {
    res.status(500).json({ error: 'erro ao buscar feiticos' });
  }
});

module.exports = router;
