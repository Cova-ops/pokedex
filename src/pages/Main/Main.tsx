import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

// components
import { Page, Browser, LoadingPage } from '../../components'
import PokemonsList from './components/PokemonsList'
import CurrentPokemonInfo from './components/CurrentPokemonInfo'

// api
import { fetchPokemons } from '../../api'

// assets
import PokeBall from '../../assets/pokeball-icon.png'

// hooks
import useDelayUnmount from '../../hooks/DelayUnmount'

// types
import type { PokemonType } from '../../types/pokeapi.types'

// styles
import styles from './Main.module.css'

// ----------------------------------------------

const Main = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{nextCursor: number, pokemons: PokemonType[] }>(
    {
      queryKey: ['pokemons'],
      queryFn: ({ pageParam = 0 }) => fetchPokemons(pageParam as number),
      initialPageParam: 0,
      getNextPageParam: (lastPage: {nextCursor: number, pokemons: PokemonType[] }): number => lastPage.nextCursor
    }
  )
  const shouldRenderLoadingPage = useDelayUnmount(isLoading, 400)
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType | null>(null)

  const pokemons: PokemonType[] = data?.pages.flatMap(page => page.pokemons) ?? []

  return (
    <Page title='PokeDex' className={styles.container}>
      {shouldRenderLoadingPage || isError ? <LoadingPage isMounted={isLoading} /> : null}

      <img className={styles.pokeball__background} src={PokeBall} alt='' />
      <header>
        <Browser />
      </header>

      <main>
        {!isLoading && pokemons.length > 0 && <PokemonsList pokemonList={pokemons} setCurrentPokemon={setCurrentPokemon} />}
        <CurrentPokemonInfo currentPokemon={currentPokemon} />
      </main>
    </Page>
  )
}

export default Main
