import {describe, it, expect} from 'vitest'
import { getPokemonsHandler } from './index'
import { inMemoryPokemonsGateway } from '../../../adapters/secondary/pokemons/in-memory-pokemons.gateway'

describe('getPokemonsHandler', () => {
  it('should return the pokemons', async () => {
    // given & when
    const pokemons = await getPokemonsHandler(inMemoryPokemonsGateway({ feedWithPokemons: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }] }))

    // then
    expect(pokemons).toEqual([{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }])
  })
})
