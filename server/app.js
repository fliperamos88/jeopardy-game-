// const express = require('express');
// const cors = require('cors');
// const router = require('./routes.js');
// const path = require('path');
// require('dotenv').config();

import express from 'express';
import cors from 'cors';
import router from './routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
const dirname = path.dirname;
const __dirname = dirname(fileURLToPath(import.meta.url));
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

// const buildPath = path.join(__dirname, '../client/build');

// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// app.use('/clues/random', router);

app.listen(process.env.PORT || 3001, () => {
  console.log(buildPath);
  console.log('Up an running!');
});
