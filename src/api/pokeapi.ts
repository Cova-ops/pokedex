// utils
import axios from '../utils/axios'

// adapters
import { fullInfoPokemonAdapter, basicPokemonInfoAdapter } from '../adapters/pokeapi.adapter'

// types
import type { PokemonType, FullInfoPokemonType, BasicInfoPokemonType, DataAllPokemonsType } from '../types/pokeapi.types'

// const LIMIT_REQUEST = 30

export const fetchFullPokemonInfo = async (urlSpecies: string): Promise<FullInfoPokemonType> => {
  const { data: dataSpecies } = await axios.get(urlSpecies)
  const { data: dataEvolutions } = await axios.get(dataSpecies.evolution_chain.url)
  return fullInfoPokemonAdapter(dataEvolutions, dataSpecies)
}

const fetchBasicPokemonInfo = async (name: string): Promise<BasicInfoPokemonType> => {
  const { data: dataPokemon } = await axios.get(`/pokemon/${name}`)

  return basicPokemonInfoAdapter(dataPokemon)
}

export const fetchPokemons = async (): Promise<PokemonType[]> => {
  const response = await axios.get('/pokemon?limit=1000&offset=0')
  const { data: { results } }: { data: DataAllPokemonsType } = response

  const promisePokemons: Promise<PokemonType>[] = []

  for (const pokemon of results) promisePokemons.push(fetchBasicPokemonInfo(pokemon.name))
  const pokemons: PokemonType[] = await Promise.all(promisePokemons)

  return pokemons
}
