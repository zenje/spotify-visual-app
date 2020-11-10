import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import VisibilitySensor from 'react-visibility-sensor';
import Container from '@material-ui/core/Container';

import { closeArtistOverlay, getArtistInfo } from '../../actions/artistActions';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useGetTopArtists } from '../../hooks/useGetTopArtists';
import ArtistOverlay from '../ArtistOverlay';
import {
  StyledGridList,
  StyledGridListTile,
  StyledGridListTileBar,
  TileWrapper,
} from './style';
//import testData from './artistsTestData';

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

const getGridListColsRows = (screenLarge, screenMedium) => {
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

export default function ArtistsGrid(props) {
  const dispatch = useDispatch();
  const timeRange = props.timeRange;
  const isArtistOverlayOpen = useSelector(
    (state) => state.artistInfo.isArtistOverlayOpen
  );
  const selectedArtist = useSelector(
    (state) => state.artistInfo.selectedArtist
  );
  const tileData = useGetTopArtists(timeRange);

  const theme = useTheme();
  const size = useWindowSize();
  const screenLarge = useMediaQuery(theme.breakpoints.up('md'));
  const screenMedium = useMediaQuery(theme.breakpoints.up('sm'));
  const colsRows = getGridListColsRows(screenLarge, screenMedium);
  const cellHeight = size.height / 8;

  const handleArtistClose = () => {
    dispatch(closeArtistOverlay());
  };

  return (
    <Container>
      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <StyledGridList
            align="center"
            cellHeight={cellHeight}
            spacing={5}
            cols={colsRows.cols}
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
