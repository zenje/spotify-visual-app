import * as types from './actionTypes';
import linkify from 'linkifyjs';
// require('linkifyjs/plugins/hashtag')(linkify); // optional
import linkifyHtml from 'linkifyjs/html';

const LAST_FM_ARTIST_GET_INFO =
  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo';

export const getArtistInfo = (artistName, artistIndex, timeRange) => {
  return async (dispatch, getState) => {
    const state = getState();

    function onSuccess(success) {
      const artistInfo = state.spotify.topArtists[timeRange][artistIndex];
      const payload = {
        artistIndex,
        artistInfo,
        artistName,
        timeRange,
        extract: success,
      };
      dispatch(doArtistSuccess(payload));
      return success;
    }
    function onError(error) {
      dispatch(doArtistFailure(error));
      return error;
    }

    dispatch(loadArtistOverlay());

    // if artist is already loaded, then just open the overlay
    const stateArtistName = state.artistInfo.selectedArtist.name;
    if (stateArtistName === artistName) {
      dispatch(openArtistOverlay());
      return;
    }

    try {
      const data = await fetchArtistInfo(artistName);
      if (data) {
        const summary = getSummaryFromArtistData(data);
        return onSuccess(summary);
      }
    } catch (error) {
      console.log(error);
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
    .catch((e) => {
      console.log('An error occurred ' + e);
      console.log(e);
    });
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

const loadArtistOverlay = () => {
  return { type: types.FETCH_ARTIST_BEGIN };
};

const doArtistSuccess = (payload) => {
  return { type: types.FETCH_ARTIST_SUCCESS, payload };
};

const doArtistFailure = (payload) => {
  return { type: types.FETCH_ARTIST_FAILURE, payload };
};

export const openArtistOverlay = () => {
  return { type: types.FETCH_ARTIST_OPEN };
};

export const closeArtistOverlay = () => {
  return { type: types.FETCH_ARTIST_CLOSE };
};
