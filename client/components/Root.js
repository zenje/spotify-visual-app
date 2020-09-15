import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import { PRIMARY_FONT_URL } from '../constants';
import App from './App';

const Root = () => (
  <>
    <Helmet>
      <title>fun with spotify ✨</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href={PRIMARY_FONT_URL} rel="stylesheet" />
    </Helmet>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  </>
);

export default Root;
