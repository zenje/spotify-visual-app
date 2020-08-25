import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Work+Sans:ital,wght@0,400;0,700;1,400&display=swap');
  body {
    background-color: ${(props) => props.theme.colors.background};
    font-family: 'Space Mono', monospace;
  }
  `;
export default GlobalStyle;
