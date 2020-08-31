import * as types from './actionTypes';

const API_ENDPOINT_BASE = 'https://en.wikipedia.org';
const ARTIST_IDENTIFIERS = [
  'band',
  'artist',
  'group',
  'singer',
  'songwriter',
  'music',
  'duo',
];
const DISCOGRAPHY = 'discography';

export const fetchArtistExtract = (artistName, artistIndex, timeRange) => {
  return async (dispatch, getState) => {
    function onSuccess(success) {
      const payload = {
        artistIndex,
        artistName,
        timeRange,
        extract: success,
      };
      dispatch({ type: types.SPOTIFY_FETCH_ARTIST_SUCCESS, payload });
      return success;
    }
    function onError(error) {
      dispatch({ type: types.SPOTIFY_FETCH_ARTIST_FAILURE, error });
      return error;
    }

    dispatch(loadArtistOverlay());

    const state = getState();
    const stateArtistName = state.selectedArtist.name;
    // if artist is already loaded, then just open the overlay
    if (stateArtistName === artistName) {
      dispatch(openArtistOverlay());
      return;
    }

    try {
      let pageId = await fetchArtistPageId(artistName, `${artistName} (band)`);
      if (!pageId) {
        // try another query if not found
        pageId = await fetchArtistPageId(artistName, `${artistName} (singer)`);
      }

      if (pageId) {
        console.log('PAGEID IS ' + pageId);

        const pageExtract = await fetchPageExtract(pageId);
        if (pageExtract) {
          console.log('PAGEEXTRACT');
          console.log(pageExtract);
          return onSuccess(pageExtract);
        }
      }
    } catch (error) {
      onError(error);
    }

    return onError('Artist info not found');
  };
};

const fetchArtistPageId = async (artistName, queryString) => {
  const searchEndpoint = getSearchQuery(queryString ? queryString : artistName);
  return await fetch(searchEndpoint)
    .then((response) => response.json())
    .then((data) => {
      return findArtistPageIdFromSearchResults(artistName, data);
    })
    .catch((e) => console.log('An error occurred ' + e));
};

const fetchPageExtract = async (pageId) => {
  const pageEndpoint = getPageQuery(pageId);
  return await fetch(pageEndpoint)
    .then((response) => response.json())
    .then((data) => {
      return data.query.pages[pageId].extract;
    })
    .catch((e) => console.log('An error occurred ' + e));
};

const findArtistPageIdFromSearchResults = (artistName, searchResults) => {
  let pageId;
  console.log('SEARCHRESULTS');
  console.log(searchResults);
  if (searchResults && searchResults.query && searchResults.query.search) {
    const search = searchResults.query.search;
    if (search.length < 1) {
      return pageId;
    }
    artistName = sanitize(artistName);

    let foundPage = search.find((item) => {
      const title = sanitize(item.title);
      const snippet = item.snippet;
      return (
        (title === artistName && containsArtistIdentifiers(snippet)) ||
        (title.includes(artistName) && containsArtistIdentifiers(title))
      );
    });
    console.log('foundPage');
    console.log(foundPage);
    if (!foundPage) {
      const firstItem = search[0];
      const title = sanitize(firstItem.title);

      // best effort - match artists with non-alphanumeric chars
      // (e.g., Florence + the Machine, half•alive)
      if (
        containsArtistIdentifiers(firstItem.snippet) &&
        doesNotContainDiscography(title)
      ) {
        console.log('default to first');
        foundPage = firstItem;
        console.log(foundPage);
      }
    }

    if (foundPage) {
      pageId = foundPage.pageid;
    }
  }

  return pageId;
};

export const loadArtistOverlay = () => {
  return { type: types.SPOTIFY_FETCH_ARTIST_BEGIN };
};

export const openArtistOverlay = () => {
  return { type: types.SPOTIFY_FETCH_ARTIST_OPEN };
};

export const closeArtistOverlay = () => {
  return { type: types.SPOTIFY_FETCH_ARTIST_CLOSE };
};

/**
  API endpoint builders
*/
// origin=* is necessary for unauthenticated CORS request
// (Access-Control-Allow-Credentials: false)
const getSearchQuery = (searchQuery) => {
  return `${API_ENDPOINT_BASE}/w/api.php?action=query&format=json&list=search&srsearch=${searchQuery}&srnamespace=0&srlimit=5&origin=*`;
};

const getPageQuery = (pageId) => {
  return `${API_ENDPOINT_BASE}/w/api.php?action=query&format=json&prop=extracts&pageids=${pageId}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`;
};

/**
  HELPER UTILITIES
*/
const sanitize = (str) => {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const containsStrings = (text, substrings) => {
  return new RegExp(substrings.join('|')).test(text);
};

const containsArtistIdentifiers = (text) => {
  return containsStrings(text, ARTIST_IDENTIFIERS);
};

const doesNotContainDiscography = (text) => {
  return !containsStrings(text, [DISCOGRAPHY]);
};
