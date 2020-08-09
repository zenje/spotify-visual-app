import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTopArtists } from '../actions/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import artistsTestData from './artistsTestData';

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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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

const tileData = artistsTestData.artistsTestData.items.map((item, idx) => ({
  img: item.images ? item.images[0].url : undefined,
  title: item.name,
  featured: idx < 12,
}));

function ArtistsGrid({ getTopArtists }) {
  console.log('ArtistsGrid');
  console.log(tileData);

  useEffect(() => {
    //getTopArtists();
  }, []);

  const classes = useStyles();

  const theme = useTheme();
  const screenLarge = useMediaQuery(theme.breakpoints.up('md'));
  const screenMedium = useMediaQuery(theme.breakpoints.up('sm'));

  const getGridListColsRows = () => {
    let values = {
      gridListCols: 24,
      gridListTileColsFeatured: 6,
      gridListTileRowsFeatured: 3,
      gridListTileCols: 4,
      gridListTileRows: 2,
    };
    if (screenLarge) {
      console.log('>md');
      values.gridListCols = 24;
    } else if (screenMedium) {
      console.log('>sm');
      values.gridListCols = 18;
      values.gridListTileCols = 3;
      values.gridListTileRows = 2;
    } else {
      console.log('<sm');
      values.gridListCols = 12;
      values.gridListTileCols = 3;
      values.gridListTileRows = 2;
    }

    return values;
  };

  let colsRows = getGridListColsRows();

  return (
    <div className={classes.root}>
      <GridList
        align="center"
        cellHeight={90}
        spacing={5}
        cols={colsRows.gridListCols}
        className={classes.gridList}
      >
        {tileData.map((tile) => (
          <GridListTile
            align="center"
            key={tile.img}
            cols={
              tile.featured
                ? colsRows.gridListTileColsFeatured
                : colsRows.gridListTileCols
            }
            rows={
              tile.featured
                ? colsRows.gridListTileRowsFeatured
                : colsRows.gridListTileRows
            }
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

const actionCreators = {
  getTopArtists,
};

export default connect(null, actionCreators)(ArtistsGrid);
