import React, { FC } from 'react'
import HomepageContent from '../../components/homepageContent/HomepageContent'
import styles from './Homepage.module.css'

const Homepage: FC = () => {
   return (
      <div className={styles.homepage}>
         <HomepageContent />
      </div>
   )
}

export default Homepage
