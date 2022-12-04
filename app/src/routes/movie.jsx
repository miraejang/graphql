import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;
const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;
const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 28px;
`;
const Image = styled.img`
  width: 25%;
  border-radius: 7px;
`;

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      summary
      isLiked @client
    }
  }
`;

const Movie = () => {
  const { id } = useParams();
  const {
    loading,
    data,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const onClickLike = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  return (
    <Container>
      <Column>
        <Title>{loading ? 'Loading...' : `${data?.movie?.title}`}</Title>
        <Subtitle>{data?.movie && `⭐️ ${data.movie.rating}`}</Subtitle>
        {data?.movie && <button onClick={onClickLike}>{data?.movie?.isLiked ? 'Unlike' : 'Like'}</button>}
      </Column>
      <Image src={data?.movie?.medium_cover_image} alt={data?.movie?.title} />
      <Description>{data?.movie?.summary}</Description>
    </Container>
  );
};

export default Movie;
