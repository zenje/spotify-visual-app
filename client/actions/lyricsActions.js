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
    } catch (error) {
      console.log(error);
      onError(error);
    }

    return onError('Lyrics not found');
  };
};

const fetchLyrics = async (trackTitle, artistName) => {
  const response = await fetch(`/api/genius/${trackTitle}/${artistName}`);
  const result = await response.json();
  if (response.status !== 200) {
    console.log(`Unable to find lyrics due to: ${result.error}`);
    throw new Error(`Unable to find lyrics due to: ${result.error}`);
  }
  return result;
};

const loadLyricsOverlay = () => {
  return { type: types.FETCH_LYRICS_BEGIN };
};

const doLyricsSuccess = (payload) => {
  return { type: types.FETCH_LYRICS_SUCCESS, payload };
};

const doLyricsFailure = (payload) => {
  return { type: types.FETCH_LYRICS_FAILURE, payload };
};

export const openLyricsOverlay = () => {
  return { type: types.FETCH_LYRICS_OPEN };
};

export const closeLyricsOverlay = () => {
  return { type: types.FETCH_LYRICS_CLOSE };
};
