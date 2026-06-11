const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.static('public'));
app.use(express.json());

// Função utilitária para embaralhar arrays (Resolve o Código Duplicado - DRY)
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

// pega pack de cartas aleatorias
app.get('/api/pack', async (req, res) => {
  try {
    const randomPage = Math.floor(Math.random() * 8) + 1;
    const apiResponse = await fetch(`https://api.potterdb.com/v1/characters?page[size]=100&page[number]=${randomPage}`);
    const parsedData = await apiResponse.json();

    const charactersList = [];
    for (let i = 0; i < parsedData.data.length; i += 1) {
      const character = parsedData.data[i];
      const { attributes } = character;

      if (attributes.name && attributes.name !== '' && attributes.image) {
        let power = 50;
        if (attributes.house === 'Gryffindor') power = 90;
        if (attributes.house === 'Slytherin') power = 85;
        if (attributes.house === 'Hufflepuff') power = 75;
        if (attributes.house === 'Ravenclaw') power = 80;

        let magic = 50;
        if (attributes.species === 'human') magic = 70;
        if (attributes.species === 'half-giant') magic = 88;
        if (attributes.species === 'giant') magic = 95;
        if (attributes.species === 'house elf') magic = 82;
        if (attributes.species === 'ghost') magic = 60;
        if (attributes.species === 'werewolf') magic = 91;
        if (attributes.species === 'vampire') magic = 87;
        if (attributes.species === 'centaur') magic = 78;

        let defense = 50;
        if (attributes.ancestry === 'pure-blood') defense = 90;
        if (attributes.ancestry === 'half-blood') defense = 75;
        if (attributes.ancestry === 'muggle-born') defense = 70;
        if (attributes.ancestry === 'muggle') defense = 40;
        if (attributes.ancestry === 'squib') defense = 35;

        const healthPoints = defense + Math.floor(Math.random() * 20) + 80;

        const cardObject = {};
        cardObject.id = character.id;
        cardObject.name = attributes.name;
        cardObject.house = attributes.house || 'Unknown';
        cardObject.species = attributes.species || 'Unknown';
        cardObject.ancestry = attributes.ancestry || 'Unknown';
        cardObject.image = attributes.image;
        cardObject.power = power;
        cardObject.magic = magic;
        cardObject.defense = defense;
        cardObject.hp = healthPoints;
        cardObject.maxHp = healthPoints;

        charactersList.push(cardObject);
      }
    }

    // embaralha usando a função e retorna 4 cartas
    res.json({ cards: shuffleArray(charactersList).slice(0, 4) });
  } catch (error) {
    res.status(500).json({ error: 'erro ao buscar personagens' });
  }
});

// pega feiticos disponiveis
app.get('/api/spells', async (req, res) => {
  try {
    const apiResponse = await fetch('https://api.potterdb.com/v1/spells?page[size]=100');
    const parsedData = await apiResponse.json();

    const spellsList = [];
    for (let i = 0; i < parsedData.data.length; i += 1) {
      const spell = parsedData.data[i];
      const { attributes } = spell;

      if (attributes.name && attributes.name !== '') {
        let damage = 30;
        if (attributes.category === 'Charm') damage = 45;
        if (attributes.category === 'Curse') damage = 90;
        if (attributes.category === 'Hex') damage = 65;
        if (attributes.category === 'Jinx') damage = 55;
        if (attributes.category === 'Spell') damage = 50;
        if (attributes.category === 'Transfiguration') damage = 40;
        if (attributes.category === 'Counter-spell') damage = 35;
        if (attributes.category === 'Healing spell') damage = -40;

        const spellObject = {};
        spellObject.id = spell.id;
        spellObject.name = attributes.name;
        spellObject.effect = attributes.effect || 'Efeito desconhecido';
        spellObject.category = attributes.category || 'Spell';
        spellObject.light = attributes.light || 'Unknown';
        spellObject.damage = damage;

        spellsList.push(spellObject);
      }
    }

    // embaralha usando a função e retorna 20
    res.json({ spells: shuffleArray(spellsList).slice(0, 20) });
  } catch (error) {
    res.status(500).json({ error: 'erro ao buscar feiticos' });
  }
});

// monta deck cpu com personagens aleatorios
app.post('/api/cpu-deck', async (req, res) => {
  try {
    const randomPage = Math.floor(Math.random() * 8) + 1;
    const apiResponse = await fetch(`https://api.potterdb.com/v1/characters?page[size]=100&page[number]=${randomPage}`);
    const parsedData = await apiResponse.json();

    const charactersList = [];
    for (let i = 0; i < parsedData.data.length; i += 1) {
      const character = parsedData.data[i];
      const { attributes } = character;

      if (attributes.name && attributes.name !== '' && attributes.image) {
        let power = 50;
        if (attributes.house === 'Gryffindor') power = 90;
        if (attributes.house === 'Slytherin') power = 85;
        if (attributes.house === 'Hufflepuff') power = 75;
        if (attributes.house === 'Ravenclaw') power = 80;

        let magic = 50;
        if (attributes.species === 'human') magic = 70;
        if (attributes.species === 'half-giant') magic = 88;
        if (attributes.species === 'giant') magic = 95;
        if (attributes.species === 'house elf') magic = 82;
        if (attributes.species === 'ghost') magic = 60;
        if (attributes.species === 'werewolf') magic = 91;
        if (attributes.species === 'vampire') magic = 87;
        if (attributes.species === 'centaur') magic = 78;

        let defense = 50;
        if (attributes.ancestry === 'pure-blood') defense = 90;
        if (attributes.ancestry === 'half-blood') defense = 75;
        if (attributes.ancestry === 'muggle-born') defense = 70;
        if (attributes.ancestry === 'muggle') defense = 40;
        if (attributes.ancestry === 'squib') defense = 35;

        const healthPoints = defense + Math.floor(Math.random() * 20) + 80;

        const cardObject = {};
        cardObject.id = character.id;
        cardObject.name = attributes.name;
        cardObject.house = attributes.house || 'Unknown';
        cardObject.species = attributes.species || 'Unknown';
        cardObject.ancestry = attributes.ancestry || 'Unknown';
        cardObject.image = attributes.image;
        cardObject.power = power;
        cardObject.magic = magic;
        cardObject.defense = defense;
        cardObject.hp = healthPoints;
        cardObject.maxHp = healthPoints;

        charactersList.push(cardObject);
      }
    }

    // embaralha usando a função e retorna 2 cartas
    res.json({ deck: shuffleArray(charactersList).slice(0, 2) });
  } catch (error) {
    res.status(500).json({ error: 'erro ao montar deck cpu' });
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('rodando na porta 3000');
});
