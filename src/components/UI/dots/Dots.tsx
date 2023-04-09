import classNames from 'classnames'
import React, { FC, useEffect, useState } from 'react'
import styles from './Dots.module.css'

interface DotsProps {
   dotsAmount: number
   active: number
   setActive: (active: number) => void
}

const Dots: FC<DotsProps> = ({ dotsAmount, active, setActive }) => {
   const [dots, setDots] = useState<number[]>([...Array(dotsAmount).keys()])

   return (
      <div className={styles.dots}>
         {dots.map((dot: number, index: number) => {
            return (
               <div
                  key={index}
                  className={classNames(
                     styles.dots__dot,
                     active === index && styles.dots__dot_active
                  )}
                  onClick={() => setActive(index)}
               ></div>
            )
         })}
      </div>
   )
}

export default Dots
