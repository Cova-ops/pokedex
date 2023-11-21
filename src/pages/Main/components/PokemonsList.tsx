// types
import type { PokemonType } from '../../../types/pokeapi.types'

// data
import { dicTypes } from '../../../data/typesPokemon'

// styles
import styles from './PokemonsList.module.css'

type Props = {
  pokemonList: PokemonType[],
  setCurrentPokemon: (pokemon: PokemonType) => void
}

const PokemonsList = ({ pokemonList, setCurrentPokemon }: Props) => {
  return (
    <section className={styles.pokemon__list}>
      {
      pokemonList.map(pokemon => (
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
