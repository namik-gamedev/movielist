import React, { FC } from 'react'
import { IPerson } from '../../types'
import styles from './PersonThumbnail.module.css'

interface PersonThumbnailProps {
   person: IPerson
}

const PersonThumbnail: FC<PersonThumbnailProps> = ({ person }) => {
   return (
      <div className={styles.thumbnail}>
         <div className={styles.thumbnail__content}>
            <img
               className={styles.thumbnail__photo}
               src={person.photo}
               alt={person.name || person.enName}
            />

            <div className={styles.personInfo}>
               <div className={styles.personInfo__name}>{person.name || person.enName}</div>
               <div className={styles.personInfo__profession}>{person.profession}</div>
            </div>
         </div>
      </div>
   )
}

export default PersonThumbnail
