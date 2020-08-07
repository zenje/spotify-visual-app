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
  useLocation,
} from 'react-router-dom';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createHistory } from 'history';
import configureStore from './configureStore';
import App from './components/App';
import Login from './components/Login';
import User from './components/User';
import Error from './components/Error';
import './style.scss';

const store = configureStore;

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/user/:accessToken/:refreshToken" component={User} />
          <Route path="/error/:errorMsg" component={Error} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>
);

// render town
const rootElement = document.getElementById('root');
render(<Root store={store} />, rootElement);
