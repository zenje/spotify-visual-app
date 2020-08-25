import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import App from './App';
import Login from './Login';
import User from './User';
import Error from './Error';

const accessToken = Cookies.get('spotifyAccessToken');
const refreshToken = Cookies.get('spotifyRefreshToken');
const setCookies = false;

const Root = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
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
          <User />
        </Route>
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default Root;
