import React, { useContext, FC } from 'react'
import styles from './DarkThemeCheckbox.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkTheme } from '../../../reducers/userReducer'

const DarkThemeCheckbox: FC = () => {
   const dispatch = useDispatch()
   const user = useSelector((state: any) => state.user.data)
   const dark = user.darkTheme

   return (
      <Button className={styles.checkbox} onClick={() => dispatch(toggleDarkTheme())}>
         <FontAwesomeIcon size='2x' icon={faMoon} />
      </Button>
   )
}

export default DarkThemeCheckbox
