import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FC } from 'react'
import { DOTS, usePagination } from '../../../hooks/usePagination'
import Dots from '../dots/Dots'
import styles from './Pagination.module.css'

interface PaginationProps {
   totalCount: number
   className?: string
   activePage: number
   setActivePage: (active: number) => void
   pageSize?: number
   siblingCount?: number
}

const Pagination: FC<PaginationProps> = ({
   totalCount,
   className,
   activePage,
   setActivePage,
   pageSize = 5,
   siblingCount = 2,
}) => {
   const pagination: number[] = usePagination({
      totalCount,
      pageSize,
      currentPage: activePage,
      siblingCount,
   })

   if (activePage === 0 || pagination.length < 2) {
      return null
   }

   const nextPage = () => {
      setActivePage(activePage + 1)
   }
   const prevPage = () => {
      setActivePage(activePage - 1)
   }

   return (
      <div className={classNames(className, styles.pagination)}>
         <button
            onClick={prevPage}
            className={classNames(
               styles.pagination__link,
               styles.pagination__btn,
               styles.pagination__btn_prev
            )}
         >
            <FontAwesomeIcon size='lg' icon={faCaretLeft} />
         </button>
         {pagination.map((page: number, index: number) => {
            if (page === DOTS) {
               return (
                  <div key={index} className={styles.pagination__dots}>
                     &#8230;
                  </div>
               )
            }
            return (
               <div
                  onClick={() => setActivePage(page)}
                  className={classNames(
                     styles.pagination__link,
                     page === activePage && styles.pagination__link_active
                  )}
               >
                  {page}
               </div>
            )
         })}
         <button
            onClick={nextPage}
            className={classNames(
               styles.pagination__link,
               styles.pagination__btn,
               styles.pagination__btn_next
            )}
         >
            <FontAwesomeIcon size='lg' icon={faCaretRight} />
         </button>
      </div>
   )
}

export default Pagination
