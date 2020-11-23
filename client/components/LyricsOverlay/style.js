import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 1rem;
`;

export const Lyrics = styled.div`
  padding-top: 1rem;
  color: ${(props) => props.textColor || props.theme.colors.text};
`;
