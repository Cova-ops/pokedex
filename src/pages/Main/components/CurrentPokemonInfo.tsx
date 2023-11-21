// assets
import NoPokemon from '../../../assets/no-pokemon-selected-image.png'

// types
import { PokemonType } from '../../../types/pokeapi.types'
import { dicTypes } from '../../../data/typesPokemon'
import { statsPokemon } from '../../../data/statsPokemon'

// styles
import styles from './CurrentPokemonInfo.module.css'

type Props = {
  currentPokemon: PokemonType | null
}

const CurrentPokemonInfo = ({ currentPokemon }: Props) => {
  if (!currentPokemon) {
    return (
      <section className={styles.current__pokemon__info}>
        <img className={styles.img__no__pokemon} src={NoPokemon} alt='' />
        <p className={styles.no__pokemon}>Select a Pokemon to display here</p>
      </section>
    )
  }

  return (
    <section className={styles.current__pokemon__info}>

      <div className={styles.container__img}>
        <img className={styles.img__pokemon} src={currentPokemon.animated} alt='' />
      </div>
      <h4>N° {currentPokemon.id}</h4>
      <h1>{currentPokemon.name}</h1>

      <div className={styles.types}>
        {currentPokemon.types.map((type) => (
          <span key={type} style={{ backgroundColor: dicTypes[type] ?? '#FFFFFF' }}>{type}</span>
        ))}
      </div>

      <h2>Pokemon Entry</h2>
      <p>{currentPokemon.description}</p>

      <div className={styles.body__description}>
        <div className={styles.height}>
          <h2>Height</h2>
          <span className={styles.span__answer}>{currentPokemon.height} m</span>
        </div>
        <div className={styles.weight}>
          <h2>Weight</h2>
          <span className={styles.span__answer}>{currentPokemon.weight} kg</span>
        </div>
      </div>

      <h2>Abilities</h2>
      <div className={styles.abilities}>
        {currentPokemon.abilities.map((ability) => (
          <span key={ability} className={styles.span__answer}>{ability}</span>
        ))}
      </div>

      <h2>Stats</h2>
      <div className={styles.stats}>
        {currentPokemon.stats.map((stat) => (
          <div key={stat.name} className={styles.stat} style={{ backgroundColor: statsPokemon[stat.name].backgroundColor }}>
            <h3 style={{ backgroundColor: statsPokemon[stat.name].color }}>{statsPokemon[stat.name].abbreviation}</h3>
            <span className={styles.stat__indicator}>{stat.baseStat}</span>
          </div>
        ))}
      </div>
      <h2>Evolution</h2>
      <div className={styles.evolution}>
        {currentPokemon.evolutions[0] && <img src={currentPokemon.evolutions[0].image} alt='' />}
        {currentPokemon.evolutions[1] && currentPokemon.evolutions[1].minLevel && <span>Lv. {currentPokemon.evolutions[1].minLevel}</span>}
        {currentPokemon.evolutions[1] && !currentPokemon.evolutions[1].minLevel && <span>?</span>}
        {currentPokemon.evolutions[1] && <img src={currentPokemon.evolutions[1].image} alt='' />}
        {currentPokemon.evolutions[2] && currentPokemon.evolutions[2].minLevel && <span>Lv. {currentPokemon.evolutions[2].minLevel}</span>}
        {currentPokemon.evolutions[2] && !currentPokemon.evolutions[2].minLevel && <span>?</span>}
        {currentPokemon.evolutions[2] && <img src={currentPokemon.evolutions[2].image} alt='' />}
      </div>
      {/* TODO: Falto hacer que la imagen viniera */}
    </section>
  )
}

export default CurrentPokemonInfo
