import * as types from '../actions/actionTypes';
import { TRACK_STATUS } from '../constants';

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: {
    loading: false,
    display_name: null,
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
  topTracks: {},
};

const extractArtistData = (artistData) => {
  if (artistData && artistData.length > 0) {
    let tileData = artistData.map((item, idx) => ({
      img: item.images ? item.images[0].url : undefined,
      title: item.name,
      featured: idx < 12,
      href: item.href,
      followers: item.followers.total,
      genres: item.genres,
    }));
    return tileData;
  }
  return [];
};

const extractTrackData = (data) => {
  if (data && data.length > 0) {
    let tracksData = data.map((item, idx) => ({
      img: item.album.images[0].url,
      title: item.name,
      artist: getArtists(item.artists),
    }));
    return tracksData;
  }
  return [];
};

const getArtists = (artists) => {
  if (!artists || !artists.length) {
    return;
  } else if (artists.length === 1) {
    return artists[0].name;
  } else {
    return `${artists[0].name}, ${artists[1].name}`;
  }
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

export default function reduce(state = initialState, action) {
  console.log('action ' + action.type);
  switch (action.type) {
    case types.SPOTIFY_TOKENS:
      const { accessToken, refreshToken } = action;
      return Object.assign({}, state, { accessToken, refreshToken });

    case types.SPOTIFY_ME_BEGIN:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, { loading: true }),
      });

    case types.SPOTIFY_ME_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.data, { loading: false }),
      });

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
      //console.log(action.data.items);
      const topArtistsByTimeRange = Object.assign({}, state.topArtists);
      topArtistsByTimeRange[action.timeRange] = extractArtistData(
        action.data.items || []
      );
      return Object.assign({}, state, {
        topArtists: topArtistsByTimeRange,
      });

    case types.SPOTIFY_TOP_TRACKS_BEGIN:
      return state;

    case types.SPOTIFY_TOP_TRACKS_SUCCESS:
      const topTracksByTimeRange = Object.assign({}, state.topTracks);
      topTracksByTimeRange[action.timeRange] = extractTrackData(
        action.data.items || []
      );
      return Object.assign({}, state, {
        topTracks: topTracksByTimeRange,
      });

    default:
      return state;
  }
}
