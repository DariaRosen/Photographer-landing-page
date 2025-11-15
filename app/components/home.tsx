import styles from './home.module.scss'
import { Main } from '@/components/Main/Main'

export const Home = () => {
  return (
    <Main>
      <div className={styles.home}>
        <h1 className={styles.title}>Welcome to Photography</h1>
        <p className={styles.description}>
          Capturing moments that tell your story. Professional photography
          services for weddings, portraits, events, and commercial projects.
        </p>
      </div>
    </Main>
  )
}

