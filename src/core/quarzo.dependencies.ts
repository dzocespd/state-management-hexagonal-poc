import type { GetPokemonsGatewayPort } from "./ports/get-pokemons.gateway.port";

export type QuarzoDependencies = {
  getPokemonsGateway: GetPokemonsGatewayPort;
};
