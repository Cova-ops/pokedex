// types
import { Pokemon } from '../type'

// data
import { dicTypes } from '../../../data/typesPokemon'

// styles
import styles from './PokemonsList.module.css'

type Props = {
  pokemonList: Pokemon[]
}

const PokemonsList = ({ pokemonList }: Props) => {
  return (
    <>
      {
      pokemonList.map(pokemon => (
        <div key={pokemon.name} className={styles.card}>
          <img src={pokemon.image} alt='' className={styles.image} />
          <span className={styles.id}>N° {pokemon.id}</span>
          <span className={styles.name}>{pokemon.name}</span>
          <div className={styles.types}>
            {pokemon.types.map((type) => (
              <span key={type} style={{ backgroundColor: dicTypes[type] ?? '#FFFFFF' }}>{type}</span>
            ))}
          </div>

        </div>
      ))
    }
    </>
  )
}

export default PokemonsList
