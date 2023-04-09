import React, { FC, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IGenre, IMovie } from '../../types';
import Rating from '../UI/rating/Rating';
import styles from './MovieThumbnail.module.css';
import { IOptionalMovieData, useOptionalMovieData } from '../../hooks/useOptionalMovieData';

interface movieThumbnailProps {
   movie: IMovie;
   className?: string;
}

const MovieThumbnail: FC<movieThumbnailProps> = ({ movie }) => {
   const navigate: NavigateFunction = useNavigate();

   const { name, rating, posterUrl } = useOptionalMovieData(movie);

   const clickHandler = () => {
      navigate(`/movie/${movie.id}`);
   };

   return (
      <div onClick={clickHandler} className={styles.thumbnail}>
         <div className={styles.thumbnail__content}>
            <img className={styles.thumbnail__poster} src={posterUrl} alt={name} />
            <Rating className={styles.thumbnail__rating} value={rating} />
            {/* movie info mask */}
            <div className={styles.movieInfo}>
               <h3 className={styles.movieInfo__title}>
                  {name} ({movie.year})
               </h3>
               <div className={styles.movieInfo__genres}>{movie.genres.map((genre: IGenre) => genre.name).join(', ')}</div>
               <div className={styles.movieInfo__ageRating}>{movie.ageRating}+</div>
            </div>
         </div>
      </div>
   );
};

export default MovieThumbnail;
