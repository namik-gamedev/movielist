import { createSlice, current } from '@reduxjs/toolkit'
import { IFavouriteMovie, IUser } from '../../types'
import axios from 'axios'
import { withDBURL } from '../../helpers/userDB.helper'

const userSlice = createSlice({
   name: 'user',
   initialState: { data: {} as IUser },
   reducers: {
      login: (state, { payload }) => {
         console.log(payload)

         state.data = payload
      },
      logout: (state) => {
         state.data = {} as IUser
      },
      addFavouriteMovie: (state, { payload }) => {
         state.data.favouriteMovies.push(payload)
      },
      removeFavouriteMovie: (state, { payload }) => {
         const index: number = state.data.favouriteMovies.findIndex(
            (movie: IFavouriteMovie) => movie.id === payload.id
         )
         state.data.favouriteMovies.splice(index, 1)
      },
      toggleDarkTheme: (state) => {
         state.data.darkTheme = !state.data.darkTheme
      },
   },
})

export default userSlice.reducer
export const { login, logout, addFavouriteMovie, removeFavouriteMovie, toggleDarkTheme } =
   userSlice.actions
