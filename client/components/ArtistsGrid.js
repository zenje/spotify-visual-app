import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTopArtists } from '../actions/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import testData from './artistsTestData';

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

const getTileData = (topArtists) => {
  if (topArtists && topArtists.items) {
    return topArtists.items.map((item, idx) => ({
      img: item.images ? item.images[0].url : undefined,
      title: item.name,
      featured: idx < 12,
    }));
  }
  return [];
};

function ArtistsGrid({ timeRange, topArtists, getTopArtists }) {
  console.log('ArtistsGrid');
  //console.log(tileData);

  useEffect(() => {
    console.log('load top artists, timeRange ' + timeRange);
    getTopArtists(timeRange);
  }, []);

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
  let tileData = getTileData(topArtists);
  console.log('tileData', tileData);

  return (
    <div className={classes.root}>
      <GridList
        align="center"
        cellHeight={90}
        spacing={5}
        cols={colsRows.cols}
        className={classes.gridList}
      >
        {tileData.map((tile) => (
          <GridListTile
            align="center"
            key={tile.img}
            cols={tile.featured ? colsRows.tileColsFeatured : colsRows.tileCols}
            rows={tile.featured ? colsRows.tileRowsFeatured : colsRows.tileRows}
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
    </div>
  );
}

const mapStateToProps = ({ topArtists }, ownProps) => {
  return { topArtists };
};

const actionCreators = {
  getTopArtists,
};

export default connect(mapStateToProps, actionCreators)(ArtistsGrid);
