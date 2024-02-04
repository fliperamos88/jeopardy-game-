const express = require('express');
const cors = require('cors');
const router = require('./routes.js');
const path = require('path');
require('dotenv').config();

const buildPath = path.join(__dirname, '../client/build');

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildPath));
app.use('/clues/random', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
  console.log(buildPath);
  console.log('Up an running!');
});
