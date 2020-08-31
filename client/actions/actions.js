import Spotify from 'spotify-web-api-js';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { RECENT_TRACKS_LIMIT, TIME_RANGES } from '../constants';
import * as types from './actionTypes';

const spotifyApi = new Spotify();

/** set the app's access and refresh tokens */
export const setTokens = (accessToken, refreshToken, setCookies) => {
  if (accessToken) {
    if (setCookies === 'true') {
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
        //dispatch({ type: SPOTIFY_ME_FAILURE, error: 'Error!' });
      });
  };
};

export const getTopArtists = (timeRange = TIME_RANGES.LONG_TERM.timeRange) => {
  return (dispatch) => {
    spotifyApi.getMyTopArtists({ time_range: timeRange, limit: 50 }).then(
      (data) => {
        console.log(data);
        dispatch({ type: types.SPOTIFY_TOP_ARTISTS_SUCCESS, timeRange, data });
        console.log('end SPOTIFY SUCCESS');
      },
      (err) => {
        console.error(err);
      }
    );
  };
};

export const getCurrentPlayingTrack = () => {
  return (dispatch) => {
    dispatch({ type: types.SPOTIFY_CURRENT_TRACK_BEGIN });
    spotifyApi.getMyCurrentPlayingTrack().then(
      (data) => {
        console.log('getCurrentPlayingTrack data');
        console.log(data);
        if (data && data.currently_playing_type === 'track') {
          dispatch({ type: types.SPOTIFY_CURRENT_TRACK_SUCCESS, data });
        } else {
          dispatch({ type: types.SPOTIFY_CURRENT_TRACK_NOT_PLAYING });
        }
      },
      (err) => {
        console.log('getMyCurrentPlayingTrack ERROR');
        console.log(err);
        console.error(err);
      }
    );
  };
};

export const getMyRecentlyPlayedTracks = (limit = RECENT_TRACKS_LIMIT) => {
  return (dispatch) => {
    spotifyApi.getMyRecentlyPlayedTracks({ limit }).then(
      (data) => {
        console.log('getMyRecentlyPlayedTracks data');
        console.log(data);
        dispatch({ type: types.SPOTIFY_RECENT_TRACKS_SUCCESS, data });
      },
      (err) => {
        console.log('getMyRecentlyPlayedTracks ERROR');
        console.log(err);
        console.error(err);
      }
    );
  };
};
