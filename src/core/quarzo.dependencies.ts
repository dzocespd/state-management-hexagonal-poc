import type { CreatePokemonGatewayPort } from "./ports/create-pokemon.gateway.port";
import type { GetPokemonsGatewayPort } from "./ports/get-pokemons.gateway.port";
import type { StateManagerPort } from "./ports/state-manager.port";

export type QuarzoDependencies = {
  getPokemonsGateway: GetPokemonsGatewayPort;
  createPokemonGateway: CreatePokemonGatewayPort;
  stateManager: StateManagerPort;
};
