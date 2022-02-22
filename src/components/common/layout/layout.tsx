/* eslint-disable @next/next/no-sync-scripts */
import styles from './layout.module.scss';


export default function Layout({ children, ...props }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}