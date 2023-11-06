import { FiSearch } from 'react-icons/fi'

// styles
import styles from './Browser.module.css'

// ----------------------------------------------------------------------

const Browser = () => {
  return (
    <div className={styles.browser}>
      <input className={styles.browser__input} type='text' placeholder='Search your Pokemon' />
      <FiSearch />
    </div>
  )
}

export default Browser
