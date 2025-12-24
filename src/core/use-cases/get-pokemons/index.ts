import type { GetPokemonsGatewayPort } from "../../ports/get-pokemons.gateway.port";

export const getPokemonsHandler = async (gateway: GetPokemonsGatewayPort) => {
  const response = await gateway.getPokemons();

  return response.results.map((pokemon) => ({
    name: pokemon.name,
    url: pokemon.url,
  }));
};
