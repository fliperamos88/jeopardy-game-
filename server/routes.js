// const express = require('express');
// const axios = require('axios');
// require('dotenv').config();
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const { data } = await axios.get(
      `http://cluebase.lukelav.in/clues/random?limit=${req.query.limit}`
    );

    return res.json(data);
  } catch (err) {
    return next(err);
  }
});

export default router;
