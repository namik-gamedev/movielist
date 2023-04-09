import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import MoviesService from '../../services/MoviesService';
import { ICountry, IGenre, IMovie, IPerson, ITrailer, IUser } from '../../types';
import Loading from '../../components/UI/loading/Loading';
import Rating from '../../components/UI/rating/Rating';
import styles from './Movie.module.css';
import AddToFavouriteButton from '../../components/addToFavouriteButton/AddToFavouriteButton';
import Dropdown from '../../components/UI/dropdown/Dropdown';
import { useSelector } from 'react-redux';
import Error from '../../components/UI/error/Error';
import { UseQueryResult } from '@tanstack/react-query/build/lib/types';
import { Axios, AxiosError } from 'axios';
import { useOptionalMovieData } from '../../hooks/useOptionalMovieData';

interface MoviePropProps {
   propName: string;
   propValue: any;
}
const MovieProp: FC<MoviePropProps> = ({ propName, propValue }) => {
   return (
      <li className={styles.movie__prop}>
         {propName}: <span className={styles.movie__propValue}>{propValue}</span>
      </li>
   );
};

const Movie: FC = () => {
   const { id } = useParams();
   const { data, isLoading, error } = useFetch<IMovie, AxiosError>([`movie-${id}`], () => MoviesService.get(`/movie/${id}`));

   const { name, rating, alternativeName, posterUrl } = useOptionalMovieData(data);

   const favouriteMovies = useSelector((state: any) => state.user?.data.favouriteMovies);

   if (isLoading) {
      return <Loading />;
   }

   if (error) {
      return <Error statusCode={error.response?.status} name={error.code} description={error.message} />;
   }

   return (
      <main className={styles.movie}>
         <div className={styles.movie__content}>
            <img className={styles.movie__poster} src={posterUrl} alt={name} />
            <div className={styles.movie__about}>
               <header className={styles.header}>
                  {favouriteMovies && <AddToFavouriteButton id={data.id} name={data.name} />}

                  <h3 className={styles.movie__title}>
                     {name} ({data.year})
                  </h3>
                  <Rating value={rating} />
                  <div className={styles.movie__ageRating}>{data.ageRating}+</div>
               </header>
               <ul className={styles.movie__props}>
                  <MovieProp propName='Альтернативное название' propValue={alternativeName} />
                  <MovieProp propName='Слоган' propValue={data.slogan} />
                  <MovieProp propName='Возрастное ограничение' propValue={`${data.ageRating}+`} />
                  <MovieProp propName='Жанры' propValue={data.genres.map((genre: IGenre): string => genre.name).join(', ')} />
                  <MovieProp propName='Описание' propValue={data.description} />
                  <MovieProp propName='Страны' propValue={data.countries.map((country: ICountry): string => country.name).join(', ')} />
                  <MovieProp
                     propName='Продюcеры'
                     propValue={data.persons
                        .filter((person: IPerson) => person.profession === 'продюсеры')
                        .map((person: IPerson): string => person.name)
                        .join(', ')}
                  />
                  <MovieProp
                     propName='Режиссеры'
                     propValue={data.persons
                        .filter((person: IPerson) => person.profession === 'режиссеры')
                        .map((person: IPerson): string => person.name)
                        .join(', ')}
                  />
               </ul>
            </div>
            <div className={styles.movie__dropdowns}>
               <Dropdown title='Актеры'>
                  {data.persons
                     .filter((person: IPerson) => person.profession === 'актеры')
                     .map((person: IPerson, index: number) => {
                        return <div key={index}>{person.name}</div>;
                     })}
               </Dropdown>
               <Dropdown title='Актеры дубляжа'>
                  {data.persons
                     .filter((person: IPerson) => person.profession === 'актеры дубляжа')
                     .map((person: IPerson, index: number) => {
                        return <div key={index}>{person.name}</div>;
                     })}
               </Dropdown>
            </div>
            <div className={styles.movie__videos}>
               <h2>Трейлеры / тизеры</h2>
               {data.videos.trailers.map((trailer: ITrailer, index: number) => {
                  return (
                     <a className={styles.movie__link} href={trailer.url} key={index}>
                        {trailer.url}
                     </a>
                  );
               })}
            </div>
         </div>
      </main>
   );
};

export default Movie;
