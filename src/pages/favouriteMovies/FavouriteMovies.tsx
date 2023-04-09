import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFavouriteMovie } from '../../reducers/userReducer'
import { IFavouriteMovie } from '../../types'
import styles from './FavouriteMovies.module.css'
import Button from '../../components/UI/button/Button'

const FavouriteMovies: FC = () => {
   const favouriteMovies = useSelector((state: any) => state.user.data.favouriteMovies)

   const dispatch = useDispatch()

   const clickHandler = (e: React.MouseEvent, movie: IFavouriteMovie): void => {
      e.stopPropagation()
      dispatch(removeFavouriteMovie(movie))
   }

   return (
      <div className={styles.movies}>
         <h2>Любимые фильмы</h2>
         <ul className={styles.movies__list}>
            {favouriteMovies.map((movie: IFavouriteMovie) => (
               <li className={styles.movies__item} key={movie.id}>
                  <Link to={`../movie/${movie.id}`}>{movie.name}</Link>
                  <Button onClick={(e) => clickHandler(e, movie)}>
                     <FontAwesomeIcon icon={faMinus} />
                  </Button>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default FavouriteMovies
