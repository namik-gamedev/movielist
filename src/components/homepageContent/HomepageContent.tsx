import React, { FC } from 'react';
import MoviesService from '../../services/MoviesService';
import Loading from '../UI/loading/Loading';
import styles from './HomepageContent.module.css';
import MovieList from '../movieList/MovieList';

const HomepageContent: FC = () => {
   return (
      <main className={styles.main}>
         <MovieList
            title='Бессмертный топ 15'
            fetchProps={{
               queryKey: ['top15'],
               queryFn: () =>
                  MoviesService.get('/movie', {
                     params: {
                        selectFields: '+ageRating',
                        limit: 15,
                        top250: '!null',
                     },
                  }),
            }}
         />

         <MovieList
            title='Детский топ 15'
            fetchProps={{
               queryKey: ['kids-top15'],
               queryFn: () =>
                  MoviesService.get('/movie', {
                     params: {
                        selectFields: '+ageRating',
                        limit: 15,
                        type: 'cartoon',
                        top250: '!null',
                     },
                  }),
            }}
         />

         <MovieList
            title='Топ 15 аниме 12+'
            fetchProps={{
               queryKey: ['anime-top15-12+'],
               queryFn: () =>
                  MoviesService.get('/movie', {
                     params: {
                        selectFields: '+ageRating',
                        limit: 15,
                        type: 'anime',
                     },
                  }),
            }}
         />
      </main>
   );
};

export default HomepageContent;
