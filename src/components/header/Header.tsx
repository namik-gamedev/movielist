import React, { FC, useState, useEffect } from 'react';
import Input from '../UI/input/Input';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookmark, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import Button from '../UI/button/Button';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import SearchForm from '../searchForm/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { IFavouriteMovie, IUser } from '../../types';
import { logout } from '../../reducers/userReducer';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Header: FC = () => {
   const navigate: NavigateFunction = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector((state: any) => state.user.data);
   const [userIsLogged, setUserIsLogged] = useState<boolean>(Object.keys(user).length > 0);
   const favouriteMovies = user.favouriteMovies;

   useEffect(() => {
      setUserIsLogged(Object.keys(user).length > 0);
   }, [user]);

   return (
      <div className={styles.header}>
         <div className={styles.header__left}>
            <SearchForm />
         </div>
         <Link to='/'>
            <h1 className={styles.header__title}>KinoList</h1>
         </Link>
         <div className={styles.header__right}>
            {favouriteMovies && (
               <Link to='/favourite-movies'>
                  <Button className={styles.header__btnWithText}>
                     <FontAwesomeIcon icon={faBookmark} />
                     <div className={styles.header__favouriteCount}>{favouriteMovies.length}</div>
                  </Button>
               </Link>
            )}

            <Link to='/login'>
               <Button className={styles.header__btnWithText}>
                  <FontAwesomeIcon icon={faUser} />
                  <div className={styles.header__username}>
                     {userIsLogged ? user.name : 'Войти'}
                  </div>
               </Button>
            </Link>
            {userIsLogged && (
               <Button
                  className={styles.header__btnWithText}
                  onClick={() => {
                     dispatch(logout());
                     navigate('/');
                  }}
               >
                  <FontAwesomeIcon icon={faDoorOpen} />
                  Выйти
               </Button>
            )}
         </div>
      </div>
   );
};

export default Header;
