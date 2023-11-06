type typePokemon = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy'

export type Pokemon = {
  image: string,
  animated: string,
  height: number,
  weight: number,
  id: number,
  types: typePokemon[],
  stats: { baseStat: number, name: string }[],
  evolutions: { name: string, minLevel: number }[],
  name: string
}
