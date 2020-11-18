import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.highlight};
  text-align: center;
  width: 100%;
  margin: 0 auto;
`;

export const Header = styled.h3`
  color: white; // ${(props) => props.theme.colors.text};
  width: 100%;
  padding: 0.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  a {
    color: white;
    text-decoration: none;
  }
  `;

export const StyledLink = styled(Link)`
  padding: 0 0.5rem;
`;
