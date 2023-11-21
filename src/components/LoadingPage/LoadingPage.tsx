// assets
import PokeBall from '../../assets/pokeball-icon.png'

// styles
import styles from './LoadingPage.module.css'

type Props = {
  isMounted: boolean
}

const Loading = ({ isMounted }: Props) => {
  return (
    <div className={isMounted ? styles.animate__exit : styles.animate__exit__active}>
      <img className={styles.loading__pokeball} src={PokeBall} alt='' />
    </div>
  )
}

export default Loading
