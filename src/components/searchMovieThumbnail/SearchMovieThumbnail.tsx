import React, { FC } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { IMovie } from '../../types'
import styles from './SearchMovieThumbnail.module.css'
import AddToFavouriteButton from '../addToFavouriteButton/AddToFavouriteButton'

interface SearchMovieThumbnailProps {
   movie: IMovie
}

const SearchMovieThumbnail: FC<SearchMovieThumbnailProps> = ({ movie }) => {
   const navigate: NavigateFunction = useNavigate()

   return (
      <div onClick={() => navigate(`/movie/${movie.id}`)} className={styles.thumbnail}>
         <div className={styles.thumbnail__poster}>
            <img
               className={styles.thumbnail__img}
               src={movie.poster?.previewUrl || movie.poster?.url}
               alt=''
            />
         </div>
         <div className={styles.movieInfo}>
            <div className={styles.movieInfo__header}>
               <AddToFavouriteButton
                  className={styles.movieInfo__btn}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  id={movie.id}
                  name={movie.name}
               />
               <h2 className={styles.movieInfo__title}>
                  {movie.name || movie.alternativeName} ({movie.year}) | {movie.ageRating}+
               </h2>
            </div>
            <p className={styles.movieInfo__description}>
               {movie.shortDescription || movie.description}
            </p>
         </div>
      </div>
   )
}

export default SearchMovieThumbnail
