'use strict';

const Spotify = require('spotify-web-api-node');
const express = require('express');
const router = new express.Router();

// configure the express server
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-read-recently-played',
];

// configure spotify
const spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = (N) =>
  (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
router.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
    // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        const { access_token, refresh_token } = data.body;

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        // use the access token to access the Spotify Web API
        spotifyApi.getMe().then(({ body }) => {
          console.log(body);
        });

        // test another api call
        spotifyApi.getMyTopArtists({ time_range: 'long_term' }).then(
          function (data) {
            console.log('Artist albums', data.body);
          },
          function (err) {
            console.error(err);
          }
        );

        // we can also pass the token to the browser to make requests from there
        let setCookies = true;
        res.redirect(`/user/${access_token}/${refresh_token}/${setCookies}`);
      })
      .catch((err) => {
        res.redirect('/#/error/invalid token');
      });
  }
});

module.exports = router;
