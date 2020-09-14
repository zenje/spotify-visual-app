import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import Cookies from 'js-cookie';

import ArtistsGridWrapper from '../ArtistsGridWrapper';
import TopTracks from '../TopTracks';
import Login from '../Login';
import Main from '../Main';

const accessToken = Cookies.get('spotifyAccessToken');
const refreshToken = Cookies.get('spotifyRefreshToken');
const setCookies = false;

export default function App() {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    initial: { opacity: 1, transform: 'translate3d(0, 0%,0)' },
    from: { opacity: 0, transform: 'translate3d(0, 75%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0%,0)' },
    leave: { opacity: 0, transform: 'translate3d(0, 100%,0)' },
  });
  return transitions.map(({ item: location, props, key }) => (
    <animated.div
      style={{ ...props, position: 'absolute', height: '100%', width: '100%' }}
      key={key}
    >
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
        <Route path="/top/artists">
          <ArtistsGridWrapper />
        </Route>
        <Route path="/top/tracks">
          <TopTracks />
        </Route>
      </Switch>
    </animated.div>
  ));
}
