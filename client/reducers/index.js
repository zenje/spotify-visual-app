import * as types from '../actions/actionTypes';

/** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    country: null,
    display_name: null,
    email: null,
    external_urls: {},
    followers: {},
    href: null,
    id: null,
    images: [],
    product: null,
    type: null,
    uri: null,
  },
  topArtists: {},
};

/**
 * Our reducer
 */
export default function reduce(state = initialState, action) {
  console.log('action ' + action.type);
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case types.SPOTIFY_TOKENS:
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, { accessToken, refreshToken });

    // set our loading property when the loading begins
    case types.SPOTIFY_ME_BEGIN:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { loading: true }),
      });

    // when we get the data merge it in
    case types.SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data, { loading: false }),
      });

    // currently no failure state :(
    case types.SPOTIFY_ME_FAILURE:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { loading: false }),
      });

    case types.SPOTIFY_TOP_ARTISTS_BEGIN:
      return state;

    case types.SPOTIFY_TOP_ARTISTS_SUCCESS:
      const topArtistsWithTimeRanges = Object.assign({}, state.topArtists);
      topArtistsWithTimeRanges[action.timeRange] = action.data;
      return Object.assign({}, state, {
        topArtists: topArtistsWithTimeRanges,
      });

    default:
      return state;
  }
}
