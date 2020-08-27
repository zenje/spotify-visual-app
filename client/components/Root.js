import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

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
  <>
    <Helmet>
      <title>fun with spotify ✨</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <StylesProvider injectFirst>
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
    </StylesProvider>
  </>
);

export default Root;
