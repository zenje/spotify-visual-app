import Spotify from 'spotify-web-api-js';
import Cookies from 'js-cookie';
import { RECENT_TRACKS_LIMIT, TIME_RANGES } from '../constants';
import * as types from './actionTypes';

const spotifyApi = new Spotify();

/** set the app's access and refresh tokens */
export const setTokens = (accessToken, refreshToken, setCookies) => {
  return (dispatch) => {
    try {
      if (accessToken) {
        if (setCookies === 'true') {
          const inOneHour = 1 / 24;
          Cookies.set('spotifyAccessToken', accessToken, {
            expires: inOneHour,
          });
          Cookies.set('spotifyRefreshToken', refreshToken, {
            expires: inOneHour,
          });
        }
        spotifyApi.setAccessToken(accessToken);
        dispatch({ type: types.SPOTIFY_TOKENS, accessToken, refreshToken });
      } else {
        throw Error();
      }
    } catch (error) {
      dispatch({ type: types.SPOTIFY_TOKENS_FAILURE, error: getErrorMsg() });
    }
  };
};

export const getMyInfo = () => {
  return (dispatch) => {
    dispatch({ type: types.SPOTIFY_ME_BEGIN });
    spotifyApi.getMe().then(
      (data) => dispatch({ type: types.SPOTIFY_ME_SUCCESS, data }),
      (error) =>
        dispatch({ type: types.SPOTIFY_ME_FAILURE, error: getErrorMsg() })
    );
  };
};

export const getTopArtists = (timeRange = TIME_RANGES.LONG_TERM.timeRange) => {
  return (dispatch) => {
    spotifyApi.getMyTopArtists({ time_range: timeRange, limit: 50 }).then(
      (data) =>
        dispatch({ type: types.SPOTIFY_TOP_ARTISTS_SUCCESS, timeRange, data }),
      (error) =>
        dispatch({
          type: types.SPOTIFY_TOP_ARTISTS_FAILURE,
          error: getErrorMsg(),
        })
    );
  };
};

export const getTopTracks = (timeRange = TIME_RANGES.LONG_TERM.timeRange) => {
  return (dispatch) => {
    spotifyApi.getMyTopTracks({ time_range: timeRange, limit: 50 }).then(
      (data) =>
        dispatch({ type: types.SPOTIFY_TOP_TRACKS_SUCCESS, timeRange, data }),
      (error) =>
        dispatch({
          type: types.SPOTIFY_TOP_TRACKS_FAILURE,
          error: getErrorMsg(),
        })
    );
  };
};

export const getCurrentPlayingTrack = () => {
  return (dispatch) => {
    dispatch({ type: types.SPOTIFY_CURRENT_TRACK_BEGIN });
    spotifyApi.getMyCurrentPlayingTrack().then(
      (data) => {
        if (data && data.currently_playing_type === 'track') {
          dispatch({ type: types.SPOTIFY_CURRENT_TRACK_SUCCESS, data });
        } else {
          dispatch({ type: types.SPOTIFY_CURRENT_TRACK_NOT_PLAYING });
        }
      },
      (error) =>
        dispatch({
          type: types.SPOTIFY_RECENT_TRACKS_FAILURE,
          error: getErrorMsg(),
        })
    );
  };
};

export const getMyRecentlyPlayedTracks = (limit = RECENT_TRACKS_LIMIT) => {
  return (dispatch) => {
    spotifyApi.getMyRecentlyPlayedTracks({ limit }).then(
      (data) => dispatch({ type: types.SPOTIFY_RECENT_TRACKS_SUCCESS, data }),
      (error) =>
        dispatch({
          type: types.SPOTIFY_RECENT_TRACKS_FAILURE,
          error: getErrorMsg(),
        })
    );
  };
};

const getErrorMsg = () =>
  `Something went wrong with getting info from Spotify :(\n\nTry reloading the page?`;
