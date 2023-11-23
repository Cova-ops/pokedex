import { useEffect, useRef, useState } from 'react'

// types
import type { PokemonType } from '../../../types/pokeapi.types'

// data
import { dicTypes } from '../../../data/typesPokemon'

// styles
import styles from './PokemonsList.module.css'

// ----------------------------------------------

type Props = {
  pokemonList: PokemonType[],
  setCurrentPokemon: (pokemon: PokemonType) => void
}

const PokemonsList = ({ pokemonList, setCurrentPokemon }: Props) => {
  const [maxPokemons, setMaxPokemons] = useState(30)
  const refListPokemons = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const currentRef = refListPokemons.current
    if (!currentRef) return

    const handleScroll = () => {
      if (!currentRef) return
      if (currentRef.clientHeight + currentRef.scrollTop + 600 >= currentRef.scrollHeight) {
        setMaxPokemons(prev => prev + 30)
      }
    }

    currentRef.addEventListener('scroll', handleScroll)
    return () => currentRef.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className={styles.pokemon__list} ref={refListPokemons}>
      {
      pokemonList.slice(0, maxPokemons).map(pokemon => (
        <div key={pokemon.name} className={styles.card} onClick={() => setCurrentPokemon(pokemon)}>
          <img src={pokemon.image} alt='' className={styles.image} />
          <h4 className={styles.id}>N° {pokemon.id}</h4>
          <h2 className={styles.name}>{pokemon.name}</h2>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <span key={type} style={{ backgroundColor: dicTypes[type] ?? '#FFFFFF' }}>{type}</span>
            ))}
          </div>
        </div>
      ))
    }
    </section>
  )
}

export default PokemonsList
