import { FiSearch } from 'react-icons/fi'

// styles
import styles from './Browser.module.css'

// ----------------------------------------------------------------------

type Props = {
  setValue: (value: string | null) => void
}

const Browser = ({ setValue }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.length > 0 ? e.target.value : null)
  }

  return (
    <div className={styles.browser}>
      <input className={styles.browser__input} type='text' placeholder='Search your Pokemon' onChange={handleChange} />
      <FiSearch />
    </div>
  )
}

export default Browser
