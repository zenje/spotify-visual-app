import * as types from './actionTypes';
import linkify from 'linkifyjs';
// require('linkifyjs/plugins/hashtag')(linkify); // optional
import linkifyHtml from 'linkifyjs/html';

const LAST_FM_ARTIST_GET_INFO =
  'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo';

export const getArtistInfo = (artistName, artistIndex, timeRange) => {
  return async (dispatch, getState) => {
    function onSuccess(success) {
      const payload = {
        artistIndex,
        artistName,
        timeRange,
        extract: success,
      };
      dispatch({ type: types.SPOTIFY_FETCH_ARTIST_SUCCESS, payload });
      return success;
    }
    function onError(error) {
      dispatch({ type: types.SPOTIFY_FETCH_ARTIST_FAILURE, error });
      return error;
    }

    dispatch(loadArtistOverlay());

    const state = getState();
    const stateArtistName = state.selectedArtist.name;
    // if artist is already loaded, then just open the overlay
    if (stateArtistName === artistName) {
      dispatch(openArtistOverlay());
      return;
    }

    try {
      const data = await fetchArtistInfo(artistName);
      if (data) {
        let summary = getSummaryFromArtistData(data);
        console.log(summary);
        return onSuccess(summary);
      }
    } catch (error) {
      onError(error);
    }

    return onError('Artist info not found');
  };
};

const getSummaryFromArtistData = (data) => {
  function sanitizeSummary(summary) {
    if (summary) {
      summary = summary.trim();
      if (summary.length > 0) {
        summary = removeLink(summary).trim();
      }
    }
    return summary;
  }

  let summary = '';
  if (data && data.artist && data.artist.bio) {
    summary = sanitizeSummary(data.artist.bio.content);
    if (!summary) {
      summary = sanitizeSummary(data.artist.bio.summary);
    }
    summary = linkifyHtml(summary, {
      defaultProtocol: 'https',
    });
  }
  return summary;
};

// truncate text at hyperlink included by last.fm api
const removeLink = (str) => {
  if (str) {
    let index = str.search(/<a/gm);
    if (index > 0) {
      str = str.slice(0, index);
    }
  }
  return str;
};

const fetchArtistInfo = async (artistName) => {
  artistName = encodeURIComponent(artistName);
  const pageEndpoint = `${LAST_FM_ARTIST_GET_INFO}&artist=${artistName}&api_key=${process.env.LAST_FM_API_KEY}&format=json`;
  console.log(pageEndpoint);
  return await fetch(pageEndpoint, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      console.log('LAST FM');
      console.log(data);
      return data;
    })
    .catch((e) => console.log('An error occurred ' + e));
};

/*export const getArtist = async (artistName) => {
  const pageEndpoint = `${LAST_FM_ARTIST_GET_INFO}&artist=${artistName}&api_key=${process.env.LAST_FM_API_KEY}&format=json`;
  return await fetch(pageEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log('LAST FM');
      console.log(data);
      console.log(data.artist.tags.tag);
      if (data && data.artist && data.artist.tags && data.artist.tags.tag) {
        data.artist.tags.tag.map(item => item.name).join(", ")
      }
    })
    .catch((e) => console.log('An error occurred ' + e));
  };*/

export const loadArtistOverlay = () => {
  return { type: types.SPOTIFY_FETCH_ARTIST_BEGIN };
};

export const openArtistOverlay = () => {
  return { type: types.SPOTIFY_FETCH_ARTIST_OPEN };
};

export const closeArtistOverlay = () => {
  return { type: types.SPOTIFY_FETCH_ARTIST_CLOSE };
};
