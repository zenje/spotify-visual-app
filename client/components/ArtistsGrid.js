import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import VisibilitySensor from 'react-visibility-sensor';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { BounceLoader } from 'halogenium';

import { getTopArtists } from '../actions/actions';
import {
  fetchArtistExtract,
  closeArtistOverlay,
} from '../actions/wikipediaActions';

import ArtistOverlay from './ArtistOverlay';
import ArtistLoader from './loaders/ArtistLoader';
// import testData from './artistsTestData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    // Promote the list into own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

/*
const tileData = testData.items.map((item, idx) => ({
  img: item.images ? item.images[0].url : undefined,
  title: item.name,
  featured: idx < 12,
}));
*/

const getTileData = (topArtists, timeRange) => {
  console.log('GETTILEDATA ' + timeRange);
  if (topArtists && topArtists[timeRange] && topArtists[timeRange].items) {
    let tileData = topArtists[timeRange].items.map((item, idx) => ({
      img: item.images ? item.images[0].url : undefined,
      title: item.name,
      featured: idx < 12,
    }));
    console.log('tileData');
    console.log(tileData);
    return tileData;
  }
  return [];
};

/*
const collectGenres = (topArtists, timeRange) => {
  let allGenres = {};
  if (topArtists && topArtists[timeRange] && topArtists[timeRange].items) {
    topArtists[timeRange].items.forEach((item, idx) => {
      let artist = item.name;
      let genres = item.genres;
      genres.forEach((genre) => {
        if (value && value.length > 0) {
          value.push(artist);
          allGenres[genre] = value;
        } else {
          allGenres[genre] = [artist];
        }
        //(allGenres[genre] = allGenres[genre] || []).push(artist);
        if (!allGenres[genre]) {
          allGenres[genre] = 0;
        } else {
          allGenres[genre]++;
        }
        const count = allGenres[genre];
        allGenres[genre] = count ? count + 1 : 1;
      });
    });
  }
  return allGenres;
};*/

function ArtistsGrid({
  timeRange,
  topArtists,
  getTopArtists,
  fetchArtistExtract,
  selectedArtist,
  isArtistLoading,
  isArtistOverlayOpen,
  closeArtistOverlay,
}) {
  console.log('ARTISTSGRID BEGIN------------');

  // TODO - don't pass in entire topArtists object
  let [tileData, setTileData] = useState([]);
  useEffect(() => {
    if (!topArtists[timeRange]) {
      // only fetch top artists if time range data has not yet been loaded
      getTopArtists(timeRange);
    }
  }, [timeRange]);
  useEffect(() => {
    let data = getTileData(topArtists, timeRange);
    if (data) {
      setTileData(data);
    }
  }, [topArtists]);

  const classes = useStyles();
  const theme = useTheme();
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
  //let tileData = getTileData(topArtists, timeRange);
  //let genres = collectGenres(topArtists, timeRange);
  //console.log('genres');
  //console.log(JSON.stringify(genres));
  //console.log(genres);

  const handleArtistClose = () => {
    closeArtistOverlay();
  };

  return (
    <div className={classes.root}>
      {isArtistLoading && <ArtistLoader />}
      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <GridList
            align="center"
            cellHeight={90}
            spacing={5}
            cols={colsRows.cols}
            className={classes.gridList}
          >
            {tileData.map((tile, index) => (
              <GridListTile
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
                  fetchArtistExtract(tile.title);
                }}
                className={isVisible ? 'fadeInUp' : 'fadeInUpNotVisible'}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  titlePosition="bottom"
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </GridListTile>
            ))}
          </GridList>
        )}
      </VisibilitySensor>
      <ArtistOverlay
        open={isArtistOverlayOpen}
        handleClose={handleArtistClose}
        artist={selectedArtist}
      />
    </div>
  );
}

const mapStateToProps = (
  { topArtists, selectedArtist, isArtistLoading, isArtistOverlayOpen },
  ownProps
) => {
  return { topArtists, selectedArtist, isArtistLoading, isArtistOverlayOpen };
};

const actionCreators = {
  getTopArtists,
  fetchArtistExtract,
  closeArtistOverlay,
};

export default connect(mapStateToProps, actionCreators)(ArtistsGrid);
