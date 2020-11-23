const express = require('express');
const router = new express.Router();
const GeniusFetcher = require('genius-lyrics-fetcher');

const ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

router.get('/genius/:track/:artist', async (req, res) => {
  const { artist, track } = req.params;
  const client = new GeniusFetcher.Client(ACCESS_TOKEN);
  client
    .fetch(stripTrack(track), artist)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(404).send({ error: error.toString() }));
});

router.get('/genius/:artist', async (req, res) => {
  const { artist } = req.params;
  const client = new GeniusFetcher.Client(ACCESS_TOKEN);
  client
    .fetchArtist(artist)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(404).send({ error: error.toString() }));
});

// get base track name, removing any classifiers from Spotify track title
const stripTrack = (trackTitle) => {
  // truncate tracks featuring another artist
  const featIndex = trackTitle.indexOf(' (feat.');
  if (featIndex > -1) {
    trackTitle = trackTitle.slice(0, featIndex);
  }

  // truncate any additional classifiers after hyphen (e.g., '...Remix', '...Version')
  const hyphenIndex = trackTitle.indexOf(' - ');
  if (hyphenIndex > -1) {
    trackTitle = trackTitle.slice(0, hyphenIndex);
  }
  return trackTitle;
};

module.exports = router;
