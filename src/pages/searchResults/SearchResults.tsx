import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MoviesService from '../../services/MoviesService';
import { IMovie } from '../../types';
import SearchMovieThumbnail from '../../components/searchMovieThumbnail/SearchMovieThumbnail';
import Loading from '../../components/UI/loading/Loading';
import Pagination from '../../components/UI/pagination/Pagination';
import styles from './SearchResults.module.css';
import { useFetch } from '../../hooks/useFetch';
import Error from '../../components/UI/error/Error';
import { AxiosError } from 'axios';

const SearchResults: FC = () => {
   const { query } = useParams();

   const [page, setPage] = useState<number>(1);
   const { data, isLoading, error } = useFetch<IMovie[], AxiosError>({
      queryKey: ['search-results', query, page],
      queryFn: () =>
         MoviesService.get('/movie', {
            params: {
               selectFields: '+ageRating',
               name: query,
               page,
            },
         }),
   });

   useEffect(() => {
      setPage(1);
   }, [query]);

   if (isLoading) {
      return <Loading />;
   }

   if (error) {
      return <Error statusCode={error.response?.status} name={error.code} description={error.message} />;
   }

   return (
      <div className={styles.searchResults}>
         <h2>Результаты поиска</h2>
         {data.docs.length === 0 ? (
            <div>Ничего не найдено!</div>
         ) : (
            <>
               <div className={styles.searchResults__content}>
                  {data.docs.map((movie: IMovie) => (
                     <SearchMovieThumbnail movie={movie} />
                  ))}
               </div>
               <Pagination pageSize={3} siblingCount={4} totalCount={data.pages} activePage={page} setActivePage={setPage} />
            </>
         )}
      </div>
   );
};

export default SearchResults;
