import * as types from '../actions/actionTypes';

const initialState = {
  isLoading: false,
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
      return Object.assign({}, state, { isLoading: true });

    case types.FETCH_ARTIST_SUCCESS: {
      const { artistInfo, artistName, extract, img } = action.payload;
      return Object.assign({}, state, {
        isLoading: false,
        isArtistOverlayOpen: true,
        selectedArtist: {
          name: artistName,
          extract,
          img: img ? img : artistInfo ? artistInfo.img : undefined,
          followers: artistInfo ? artistInfo.followers : undefined,
        },
      });
    }

    case types.FETCH_ARTIST_FAILURE:
      // close overlay, loader
      return Object.assign({}, state, {
        isLoading: false,
        isArtistOverlayOpen: false,
      });

    case types.FETCH_ARTIST_OPEN:
      return Object.assign({}, state, {
        isLoading: false,
        isArtistOverlayOpen: true,
      });

    case types.FETCH_ARTIST_CLOSE:
      return Object.assign({}, state, {
        isLoading: false,
        isArtistOverlayOpen: false,
      });

    default:
      return state;
  }
}
