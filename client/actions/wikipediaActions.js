const API_ENDPOINT_BASE = 'https://en.wikipedia.org';
const ARTIST_IDENTIFIERS = [
  'band',
  'artist',
  'group',
  'singer',
  'songwriter',
  'music',
];
const DISCOGRAPHY = 'discography';

export const fetchArtistExtract = (artistName) => {
  return async (dispatch) => {
    artistName = artistName;
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
      }
    }
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
      return data.query.pages[pageId];
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
