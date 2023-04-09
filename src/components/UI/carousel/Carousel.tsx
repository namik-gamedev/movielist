import React, { FC, useEffect, useState } from 'react'
import styles from './Carousel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import Dots from '../dots/Dots'

interface CarouselProps {
   itemWidthPx: number
   itemHeightPx?: number
   itemsCount: number
   pageLength: number
   children: React.ReactNode
   itemsGap?: number
   className?: string
}

const Carousel: FC<CarouselProps> = ({
   itemsCount,
   pageLength,
   children,
   itemWidthPx,
   itemHeightPx,
   itemsGap = 0,
   className,
}) => {
   const [activeItem, setActiveItem] = useState<number>(0)
   const pagesCount: number = itemsCount - pageLength + 1

   const prevActive = () => {
      if (activeItem === 0) {
         setActiveItem(itemsCount - pageLength)
      } else {
         setActiveItem(activeItem - 1)
      }
   }

   const nextActive = () => {
      if (activeItem === itemsCount - pageLength) {
         setActiveItem(0)
      } else {
         setActiveItem(activeItem + 1)
      }
   }

   if (pagesCount <= 0) {
      return null
   }

   return (
      <div
         className={classNames(className, styles.carousel)}
         style={{
            width: `${(itemWidthPx + itemsGap) * Math.min(pageLength, itemsCount)}px`,
            height: `${itemHeightPx}px`,
         }}
      >
         <div className={styles.carousel__track}>
            <div
               className={styles.carousel__content}
               style={{
                  transform: `translateX(${activeItem * (-itemWidthPx! - itemsGap)}px)`,
                  gap: `${itemsGap}px`,
               }}
            >
               {React.Children.map(children, (child) => {
                  return (
                     <div
                        style={{
                           minWidth: `${itemWidthPx}px`,
                           minHeight: `${itemHeightPx}px`,
                        }}
                        className={styles.carousel__item}
                     >
                        {child}
                     </div>
                  )
               })}
            </div>
         </div>

         <div className={styles.carousel__bottom}>
            {/* prev */}
            <button
               onClick={prevActive}
               className={classNames(styles.carousel__btn, styles.carousel__btn_prev)}
            >
               <FontAwesomeIcon size='2x' icon={faCaretLeft} />
            </button>
            {/* dots */}
            <Dots dotsAmount={pagesCount} active={activeItem} setActive={setActiveItem} />
            {/* next */}
            <button
               onClick={nextActive}
               className={classNames(styles.carousel__btn, styles.carousel__btn_next)}
            >
               <FontAwesomeIcon size='2x' icon={faCaretRight} />
            </button>
         </div>
      </div>
   )
}

export default Carousel
