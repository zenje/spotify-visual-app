import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import Root from './components/Root';
//import './style.scss';

const store = configureStore;

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
