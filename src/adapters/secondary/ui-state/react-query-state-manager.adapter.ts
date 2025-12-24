// adapters/secondary/ui-state/react-query-state-manager.adapter.ts
import type { QueryClient } from "@tanstack/react-query";
import type { Pokemon } from "../../../core/entities/pokemon";
import type { StateManagerPort, PokemonsState } from "../../../core/ports/state-manager.port";

export const createReactQueryStateManager = (
  queryClient: QueryClient
): StateManagerPort => {
  const queryKey = ["pokemons"] as const;
  
  
  return {
    getPokemons: (): PokemonsState => {
      const queryState = queryClient.getQueryState(queryKey);
      const data = queryState?.data as PokemonsState["data"];
      
      return {
        data,
        isLoading: queryState?.fetchStatus === "fetching",
        error: queryState?.error as Error | null ?? null,
      };
    },
    
    addPokemon: async (pokemon: Pokemon) => {
      // Optimistically update the cache
      queryClient.setQueryData<Pokemon[]>(queryKey, (oldData) => {
        if (!oldData) return [pokemon];
        // Check if pokemon already exists
        if (oldData.some(p => p.name === pokemon.name)) {
          return oldData;
        }
        return [...oldData, pokemon];
      });
    },
    
    removePokemon: async (pokemonName: string) => {
      queryClient.setQueryData<Pokemon[]>(queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.filter(p => p.name !== pokemonName);
      });
    },
    
    updatePokemon: async (pokemon: Pokemon) => {
      queryClient.setQueryData<Pokemon[]>(queryKey, (oldData) => {
        if (!oldData) return [];
        return oldData.map(p => p.name === pokemon.name ? pokemon : p);
      });
    },
  };
};