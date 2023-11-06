import axios from 'axios'

// types
import { Pokemon } from '../pages/Main/type'

const URL_EVOLUTION = 'https://pokeapi.co/api/v2/evolution-chain/'
const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'

const LIMIT_REQUEST = 30

const fetchPokemonInfo = async (name: string): Promise<Pokemon> => {
  const { data: dataPokemon } = await axios.get(`${URL_POKEMON}${name}`)

  const { id } = dataPokemon
  const { data: dataEvolutions } = await axios.get(`${URL_EVOLUTION}${id}`)

  // get chain evolutions
  const evolutions = [{ name, minLevel: 0 }]
  let newEvolution = dataEvolutions.chain.evolves_to[0]
  while (newEvolution) {
    const { species: { name: nameEvolution }, evolution_details: [{ min_level: minLevel }] } = newEvolution
    evolutions.push({ name: nameEvolution, minLevel })
    newEvolution = newEvolution.evolves_to[0]
  }

  return {
    image: dataPokemon.sprites.front_default,
    animated: dataPokemon.sprites.versions['generation-v']['black-white'].animated.front_default,
    height: dataPokemon.height,
    weight: dataPokemon.weight,
    types: dataPokemon.types.map(({ type: { name } }: {type: {name: string}}) => name),
    stats: dataPokemon.stats.map(({ base_stat: baseStat, stat: { name } }: {base_stat: number, stat: {name: string}}) => ({ baseStat, name })),
    evolutions,
    name,
    id
  }
}

export const fetchPokemons = async (offset: number): Promise<{pokemons: Pokemon[], nextCursor: number}> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT_REQUEST}&offset=${offset}`)
  const { data: { results } } = response

  const promisePokemons: Promise<Pokemon>[] = []
  for (const pokemon of results) {
    const { name } = pokemon
    promisePokemons.push(fetchPokemonInfo(name))
  }

  const pokemons: Pokemon[] = await Promise.all(promisePokemons)

  console.log({ pokemons })

  return {
    pokemons,
    nextCursor: offset + LIMIT_REQUEST
  }
}
