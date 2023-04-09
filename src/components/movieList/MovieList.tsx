import React, { FC, useState, useEffect } from 'react';
import { IMovie } from '../../types';
import Carousel from '../UI/carousel/Carousel';
import MovieThumbnail from '../movieThumbnail/MovieThumbnail';
import styles from './MovieList.module.css';
import Loading from '../UI/loading/Loading';
import { useFetch, UseFetchProps } from '../../hooks/useFetch';
import Error from '../UI/error/Error';
import { AxiosError } from 'axios';

interface MovieListProps {
   title: string;
   fetchProps: UseFetchProps;
}

const MovieList: FC<MovieListProps> = ({ title, fetchProps }) => {
   const { data, isLoading, error } = useFetch(fetchProps.queryKey, fetchProps.queryFn, fetchProps.options);
   const [moviesAmount, setMoviesAmount] = useState<number>(0);

   useEffect(() => {
      if (!data) {
         return;
      }
      setMoviesAmount(data.total > data.limit ? data.limit : data.total);
   }, [isLoading]);

   if (isLoading) {
      return <Loading />;
   }

   if (error) {
      return <Error statusCode={error.response?.status} name={error.code} description={error.message} />;
   }

   return (
      <div className={styles.list}>
         <h2>{title}</h2>
         <Carousel itemWidthPx={200} itemsCount={moviesAmount} pageLength={4} itemsGap={12}>
            {data.docs.map((movie: IMovie) => {
               return <MovieThumbnail key={movie.id} movie={movie} />;
            })}
         </Carousel>
      </div>
   );
};

export default MovieList;
