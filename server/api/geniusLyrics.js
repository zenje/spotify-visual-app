const express = require('express');
const router = new express.Router();
const GeniusFetcher = require('genius-lyrics-fetcher');

const ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

router.get('/lyrics/:track/:artist', async (req, res) => {
  const { artist, track } = req.params;
  const client = new GeniusFetcher.Client(ACCESS_TOKEN);
  client
    .fetch(track, artist)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(404).send({ error: error.toString() }));
});

module.exports = router;
