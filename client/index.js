import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
//import { Router, Route, IndexRoute } from 'react-router';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Router,
  Switch,
  Link,
} from 'react-router-dom';
import { syncHistory, routeReducer } from 'react-router-redux';
import { createHistory } from 'history';
import configureStore from './configureStore';
import reducer from './reducers';
import App from './components/App';
import Login from './components/Login';
import User from './components/User';
import Error from './components/Error';

// load our css. there probably is a better way to do this
// but for now this is our move
//require('./style.less');
//import './style.less';
import './style.scss';

// Sync dispatched route actions to the history
/*const reduxRouterMiddleware = syncHistory(hashHistory);
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducer);
*/
const store = configureStore;

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route
                path="/#/user/:accessToken/:refreshToken"
                component={User}
              />
              <Route path="/error/:errorMsg" component={Error} />
            </Switch>
          </App>
        </BrowserRouter>
      </Provider>
    );
  }
}

// render town
const rootElement = document.getElementById('root');
//render(<h1>Hello</h1>, rootElement);
render(<Root />, rootElement);
