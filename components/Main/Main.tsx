import { ReactNode } from 'react'
import styles from './main.module.scss'

interface MainProps {
  children: ReactNode
  className?: string
}

export const Main = ({ children, className = '' }: MainProps) => {
  return <main className={`${styles.main} ${className}`}>{children}</main>
}

