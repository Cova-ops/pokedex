import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IoCloseSharp } from 'react-icons/io5'

// api
import { fetchFullPokemonInfo } from '../../../api'

// hooks
import useDelayMount from '../../../hooks/useDelayMount'

// data
import { dicTypes } from '../../../data/typesPokemon'
import { statsPokemon } from '../../../data/statsPokemon'

// types
import { FullInfoPokemonType, PokemonType } from '../../../types/pokeapi.types'

// styles
import styles from './CurrentPokemonInfoFull.module.css'

// ----------------------------------------------

type Props = {
  currentPokemon: PokemonType | null
  setCurrentPokemon: (pokemon: PokemonType | null) => void
}

const CurrentPokemonInfoFull = ({ currentPokemon, setCurrentPokemon }: Props) => {
  const { data: fullInfoPokemon, isLoading, isError } = useQuery<FullInfoPokemonType | null>({
    queryKey: ['pokemons', currentPokemon?.id],
    queryFn: () => currentPokemon && fetchFullPokemonInfo(currentPokemon?.speciesUrl)
  })
  const [shouldUnmountAnimation, setShouldUnmountAnimation] = useState(false)
  const shouldMountAnimation = useDelayMount(!!currentPokemon && !!fullInfoPokemon, 100)

  const handleClose = () => {
    setShouldUnmountAnimation(true)
    setTimeout(() => {
      setCurrentPokemon(null)
      setShouldUnmountAnimation(false)
    }, 400)
  }

  if (!currentPokemon || isLoading || isError || !fullInfoPokemon) return null

  return (
    <div
      className={`${styles.container} ${shouldMountAnimation ? styles.animate__enter : ''} ${shouldUnmountAnimation ? styles.animate__exit : ''}`}
      style={{ backgroundColor: dicTypes[currentPokemon.types[0]] ?? dicTypes.unknown }}
    >
      <IoCloseSharp onClick={handleClose} className={styles.close__button} />

      <div className={styles.container__info}>
        <div className={styles.container__img}>
          <img className={styles.img__pokemon} src={currentPokemon.animated} alt='' />
        </div>

        <h4 className={styles.id}>N° {currentPokemon.id}</h4>
        <h1 className={styles.name}>{currentPokemon.name}</h1>

        <div className={styles.types}>
          {currentPokemon.types.map((type) => (
            <span key={type} style={{ backgroundColor: dicTypes[type] ?? '#FFFFFF' }}>{type}</span>
          ))}
        </div>

        <h2 className={styles.h2__title}>Pokemon Entry</h2>
        <p className={styles.description}>{fullInfoPokemon.description}</p>

        <div className={styles.body__description}>
          <div className={styles.height}>
            <h2 className={styles.h2__title}>Height</h2>
            <span className={styles.span__answer}>{currentPokemon.height} m</span>
          </div>
          <div className={styles.weight}>
            <h2 className={styles.h2__title}>Weight</h2>
            <span className={styles.span__answer}>{currentPokemon.weight} kg</span>
          </div>
        </div>

        <h2 className={styles.h2__title}>Abilities</h2>
        <div className={styles.abilities}>
          {currentPokemon.abilities.map((ability, idx) => (
            <span key={`${ability}_${idx}`} className={styles.span__answer}>{ability}</span>
          ))}
        </div>

        <h2 className={styles.h2__title}>Stats</h2>
        <div className={styles.stats}>
          {currentPokemon.stats.map((stat) => (
            <div key={stat.name} className={styles.stat} style={{ backgroundColor: statsPokemon[stat.name].backgroundColor }}>
              <h3 style={{ backgroundColor: statsPokemon[stat.name].color }}>{statsPokemon[stat.name].abbreviation}</h3>
              <span className={styles.stat__indicator}>{stat.baseStat}</span>
            </div>
          ))}
        </div>

        <h2 className={styles.h2__title}>Evolution</h2>
        <div className={styles.evolution}>
          {fullInfoPokemon.evolutions?.[0] && <img src={fullInfoPokemon.evolutions?.[0].image} alt='' />}
          {fullInfoPokemon.evolutions?.[1] && fullInfoPokemon.evolutions?.[1].minLevel && <span>Lv. {fullInfoPokemon.evolutions?.[1].minLevel}</span>}
          {fullInfoPokemon.evolutions?.[1] && !fullInfoPokemon.evolutions?.[1].minLevel && <span>?</span>}
          {fullInfoPokemon.evolutions?.[1] && <img src={fullInfoPokemon.evolutions?.[1].image} alt='' />}
          {fullInfoPokemon.evolutions?.[2] && fullInfoPokemon.evolutions?.[2].minLevel && <span>Lv. {fullInfoPokemon.evolutions?.[2].minLevel}</span>}
          {fullInfoPokemon.evolutions?.[2] && !fullInfoPokemon.evolutions?.[2].minLevel && <span>?</span>}
          {fullInfoPokemon.evolutions?.[2] && <img src={fullInfoPokemon.evolutions?.[2].image} alt='' />}
        </div>
      </div>
    </div>
  )
}

export default CurrentPokemonInfoFull
