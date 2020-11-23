import * as types from '../actions/actionTypes';

const initialState = {
  artistName: null,
  img: null,
  isLoading: false,
  isOverlayOpen: false,
  text: null,
  trackTitle: null,
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_LYRICS_BEGIN:
      return Object.assign({}, state, { isLoading: true });

    case types.FETCH_LYRICS_SUCCESS: {
      const { artistName, img, lyrics, trackTitle } = action.payload;
      return Object.assign({}, state, {
        artistName,
        img,
        isLoading: false,
        isOverlayOpen: true,
        text: lyrics,
        trackTitle,
      });
    }

    case types.FETCH_LYRICS_FAILURE:
      // close overlay, loader
      return Object.assign({}, state, {
        isLoading: false,
        isOverlayOpen: false,
      });

    case types.FETCH_LYRICS_OPEN:
      return Object.assign({}, state, {
        isLoading: false,
        isOverlayOpen: true,
      });

    case types.FETCH_LYRICS_CLOSE:
      return Object.assign({}, state, {
        isLoading: false,
        isOverlayOpen: false,
      });

    default:
      return state;
  }
}
