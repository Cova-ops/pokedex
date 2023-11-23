// types
import type { BasicInfoPokemonType, FullInfoPokemonType, DataEvolutionType, DataPokemonType, DataSpeciesType } from '../types/pokeapi.types'

// ---------------------------------------------

const getIdFromUrl = (url: string): number => Number(url.split('/').filter(Boolean).pop())

export const basicPokemonInfoAdapter = (dataPokemon: DataPokemonType): BasicInfoPokemonType => {
  let animated = ''
  if (dataPokemon.id >= 650) animated = dataPokemon.sprites.front_default
  else animated = dataPokemon.sprites.versions['generation-v']['black-white'].animated.front_default

  const stats = [...dataPokemon.stats.map(({ base_stat: baseStat, stat: { name } }) => ({ baseStat, name }))]
  stats.push({ baseStat: stats.reduce((acc, { baseStat }) => acc + baseStat, 0), name: 'total' })

  return {
    image: dataPokemon.sprites.front_default,
    animated,
    speciesUrl: dataPokemon.species.url,
    height: dataPokemon.height / 10,
    weight: dataPokemon.weight / 10,
    types: dataPokemon.types.map(({ type }) => type.name),
    stats,
    abilities: dataPokemon.abilities.map(({ ability: { name } }) => name.split('-').join(' ')).slice(0, 2),
    name: dataPokemon.name.replace(/-/g, ' '),
    id: dataPokemon.id
  }
}

export const fullInfoPokemonAdapter = (dataEvolutions: DataEvolutionType, dataSpecies: DataSpeciesType): FullInfoPokemonType => {
  // get chain evolutions
  const evolutions = [{ name: dataEvolutions.chain.species.name, minLevel: 0, id: dataEvolutions.id, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(dataEvolutions.chain.species.url)}.png` }]
  let newEvolution = dataEvolutions.chain.evolves_to[0]

  while (newEvolution) {
    const { species: { name: nameEvolution, url }, evolution_details: [{ min_level: minLevel }] } = newEvolution

    evolutions.push({ name: nameEvolution, minLevel, id: Number(url.split('/')[6]), image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(url)}.png` })
    newEvolution = newEvolution.evolves_to[0]
  }

  let description = ''
  for (const desc of dataSpecies.flavor_text_entries) {
    if (desc.language.name === 'en') {
      description = desc.flavor_text.toLocaleLowerCase()
      break
    }
  }

  return {
    evolutions,
    description
  }
}
