import * as types from '../actions/actionTypes';

const initialState = {
  isArtistLoading: false,
  isArtistOverlayOpen: false,
  selectedArtist: {
    name: null,
    img: null,
    extract: null,
    followers: null,
  },
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ARTIST_BEGIN:
      return Object.assign({}, state, { isArtistLoading: true });

    case types.FETCH_ARTIST_SUCCESS: {
      const {
        artistIndex,
        artistInfo,
        artistName,
        extract,
        timeRange,
        img,
      } = action.payload;
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: true,
        selectedArtist: {
          name: artistName,
          extract,
          img: img ? img : artistInfo.img,
          followers: artistInfo.followers,
        },
      });
    }

    case types.FETCH_ARTIST_FAILURE:
      // close overlay, loader
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: false,
      });

    case types.FETCH_ARTIST_OPEN:
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: true,
      });

    case types.FETCH_ARTIST_CLOSE:
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: false,
      });

    default:
      return state;
  }
}
