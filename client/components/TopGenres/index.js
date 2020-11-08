import React from 'react';
import { useGetTopGenres } from '../../hooks/useGetTopGenres';

export default function TopGenres(props) {
  const timeRange = props.timeRange;
  const genres = useGetTopGenres(timeRange);

  return (
    <>
      <div>{timeRange}</div>
      <>
        {genres.map((item) => (
          <React.Fragment key={item[0]}>
            <div>{item[0]}</div>
            <div>
              <ul>
                {item[1].map((artist) => (
                  <li key={artist}>{artist}</li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </>
    </>
  );
}
