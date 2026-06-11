const GAME_CONSTANTS = {
  API_PAGE_SIZE: 100,
  PACK_SIZE: 4,
  DECK_SIZE: 2,
  SPELLS_SIZE: 20,
  BASE_HP: 80,
};

const ATTRIBUTES = {
  POWER: {
    Gryffindor: 90, Slytherin: 85, Hufflepuff: 75, Ravenclaw: 80, default: 50,
  },
  MAGIC: {
    human: 70, 'half-giant': 88, giant: 95, 'house elf': 82, ghost: 60, werewolf: 91, vampire: 87, centaur: 78, default: 50,
  },
  DEFENSE: {
    'pure-blood': 90, 'half-blood': 75, 'muggle-born': 70, muggle: 40, squib: 35, default: 50,
  },
  DAMAGE: {
    Charm: 45, Curse: 90, Hex: 65, Jinx: 55, Spell: 50, Transfiguration: 40, 'Counter-spell': 35, 'Healing spell': -40, default: 30,
  },
};

module.exports = {
  GAME_CONSTANTS,
  ATTRIBUTES,
};
