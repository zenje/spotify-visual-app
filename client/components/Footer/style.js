import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  > div {
    margin: 0.5rem 0.5rem;
  }
`;

export const Icon = styled.img`
  width: 1rem;
  filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(135deg)
    brightness(111%) contrast(101%);
`;
