const { ATTRIBUTES, GAME_CONSTANTS } = require('../constants');

function calculateCharacterStats(attributes) {
  // Busca o valor no objeto. Se a propriedade for 'Unknown' ou não existir, ele usa o default (50)
  const power = ATTRIBUTES.POWER[attributes.house] || ATTRIBUTES.POWER.default;
  const magic = ATTRIBUTES.MAGIC[attributes.species] || ATTRIBUTES.MAGIC.default;
  const defense = ATTRIBUTES.DEFENSE[attributes.ancestry] || ATTRIBUTES.DEFENSE.default;

  // Calcula o HP usando a constante de vida base (80)
  const hp = defense + Math.floor(Math.random() * 20) + GAME_CONSTANTS.BASE_HP;

  return {
    power, magic, defense, hp,
  };
}

function calculateSpellDamage(category) {
  return ATTRIBUTES.DAMAGE[category] || ATTRIBUTES.DAMAGE.default;
}

module.exports = {
  calculateCharacterStats,
  calculateSpellDamage,
};
