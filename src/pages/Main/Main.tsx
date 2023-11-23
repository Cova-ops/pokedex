import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// components
import { Page, Browser, LoadingPage } from '../../components'
import PokemonsList from './components/PokemonsList'
import CurrentPokemonInfoSide from './components/CurrentPokemonInfoSide'
import CurrentPokemonInfoFull from './components/CurrentPokemonInfoFull'

// api
import { fetchPokemons } from '../../api'

// assets
import PokeBall from '../../assets/pokeball-icon.png'

// hooks
import useDelayUnmount from '../../hooks/useDelayUnmount'
import useResponsive from '../../hooks/useResponsive'

// types
import type { PokemonType } from '../../types/pokeapi.types'

// styles
import styles from './Main.module.css'

// ----------------------------------------------

const Main = () => {
  const { isLoading, isError, data } = useQuery<PokemonType[]>(
    {
      queryKey: ['pokemons'],
      queryFn: () => fetchPokemons()
    }
  )
  const [filterName, setFilterName] = useState<string | null>(null)
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType | null>(null)
  const shouldRenderLoadingPage = useDelayUnmount(isLoading, 400)
  const { getSize } = useResponsive()
  const downLg = getSize('down', { start: 'lg' })

  const pokemons: PokemonType[] =
    filterName
      ? data?.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())) || []
      : data || []

  return (
    <Page title='PokeDex' className={styles.container}>
      {shouldRenderLoadingPage || isError ? <LoadingPage isMounted={isLoading} /> : null}

      <img className={styles.pokeball__background} src={PokeBall} alt='' />
      <header>
        <Browser setValue={setFilterName} />
      </header>

      <main>
        {!isLoading && <PokemonsList pokemonList={pokemons} setCurrentPokemon={setCurrentPokemon} />}
        {
          !downLg
            ? <CurrentPokemonInfoSide currentPokemon={currentPokemon} />
            : <CurrentPokemonInfoFull currentPokemon={currentPokemon} setCurrentPokemon={setCurrentPokemon} />
        }
      </main>
    </Page>
  )
}

export default Main
