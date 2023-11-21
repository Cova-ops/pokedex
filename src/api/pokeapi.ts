// utils
import axios from '../utils/axios'

// adapters
import { pokemonAdapter } from '../adapters/pokeapi.adapter'

// types
import type { PokemonType, DataAllPokemonsType } from '../types/pokeapi.types'

const LIMIT_REQUEST = 30

const fetchPokemonInfo = async (name: string): Promise<PokemonType> => {
  const { data: dataPokemon } = await axios.get(`/pokemon/${name}`)
  const { data: dataSpecies } = await axios.get(`/pokemon-species/${dataPokemon.id}`)
  const { data: dataEvolutions } = await axios.get(dataSpecies.evolution_chain.url)
  return pokemonAdapter(dataPokemon, dataEvolutions, dataSpecies)
}

export const fetchPokemons = async (offset: number): Promise<{ pokemons: PokemonType[], nextCursor: number }> => {
  const response = await axios.get(`/pokemon?limit=${LIMIT_REQUEST}&offset=${offset}`)
  const { data: { results } }: { data: DataAllPokemonsType } = response

  const promisePokemons: Promise<PokemonType>[] = []

  for (const pokemon of results) promisePokemons.push(fetchPokemonInfo(pokemon.name))
  const pokemons: PokemonType[] = await Promise.all(promisePokemons)

  return {
    pokemons,
    nextCursor: offset + LIMIT_REQUEST
  }
}
