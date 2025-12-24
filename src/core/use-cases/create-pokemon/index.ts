import type { Pokemon } from "../../entities/pokemon";
import type { CreatePokemonGatewayPort, CreatePokemonRequest } from "../../ports/create-pokemon.gateway.port";

export const createPokemonHandler = async (
  gateway: CreatePokemonGatewayPort,
  request: CreatePokemonRequest
): Promise<Pokemon> => {
  return await gateway.createPokemon(request);
};