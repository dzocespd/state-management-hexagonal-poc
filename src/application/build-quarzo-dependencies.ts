import type { QuarzoDependencies } from "../core/quarzo.dependencies";
import { getPokemonsGateway } from "../adapters/secondary/pokemons/get-pokemons.gateway";
import { inMemoryPokemonsGateway } from "../adapters/secondary/pokemons/in-memory-pokemons.gateway";

export const buildQuarzoDependencies = (): QuarzoDependencies => ({
  getPokemonsGateway: getPokemonsGateway(),
});

export const buildInMemoryDependencies = (): QuarzoDependencies => ({
  getPokemonsGateway: inMemoryPokemonsGateway({
    feedWithPokemons: [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    ],
  }),
});
