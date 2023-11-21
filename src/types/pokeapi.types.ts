type typePokemonType = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy'

type typeStatPokemonType = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed' | 'total'

export type PokemonType = {
  image: string,
  animated: string,
  height: number,
  weight: number,
  id: number,
  types: typePokemonType[],
  stats: { baseStat: number, name: typeStatPokemonType }[],
  evolutions: { name: string, minLevel: number, id: number, image: string }[],
  name: string
  description: string
  abilities: string[]
}

export type DataAllPokemonsType = {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}

export type DataPokemonType = {
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  base_experience: number
  forms: Array<{
    name: string
    url: string
  }>
  game_indices: Array<{
    game_index: number
    version: {
      name: string
      url: string
    }
  }>
  height: number
  held_items: Array<object>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<{
    move: {
      name: string
      url: string
    }
    version_group_details: Array<{
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      version_group: {
        name: string
        url: string
      }
    }>
  }>
  name: string
  order: number
  past_abilities: Array<object>
  past_types: Array<object>
  species: {
    name: string
    url: string
  }
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
    other: {
      dream_world: {
        front_default: string
        front_female: string
      }
      home: {
        front_default: string
        front_female: string
        front_shiny: string
        front_shiny_female: string
      }
      'official-artwork': {
        front_default: string
        front_shiny: string
      }
    }
    versions: {
      'generation-i': {
        'red-blue': {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
        yellow: {
          back_default: string
          back_gray: string
          back_transparent: string
          front_default: string
          front_gray: string
          front_transparent: string
        }
      }
      'generation-ii': {
        crystal: {
          back_default: string
          back_shiny: string
          back_shiny_transparent: string
          back_transparent: string
          front_default: string
          front_shiny: string
          front_shiny_transparent: string
          front_transparent: string
        }
        gold: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
        silver: {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
          front_transparent: string
        }
      }
      'generation-iii': {
        emerald: {
          front_default: string
          front_shiny: string
        }
        'firered-leafgreen': {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
        'ruby-sapphire': {
          back_default: string
          back_shiny: string
          front_default: string
          front_shiny: string
        }
      }
      'generation-iv': {
        'diamond-pearl': {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        'heartgold-soulsilver': {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        platinum: {
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string
            back_female: string
            back_shiny: string
            back_shiny_female: string
            front_default: string
            front_female: string
            front_shiny: string
            front_shiny_female: string
          }
          back_default: string
          back_female: string
          back_shiny: string
          back_shiny_female: string
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
        'x-y': {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      'generation-vii': {
        icons: {
          front_default: string
          front_female: string
        }
        'ultra-sun-ultra-moon': {
          front_default: string
          front_female: string
          front_shiny: string
          front_shiny_female: string
        }
      }
      'generation-viii': {
        icons: {
          front_default: string
          front_female: string
        }
      }
    }
  }
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: typeStatPokemonType
      url: string
    }
  }>
  types: Array<{
    slot: number
    type: {
      name: typePokemonType
      url: string
    }
  }>
  weight: number
}

type evolvesToType = {
  evolution_details: Array<{
    gender: string
    held_item: string
    item: string
    known_move: string
    known_move_type: string
    location: string
    min_affection: string
    min_beauty: string
    min_happiness: string
    min_level: number
    needs_overworld_rain: boolean
    party_species: string
    party_type: string
    relative_physical_stats: string
    time_of_day: string
    trade_species: string
    trigger: {
      name: string
      url: string
    }
    turn_upside_down: boolean
  }>
  evolves_to: Array<evolvesToType>
  is_baby: boolean
  species: {
    name: string
    url: string
  }
}

export type DataEvolutionType = {
  baby_trigger_item: string
  chain: {
    evolution_details: Array<object>
    evolves_to: Array<{
      evolution_details: Array<{
        gender: string
        held_item: string
        item: string
        known_move: string
        known_move_type: string
        location: string
        min_affection: string
        min_beauty: string
        min_happiness: string
        min_level: number
        needs_overworld_rain: boolean
        party_species: string
        party_type: string
        relative_physical_stats: string
        time_of_day: string
        trade_species: string
        trigger: {
          name: string
          url: string
        }
        turn_upside_down: boolean
      }>
      evolves_to: Array<evolvesToType>
      is_baby: boolean
      species: {
        name: string
        url: string
      }
    }>
    is_baby: boolean
    species: {
      name: string
      url: string
    }
  }
  id: number
}

export type DataSpeciesType = {
  base_happiness: number
  capture_rate: number
  color: {
    name: string
    url: string
  }
  egg_groups: Array<{
    name: string
    url: string
  }>
  evolution_chain: {
    url: string
  }
  evolves_from_species: null
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version: {
      name: string
      url: string
    }
  }>
  form_descriptions: Array<object>
  forms_switchable: boolean
  gender_rate: number
  genera: Array<{
    genus: string
    language: {
      name: string
      url: string
    }
  }>
  generation: {
    name: string
    url: string
  }
  growth_rate: {
    name: string
    url: string
  }
  habitat: {
    name: string
    url: string
  }
  has_gender_differences: boolean
  hatch_counter: number
  id: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  order: number
  pal_park_encounters: Array<{
    area: {
      name: string
      url: string
    }
    base_score: number
    rate: number
  }>
  pokedex_numbers: Array<{
    entry_number: number
    pokedex: {
      name: string
      url: string
    }
  }>
  shape: {
    name: string
    url: string
  }
  varieties: Array<{
    is_default: boolean
    pokemon: {
      name: string
      url: string
    }
  }>
}
