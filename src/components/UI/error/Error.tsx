import React, { FC } from 'react'
import styles from './Error.module.css'
import Dropdown from '../dropdown/Dropdown'

interface ErrorProps {
   statusCode?: string | number
   name?: string
   description?: string
}

const Error: FC<ErrorProps> = ({ statusCode = '404', name = 'not found', description }) => {
   return (
      <div className={styles.error}>
         <img
            className={styles.error__img}
            src='../../../../public/Open Peeps - Bust.png'
            alt=''
         />
         <h2>
            <span className={styles.error__name}>{name} </span>
            <span className={styles.error__code}>{statusCode}</span>
         </h2>

         <div className={styles.error__description}>{description}</div>
      </div>
   )
}

export default Error
