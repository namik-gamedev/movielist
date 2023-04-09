import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useState } from 'react'
import Button from '../button/Button'
import styles from './Dropdown.module.css'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

interface DropdownProps {
   title: string
   children?: React.ReactNode
}

const Dropdown: FC<DropdownProps> = ({ title, children }) => {
   const [isDropped, setIsDropped] = useState<boolean>(false)

   return (
      <div className={styles.dropdown}>
         <header className={styles.dropdown__header}>
            <h3 className={styles.dropdown__title}>{title}</h3>
            <Button
               onClick={() => setIsDropped((prev) => !prev)}
               className={styles.dropdown__btn}
            >
               <FontAwesomeIcon icon={isDropped ? faCaretDown : faCaretUp} />
            </Button>
         </header>
         {isDropped && <div className={styles.dropdown__content}>{children}</div>}
      </div>
   )
}

export default Dropdown
