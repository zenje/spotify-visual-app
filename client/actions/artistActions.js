import * as types from './actionTypes';
import linkify from 'linkifyjs';
// require('linkifyjs/plugins/hashtag')(linkify); // optional
import linkifyHtml from 'linkifyjs/html';

const LAST_FM_ARTIST_GET_INFO =
  'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo';

export const getArtistInfo = (
  artistName,
  artistIndex,
  timeRange,
  trackTitle,
  fallbackImg
) => {
  return async (dispatch, getState) => {
    const state = getState();

    function onSuccess(result) {
      const payload = {
        artistName,
        extract: result.extract,
        img: result.img ? result.img : fallbackImg,
      };
      if (artistIndex && timeRange) {
        payload.artistInfo = state.spotify.topArtists[timeRange][artistIndex];
      }
      dispatch(doArtistSuccess(payload));
      return result;
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
      const data = await Promise.all([
        fetchArtistInfo(artistName),
        fetchArtistFromGenius(artistName, trackTitle).catch(() => null),
      ]).then((values) => {
        let result = {};
        if (values[0]) {
          result.extract = getSummaryFromArtistData(values[0]);
        } else {
          throw new Error();
        }
        if (values[1]) {
          result.img = values[1].artistImg;
        }
        return result;
      });
      return onSuccess(data);
    } catch (error) {
      return onError(getErrorMsg(artistName));
    }
  };
};

// use track + artist combo when possible to have higher effectiveness of finding correct artist
export const getArtistInfoUsingTrack = (artistName, trackTitle, fallbackImg) =>
  getArtistInfo(artistName, undefined, undefined, trackTitle, fallbackImg);

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
  return await fetch(pageEndpoint, { mode: 'cors' }).then((response) =>
    response.json()
  );
};

const fetchArtistFromGenius = async (artistName, trackTitle) => {
  let apiEndpoint = trackTitle
    ? `/api/genius/${trackTitle}/${artistName}`
    : `/api/genius/${artistName}`;
  const response = await fetch(apiEndpoint);
  const result = await response.json();
  if (response.status !== 200) {
    throw new Error();
  }
  return result;
};

const getErrorMsg = (artistName) => {
  return `Could not get artist summary for [${artistName}] :(`;
};

const loadArtistOverlay = () => {
  return { type: types.FETCH_ARTIST_BEGIN };
};

const doArtistSuccess = (payload) => {
  return { type: types.FETCH_ARTIST_SUCCESS, payload };
};

const doArtistFailure = (error) => {
  return { type: types.FETCH_ARTIST_FAILURE, error };
};

export const openArtistOverlay = () => {
  return { type: types.FETCH_ARTIST_OPEN };
};

export const closeArtistOverlay = () => {
  return { type: types.FETCH_ARTIST_CLOSE };
};
