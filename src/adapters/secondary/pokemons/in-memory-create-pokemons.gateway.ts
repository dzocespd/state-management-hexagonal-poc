import type { Pokemon } from "../../../core/entities/pokemon";
import type {
  CreatePokemonGatewayPort,
  CreatePokemonRequest,
} from "../../../core/ports/create-pokemon.gateway.port";

export const inMemoryCreatePokemonGateway = ({
  feedWithError,
}: {
  feedWithError?: string;
}): CreatePokemonGatewayPort => {
  const error: string | null = feedWithError ?? null;

  return {
    createPokemon: async (request: CreatePokemonRequest): Promise<Pokemon> => {
      if (error) {
        throw new Error(error);
      }

      return Promise.resolve({
        name: request.name,
        url: request.url,
      });
    },
  };
};
