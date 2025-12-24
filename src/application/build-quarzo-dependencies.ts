import type { QuarzoDependencies } from "../core/quarzo.dependencies";
import type { QueryClient } from "@tanstack/react-query";
import { getPokemonsGateway } from "../adapters/secondary/pokemons/get-pokemons.gateway";
import { inMemoryPokemonsGateway } from "../adapters/secondary/pokemons/in-memory-pokemons.gateway";
import { createReactQueryStateManager } from "../adapters/secondary/ui-state/react-query-state-manager.adapter";
import { createPokemonGateway } from "../adapters/secondary/pokemons/create-pokemons.gateway";
import { inMemoryCreatePokemonGateway } from "../adapters/secondary/pokemons/in-memory-create-pokemons.gateway";

export const buildQuarzoDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  getPokemonsGateway: getPokemonsGateway(),
  stateManager: createReactQueryStateManager(queryClient),
  createPokemonGateway: createPokemonGateway(),
});

export const buildInMemoryDependencies = (
  queryClient: QueryClient
): QuarzoDependencies => ({
  getPokemonsGateway: inMemoryPokemonsGateway({
    feedWithPokemons: [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    ],
  }),
  stateManager: createReactQueryStateManager(queryClient),
  createPokemonGateway: inMemoryCreatePokemonGateway({}),
});
