import React, { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage/Homepage'
import Layout from './layout/Layout'
import SearchResults from './pages/searchResults/SearchResults'
import Movie from './pages/movie/Movie'
import FavouriteMovies from './pages/favouriteMovies/FavouriteMovies'
import './styles/App.css'
import classNames from 'classnames'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './reducers/userReducer'

const cookies = new Cookies()

function App() {
   const dark: boolean = useSelector((state: any) => state.user.data.darkTheme)
   const dispatch = useDispatch()

   useEffect(() => {
      const lastUser = cookies.get('last-user')
      console.log(lastUser)

      if (lastUser) {
         dispatch(login(lastUser))
      }
   }, [])

   return (
      <div className={classNames('App', dark && 'black')}>
         <BrowserRouter>
            <Layout>
               <Routes>
                  <Route path='/' element={<Homepage />} />
                  <Route path='/search-results/:query' element={<SearchResults />} />
                  <Route path='/movie/:id' element={<Movie />} />
                  <Route path='/favourite-movies' element={<FavouriteMovies />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/registration' element={<Registration />} />
               </Routes>
            </Layout>
         </BrowserRouter>
      </div>
   )
}

export default App
