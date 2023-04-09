import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Button from '../UI/button/Button'
import Input from '../UI/input/Input'
import styles from './SearchForm.module.css'

const SearchForm: FC = () => {
   const navigate: NavigateFunction = useNavigate()
   const [searchQuery, setSearchQuery] = useState<string>('')

   const submitHandler = (e: React.FormEvent): void => {
      e.preventDefault()
      if (searchQuery !== '') {
         navigate(`/search-results/${searchQuery}`)
      }
      setSearchQuery('')
   }

   const changeHandler = (e: React.ChangeEvent): void => {
      const value: string = (e.target as HTMLInputElement).value
      setSearchQuery(value === ' ' ? '' : value)
   }

   return (
      <form onSubmit={submitHandler} className={styles.form}>
         <div className={styles.form__top}>
            <Input
               value={searchQuery}
               onChange={changeHandler}
               className={styles.form__input}
               placeholder='Поиск...'
            />
            <Button className={styles.form__btn} type='submit'>
               <FontAwesomeIcon icon={faSearch} />
            </Button>
         </div>
      </form>
   )
}

export default SearchForm
