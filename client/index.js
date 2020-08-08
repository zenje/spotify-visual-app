import React, { Component, useEffect } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Router,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createHistory } from 'history';
import configureStore from './configureStore';
import App from './components/App';
import Login from './components/Login';
import User from './components/User';
import Error from './components/Error';
import './style.scss';

const store = configureStore;

let accessToken = Cookies.get('spotifyAccessToken');
let refreshToken = Cookies.get('spotifyRefreshToken');

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/">
            {accessToken ? (
              <Redirect to={`/user/${accessToken}/${refreshToken}`} />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/user/:accessToken/:refreshToken">
            <User />
          </Route>
          <Route path="/error/:errorMsg">
            <Error />
          </Route>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);

const rootElement = document.getElementById('root');
render(<Root store={store} />, rootElement);
