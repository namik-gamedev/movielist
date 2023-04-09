import React, { FC, useState } from 'react'
import { faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button, { ButtonProps } from '../UI/button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addFavouriteMovie, removeFavouriteMovie } from '../../reducers/userReducer'
import { IFavouriteMovie, IUser } from '../../types'

interface AddToFavouriteButton extends ButtonProps {
   id: number
   name: string
}

const AddToFavouriteButton: FC<AddToFavouriteButton> = ({ id, name, onClick, ...props }) => {
   const user: IUser = useSelector((state: any) => state.user.data)
   const favouriteMovies: IFavouriteMovie[] = user.favouriteMovies
   const [movieIsFavourite, setMovieIsFavourite] = useState<boolean>(
      favouriteMovies.some((movie: IFavouriteMovie) => movie.id === id)
   )
   const dispatch = useDispatch()

   const favouriteClickHandler = (): void => {
      if (movieIsFavourite) {
         dispatch(removeFavouriteMovie({ id, name }))
      } else {
         dispatch(addFavouriteMovie({ id, name }))
      }
      setMovieIsFavourite((prev) => !prev)
   }

   return (
      <Button
         {...props}
         onClick={(e) => {
            favouriteClickHandler()
            onClick!(e)
         }}
      >
         <FontAwesomeIcon icon={movieIsFavourite ? faSolidBookmark : faRegularBookmark} />
      </Button>
   )
}

export default AddToFavouriteButton
