import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import VisibilitySensor from 'react-visibility-sensor';
import styled, { keyframes } from 'styled-components';
import { Spring } from 'react-spring/renderprops';

import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { fetchArtistExtract } from '../actions/wikipediaActions';
import { closeArtistOverlay, getArtistInfo } from '../actions/artistActions';
import { useWindowSize } from '../hooks/useWindowSize';
import { useGetTopArtists } from '../hooks/useGetTopArtists';

import ArtistOverlay from './ArtistOverlay';
import testData from './artistsTestData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    minHeight: '100vh',
    // Promote the list into own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/*const tileData = testData.items.map((item, idx) => ({
  img: item.images ? item.images[0].url : undefined,
  title: item.name,
  featured: idx < 12,
}));*/

/*const SpringGridListTile = (props) => {
  const { isVisible, delay } = props;
  const transition = isVisible
    ? `transform 300ms linear ${delay}, opacity 300ms linear ${delay}`
    : null;
  return (
    <Spring
      to={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
      }}
    >
      {({ opacity, transform }) => (
        <GridListTile
          {...props}
          style={{ ...props.style, opacity, transform, transition }}
        />
      )}
    </Spring>
  );
};
SpringGridListTile.muiName = GridListTile.muiName;*/

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
const StyledGridList = styled(GridList)`
  transform: 'translateZ(0)';
  z-index: 0;
  justify-content: center;
`;

const StyledGridListTile = styled(GridListTile)`
  animation-duration: 0.5s;
  animation-fill-mode: both;
  // animation-delay: ${(props) => props.index * 100}ms;
  animation-delay: 0.5s;
  animation-name: ${(props) => (props.$isVisible ? fadeInUp : fadeInUp2)};
`;

const StyledGridListTileBar = styled(GridListTileBar)`
  font-family: ${(props) => props.theme.fonts.primary};
`;

const TileWrapper = styled.img`
  animation-duration: 0.45s;
  animation-fill-mode: both;
  // use transient prop $isVisible - not passed down to DOM
  animation-name: ${(props) => (props.$isVisible ? fadeInUp : fadeInUp2)};
`;

export default function ArtistsGrid(props) {
  console.log('ARTISTSGRID BEGIN------------');

  const dispatch = useDispatch();
  const timeRange = props.timeRange;
  const isArtistOverlayOpen = useSelector(
    (state) => state.artistInfo.isArtistOverlayOpen
  );
  const selectedArtist = useSelector(
    (state) => state.artistInfo.selectedArtist
  );
  const tileData = useGetTopArtists(timeRange);

  const classes = useStyles();
  const theme = useTheme();
  const size = useWindowSize();
  const screenLarge = useMediaQuery(theme.breakpoints.up('md'));
  const screenMedium = useMediaQuery(theme.breakpoints.up('sm'));

  const getGridListColsRows = () => {
    let values = {
      cols: 24,
      tileColsFeatured: 6,
      tileRowsFeatured: 3,
      tileCols: 4,
      tileRows: 2,
    };
    if (screenLarge) {
      console.log('>md');
      return values;
    } else if (screenMedium) {
      return Object.assign({}, values, { cols: 18, tileCols: 3, tileRows: 2 });
      console.log('>sm');
    } else {
      console.log('<sm');
      return Object.assign({}, values, { cols: 12, tileCols: 3, tileRows: 2 });
    }
    return values;
  };

  let colsRows = getGridListColsRows();

  const handleArtistClose = () => {
    dispatch(closeArtistOverlay());
  };

  let cellHeight = size.height / 8;

  return (
    <Container>
      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <StyledGridList
            align="center"
            cellHeight={cellHeight}
            spacing={5}
            cols={colsRows.cols}
            className={classes.gridList}
          >
            {tileData.map((tile, index) => (
              <StyledGridListTile
                align="center"
                key={tile.img}
                cols={
                  tile.featured ? colsRows.tileColsFeatured : colsRows.tileCols
                }
                rows={
                  tile.featured ? colsRows.tileRowsFeatured : colsRows.tileRows
                }
                onClick={() => {
                  console.log('clicked ' + tile.title);
                  dispatch(getArtistInfo(tile.title, index, timeRange));
                }}
                index={index}
                $isVisible={isVisible}
              >
                <img src={tile.img} alt={tile.title} />
                <StyledGridListTileBar
                  title={tile.title}
                  titlePosition="bottom"
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </StyledGridListTile>
            ))}
          </StyledGridList>
        )}
      </VisibilitySensor>
      <ArtistOverlay
        open={isArtistOverlayOpen}
        handleClose={handleArtistClose}
        artist={selectedArtist}
      />
    </Container>
  );
}
