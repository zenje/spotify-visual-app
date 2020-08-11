import Spotify from 'spotify-web-api-js';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TIME_RANGES } from '../constants';
import * as types from './actionTypes';

const spotifyApi = new Spotify();

/** set the app's access and refresh tokens */
export const setTokens = (accessToken, refreshToken, setCookies) => {
  if (accessToken) {
    if (setCookies) {
      const inOneHour = 1 / 24;
      Cookies.set('spotifyAccessToken', accessToken, { expires: inOneHour });
      Cookies.set('spotifyRefreshToken', refreshToken, { expires: inOneHour });
    }
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: types.SPOTIFY_TOKENS, accessToken, refreshToken };
};

/* get the user's info from the /me api */
export const getMyInfo = () => {
  return (dispatch) => {
    dispatch({ type: types.SPOTIFY_ME_BEGIN });
    spotifyApi
      .getMe()
      .then((data) => {
        dispatch({ type: types.SPOTIFY_ME_SUCCESS, data });
      })
      .catch((e) => {
        console.log('ERROR');
        console.log(e);
        //axios.get(`http://167.99.167.0:3000/refreshTokens/`);
        //dispatch({ type: SPOTIFY_ME_FAILURE, error: 'Error!' });
      });
  };
};

export const getTopArtists = (timeRange = TIME_RANGES.LONG_TERM.timeRange) => {
  return (dispatch) => {
    spotifyApi.getMyTopArtists({ time_range: timeRange, limit: 50 }).then(
      (data) => {
        dispatch({ type: types.SPOTIFY_TOP_ARTISTS_SUCCESS, timeRange, data });
      },
      (err) => {
        console.error(err);
      }
    );
  };
};
