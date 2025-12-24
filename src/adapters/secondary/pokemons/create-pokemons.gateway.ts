import type { Pokemon } from "../../../core/entities/pokemon";
import type { CreatePokemonGatewayPort, CreatePokemonRequest } from "../../../core/ports/create-pokemon.gateway.port";

export const createPokemonGateway = (): CreatePokemonGatewayPort => ({
  createPokemon: async (request: CreatePokemonRequest): Promise<Pokemon> => {
    // Note: Commented this call since the endpoint does not exist
    // const response = await fetch('https://pokeapi.co/api/v2/pokemon', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(request),
    // });
    
    const response = JSON.stringify({
      name: request.name,
      url: request.url,
    });


    return Promise.resolve(JSON.parse(response));
  },
});