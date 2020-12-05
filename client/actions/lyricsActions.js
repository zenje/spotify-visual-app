import * as types from './actionTypes';

export const getLyrics = (trackTitle, artistName) => {
  return async (dispatch, getState) => {
    const state = getState();

    function onSuccess(result) {
      let img = result.songImg;
      const payload = { artistName, img, lyrics: result.lyrics, trackTitle };
      dispatch(doLyricsSuccess(payload));
      return result;
    }
    function onError(error) {
      dispatch(doLyricsFailure(error));
      return error;
    }

    dispatch(loadLyricsOverlay());

    // if lyrics for track are already loaded, then just open the overlay
    const {
      artistName: stateArtistName,
      trackTitle: stateTrackTitle,
      text: stateLyrics,
    } = state.lyrics;
    if (
      stateLyrics &&
      stateTrackTitle === trackTitle &&
      stateArtistName === artistName
    ) {
      dispatch(openLyricsOverlay());
      return;
    }

    try {
      const result = await fetchLyrics(trackTitle, artistName);
      if (result && result.lyrics) {
        return onSuccess(result);
      }
      throw new Error();
    } catch (error) {
      return onError(getErrorMsg(trackTitle, artistName));
    }
  };
};

const fetchLyrics = async (trackTitle, artistName) => {
  const response = await fetch(`/api/genius/${trackTitle}/${artistName}`);
  const result = await response.json();
  if (response.status !== 200) {
    throw new Error();
  }
  return result;
};

const getErrorMsg = (trackTitle, artistName) => {
  return `Unable to find lyrics for track [${trackTitle}] for [${artistName}] :(\n\nIs this an instrumental track?`;
};

const loadLyricsOverlay = () => {
  return { type: types.FETCH_LYRICS_BEGIN };
};

const doLyricsSuccess = (payload) => {
  return { type: types.FETCH_LYRICS_SUCCESS, payload };
};

const doLyricsFailure = (error) => {
  return { type: types.FETCH_LYRICS_FAILURE, error };
};

export const openLyricsOverlay = () => {
  return { type: types.FETCH_LYRICS_OPEN };
};

export const closeLyricsOverlay = () => {
  return { type: types.FETCH_LYRICS_CLOSE };
};
