import React, { FC } from 'react'
import Header from '../components/header/Header'
import DarkThemeCheckbox from '../components/UI/DarkThemeCheckbox/DarkThemeCheckbox'
import styles from './Layout.module.css'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
   children?: React.ReactNode
}

// TODO: add footer to layout and his styles
const Layout: FC<LayoutProps> = ({ children }) => {
   const location = useLocation()

   return (
      <div className={styles.layout}>
         <Header />
         <div className={styles.layout__content}>{children}</div>
         <DarkThemeCheckbox />
      </div>
   )
}

export default Layout
