import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: white;
  width: fit-content;
  padding: 0 1rem;
  a {
    font-style: italic;
    text-decoration: none;
    font-size: 80%;
    color: ${(props) => props.textColor || props.theme.colors.text};
  }
`;
