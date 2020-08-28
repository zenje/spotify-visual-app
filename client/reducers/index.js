import * as types from '../actions/actionTypes';
import { TRACK_STATUS } from '../constants';

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
  isLoadingCurrentTrack: true,
  currentTrack: {
    artist: null,
    name: null,
    img: null,
    status: null,
  },
  recentTracks: [],
  isNewCurrentTrack: false,
  topArtists: {},
  isArtistLoading: false,
  isArtistOverlayOpen: false,
  selectedArtist: {
    name: null,
    image: null,
    extract: null,
  },
};

const extractArtistData = (artistData) => {
  console.log('extractArtistData!');
  if (artistData && artistData.length > 0) {
    let tileData = artistData.map((item, idx) => ({
      img: item.images ? item.images[0].url : undefined,
      title: item.name,
      featured: idx < 12,
      href: item.href,
      followers: item.followers.total,
    }));
    console.log('tileData');
    console.log(tileData);
    return tileData;
  }
  return [];
};

const condenseRecentTracks = (data) => {
  if (data && data.length > 0) {
    return data.map((item) => {
      const { track } = item;
      return {
        artist: track.artists[0].name,
        img: track.album.images ? track.album.images[0].url : undefined,
        name: track.name,
      };
    });
  }
  return [];
};

const getLastPlayedTrack = (state) => {
  const { recentTracks } = state;
  if (recentTracks && recentTracks.length > 0) {
    return recentTracks[0];
  }
  return {};
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

    case types.SPOTIFY_CURRENT_TRACK_BEGIN:
      return state;

    case types.SPOTIFY_CURRENT_TRACK_SUCCESS:
      const item = action.data.item;
      const artist = item.artists[0].name; // TODO - handle more than 1 artist
      const img = item.album.images[0].url;
      const name = item.name;
      const status = action.data.is_playing
        ? TRACK_STATUS.PLAYING
        : TRACK_STATUS.PAUSED;
      const isNewCurrentTrack = state.currentTrack.name !== name;
      if (isNewCurrentTrack || state.currentTrack.status !== status) {
        return Object.assign({}, state, {
          currentTrack: {
            artist,
            img,
            name,
            status,
          },
          isLoadingCurrentTrack: false,
          isNewCurrentTrack,
        });
      } else {
        // prevent re-render if track has not changed
        return state;
      }

    case types.SPOTIFY_CURRENT_TRACK_NOT_PLAYING:
      let { currentTrack } = state;
      if (currentTrack.name) {
        if (currentTrack.status === TRACK_STATUS.LAST_PLAYED) {
          // handle continual fetching where track has been loaded, but nothing is playing
          return state;
        } else {
          // handle podcast scenario
          return Object.assign({}, state, {
            currentTrack: Object.assign({}, state.currentTrack, {
              status: TRACK_STATUS.LAST_PLAYED,
            }),
          });
        }
      } else {
        // extract last played track from recent tracks
        let lastPlayedTrack = getLastPlayedTrack(state);
        lastPlayedTrack.status = TRACK_STATUS.LAST_PLAYED;
        return Object.assign({}, state, {
          currentTrack: lastPlayedTrack,
          isLoadingCurrentTrack: false,
          isNewCurrentTrack: false,
        });
      }

    case types.SPOTIFY_RECENT_TRACKS_BEGIN:
      return state;

    case types.SPOTIFY_RECENT_TRACKS_SUCCESS:
      const items = action.data.items;
      return Object.assign({}, state, {
        recentTracks: condenseRecentTracks(items),
        isNewCurrentTrack: false,
      });

    case types.SPOTIFY_TOP_ARTISTS_BEGIN:
      return state;

    case types.SPOTIFY_TOP_ARTISTS_SUCCESS:
      const topArtistsByTimeRange = Object.assign({}, state.topArtists);
      topArtistsByTimeRange[action.timeRange] = extractArtistData(
        action.data.items || []
      );
      return Object.assign({}, state, {
        topArtists: topArtistsByTimeRange,
      });

    case types.SPOTIFY_FETCH_ARTIST_BEGIN:
      return Object.assign({}, state, { isArtistLoading: true });

    case types.SPOTIFY_FETCH_ARTIST_SUCCESS: {
      const { artistIndex, artistName, extract, timeRange } = action.payload;
      const artistInfo = state.topArtists[timeRange][artistIndex];
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: true,
        selectedArtist: {
          name: artistName,
          extract,
          img: artistInfo.img,
          followers: artistInfo.followers,
        },
      });
    }

    case types.SPOTIFY_FETCH_ARTIST_OPEN:
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: true,
      });

    case types.SPOTIFY_FETCH_ARTIST_CLOSE:
      return Object.assign({}, state, {
        isArtistLoading: false,
        isArtistOverlayOpen: false,
      });

    default:
      return state;
  }
}
