import Spotify from 'spotify-web-api-js';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

/** set the app's access and refresh tokens */
export const setTokens = ({ accessToken, refreshToken, setCookies }) => {
  if (accessToken) {
    if (setCookies) {
      const inOneHour = 1 / 24;
      Cookies.set('spotifyAccessToken', accessToken, { expires: inOneHour });
      Cookies.set('spotifyRefreshToken', refreshToken, { expires: inOneHour });
    }
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
};

/* get the user's info from the /me api */
export const getMyInfo = () => {
  return (dispatch) => {
    dispatch({ type: SPOTIFY_ME_BEGIN });
    spotifyApi
      .getMe()
      .then((data) => {
        dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
      })
      .catch((e) => {
        console.log('ERROR');
        console.log(e);
        //axios.get(`http://167.99.167.0:3000/refreshTokens/`);
        //dispatch({ type: SPOTIFY_ME_FAILURE, error: 'Error!' });
      });
  };
};

export const getTopArtists = () => {
  return (dispatch) => {
    console.log('getTopArtists');
    console.log(spotifyApi);
    spotifyApi.getMyTopArtists({ time_range: 'long_term', limit: 50 }).then(
      function (data) {
        console.log('Top artists', data);
        dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
      },
      function (err) {
        console.error(err);
      }
    );
  };
};
