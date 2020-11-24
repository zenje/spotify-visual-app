import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { useTransition } from 'react-spring';
import Cookies from 'js-cookie';
import loadable from '@loadable/component';

import { TOOLTIP_TEXT } from '../../constants';
import { Wrapper } from './style';

const ArtistLoader = loadable(() => import('../loaders/ArtistLoader'));
const ArtistsGrid = loadable(() => import('../ArtistsGrid'));
const Login = loadable(() => import('../Login'));
const Main = loadable(() => import('../Main'));
const TimeRangeWrapper = loadable(() => import('../TimeRangeWrapper'));
const TopGenres = loadable(() => import('../TopGenres'));
const TopTracks = loadable(() => import('../TopTracks'));

export default function App() {
  const accessToken = Cookies.get('spotifyAccessToken');
  const refreshToken = Cookies.get('spotifyRefreshToken');
  const setCookies = false;

  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    initial: { opacity: 1, transform: 'translate3d(0, 0%,0)' },
    from: { opacity: 0, transform: 'translate3d(0, 75%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0%,0)' },
    leave: { opacity: 0, transform: 'translate3d(0, 100%,0)' },
  });
  const isArtistLoading = useSelector(
    (state) => state.artistInfo.isArtistLoading
  );

  if (location.pathname.startsWith('/user')) {
    TimeRangeWrapper.preload();
  }

  return (
    <>
      {isArtistLoading && <ArtistLoader />}
      {transitions.map(({ item: location, props, key }) => (
        <Wrapper style={{ ...props }} key={key}>
          <Switch location={location}>
            <Route exact path="/">
              {accessToken ? (
                <Redirect
                  to={`/user/${accessToken}/${refreshToken}/${setCookies}`}
                />
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/user/:accessToken/:refreshToken/:setCookies">
              <Main />
            </Route>
            <Route path="/top/artists">{getTopArtists()}</Route>
            <Route path="/top/tracks">{getTopTracks()}</Route>
            <Route path="/top/genres">{getTopGenres()}</Route>
          </Switch>
        </Wrapper>
      ))}
    </>
  );
}

const getTopArtists = () => (
  <TimeRangeWrapper
    header={'Your Top Artists'}
    tooltip={TOOLTIP_TEXT.TOP_ARTISTS}
  >
    <ArtistsGrid />
  </TimeRangeWrapper>
);

const getTopTracks = () => (
  <TimeRangeWrapper
    header={'Your Top Tracks'}
    tooltip={TOOLTIP_TEXT.TOP_TRACKS}
  >
    <TopTracks />
  </TimeRangeWrapper>
);

const getTopGenres = () => (
  <TimeRangeWrapper
    header={'Your Top Genres'}
    tooltip={TOOLTIP_TEXT.TOP_GENRES}
  >
    <TopGenres />
  </TimeRangeWrapper>
);
