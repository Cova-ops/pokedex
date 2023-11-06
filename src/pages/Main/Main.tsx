import { useInfiniteQuery } from '@tanstack/react-query'

// components
import { Page, Browser } from '../../components'
import PokemonsList from './components/PokemonsList'

// api
import { fetchPokemons } from '../../api'

// assets
import PokeBall from '../../assets/pokeball-icon.png'

// types
import { Pokemon } from './type'

// styles
import styles from './Main.module.css'

const Main = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{nextCursor: number, pokemons: Pokemon[] }>(
    {
      queryKey: ['pokemons'],
      queryFn: ({ pageParam = 0 }) => fetchPokemons(pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage: {nextCursor: number, pokemons: Pokemon[] }): number => lastPage.nextCursor
    }
  )

  const pokemons: Pokemon[] = data?.pages.flatMap(page => page.pokemons) ?? []

  return (
    <Page title='PokeDex' className={styles.container}>
      <img className={styles.pokeball__background} src={PokeBall} alt='' />
      <header>
        <Browser />
      </header>

      <main>
        {pokemons.length > 0 && <PokemonsList pokemonList={pokemons} />}
      </main>
    </Page>
  )
}

Main.propTypes = {}

export default Main
