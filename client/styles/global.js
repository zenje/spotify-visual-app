import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    font-family: 'Courier Prime', monospace;
    font-size: 16px;
    color: ${(props) => props.theme.colors.text};
  }
  `;
export default GlobalStyle;
