import { gql, useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const client = new useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `,
      })
      .then(result => setMovies(result.data.allMovies));
  }, [client]);

  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};

export default Movies;
