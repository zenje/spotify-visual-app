import styled, { keyframes } from 'styled-components';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
  `;

const fadeInUp2 = keyframes`
  100% {
    opacity: 0;
    transform: translateY(20px);
  }

  0% {
    opacity: 1;
    transform: translateY(0);
  }
  `;

export const StyledGridList = styled(GridList)`
  transform: 'translateZ(0)';
  z-index: 0;
  justify-content: center;
  width: 100%,
  min-height: 100vh,
  transform: translateZ(0),
`;

export const StyledGridListTile = styled(GridListTile)`
  animation-duration: 0.5s;
  animation-fill-mode: both;
  //animation-delay: ${(props) => props.index * 100}ms;
  animation-delay: 0.5s;
  //animation-name: fadeInUp;
  // use transient prop $isVisible - not passed down to DOM
  animation-name: ${(props) => (props.$isVisible ? fadeInUp : fadeInUp2)};
`;

export const StyledGridListTileBar = styled(GridListTileBar)`
  font-family: ${(props) => props.theme.fonts.primary};
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0) 100%
  );
`;

export const TileWrapper = styled.img`
  animation-duration: 0.45s;
  animation-fill-mode: both;
  animation-name: fadeInUp;
`;
