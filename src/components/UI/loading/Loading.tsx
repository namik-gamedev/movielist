import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './Loading.module.css'

interface LoadingProps {
   className?: string
}

const Loading: FC<LoadingProps> = ({ className }) => {
   return (
      <div className={classNames(styles.loading, className)}>
         <div className={styles.block}></div>
         <div className={styles.block}></div>
         <div className={styles.block}></div>
         <div className={styles.block}></div>
      </div>
   )
}

export default Loading
