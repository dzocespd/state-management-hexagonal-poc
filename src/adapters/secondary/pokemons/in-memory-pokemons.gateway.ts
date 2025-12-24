import type { GetPokemonsGatewayPort } from "../../../core/ports/get-pokemons.gateway.port";

type InMemoryPokemonsOptions = {
  feedWithPokemons?: { name: string; url: string }[];
  failWithError?: Error;
};

export const inMemoryPokemonsGateway = (
  options: InMemoryPokemonsOptions = {},
): GetPokemonsGatewayPort => {
  const { feedWithPokemons = [], failWithError } = options;

  return {
    getPokemons: async () => {
      if (failWithError) {
        throw failWithError;
      }

      return {
        results: feedWithPokemons,
      };
    },
  };
};
