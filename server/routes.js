const express = require('express');
const axios = require('axios');

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

module.exports = router;
