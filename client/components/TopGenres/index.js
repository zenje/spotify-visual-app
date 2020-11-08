import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const collectGenres = (items) => {
  let allGenres = {};
  if (items) {
    console.log('items', items);
    items.forEach((item, idx) => {
      let artist = item.title;
      let genres = item.genres;
      genres.forEach((genre) => {
        /*let value = allGenres[genre];
        if (value && value.length > 0) {
          value.push(artist);
          //allGenres[genre] = value;
        } else {
          allGenres[genre] = [artist];
        }*/
        //console.log(genre);
        //console.log(artist);
        (allGenres[genre] = allGenres[genre] || []).push(artist);
        /*if (!allGenres[genre]) {
          allGenres[genre] = 0;
        } else {
          allGenres[genre]++;
        }
        const count = allGenres[genre];
        allGenres[genre] = count ? count + 1 : 1;*/
      });
    });
  }
  return allGenres;
};

const sortByValue = (obj) => {
  const sortable = Object.entries(obj).sort(
    ([, a], [, b]) => a.length - b.length
  );
  //.sort(([,a],[,b]) => a-b)
  //.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  console.log(sortable);
  return sortable;
};

export default function TopGenres(props) {
  const timeRange = props.timeRange;
  const tileData = useSelector((state) => {
    if (state.topArtists && state.topArtists[timeRange]) {
      return state.topArtists[timeRange];
    }
    return [];
  });

  return <div>{timeRange}</div>;
}
