import styles from './layout.module.scss';

export default function Layout({ children, ...props }: { 
  children: React.ReactNode
}) {
  return (
    <div {...props} className={styles.container}>
      {children}
    </div>
  )
}