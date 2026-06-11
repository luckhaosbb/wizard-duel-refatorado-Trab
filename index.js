const express = require('express');
const charactersRoutes = require('./routes/characters');
const spellsRoutes = require('./routes/spells');
const gameRoutes = require('./routes/game');

const app = express();

app.use(express.static('public'));
app.use(express.json());

// Conectando as rotas separadas ao endpoint /api
app.use('/api', charactersRoutes);
app.use('/api', spellsRoutes);
app.use('/api', gameRoutes);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('rodando na porta 3000');
});
