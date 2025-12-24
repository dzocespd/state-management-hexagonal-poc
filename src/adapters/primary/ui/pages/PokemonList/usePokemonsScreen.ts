// adapters/primary/ui/pages/usePokemonsScreen.ts
import { useCallback, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createPokemonHandler } from "../../../../../core/use-cases/create-pokemon";
import { useQuarzoDependencies } from "../../../../../application/use-quarzo-dependencies";
import type { CreatePokemonRequest } from "../../../../../core/ports/create-pokemon.gateway.port";
import { getPokemonsHandler } from "../../../../../core/use-cases/get-pokemons";



export const usePokemonsScreen = () => {
  const { getPokemonsGateway, createPokemonGateway, stateManager } = useQuarzoDependencies();
  const [hasRequestedFetch, setHasRequestedFetch] = useState(false);

  const requestFetch = useCallback(() => {
    setHasRequestedFetch(true);
  }, []);
  
  // Query for fetching pokemons
  const { data, error, isFetching, isPending, refetch } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemonsHandler(getPokemonsGateway),
    enabled: hasRequestedFetch,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Mutation for creating pokemon with optimistic update
  const createPokemonMutation = useMutation({
    mutationFn: (request: CreatePokemonRequest) => 
      createPokemonHandler(createPokemonGateway, request),
    
    // Optimistic update: update cache immediately
    onMutate: async (newPokemon) => {
      // Optimistically add to cache
      stateManager.addPokemon(newPokemon);
      
      return { previousPokemons: data };
    },
    
    // In case mutation fails 
    onError: (error, newPokemon, context) => {
      console.error(error, newPokemon, context);
     
    },
    
    // Note: We could update the state here and not on "onMutate"
    onSuccess: () => {
      // void refetch();
    },
  });

  const load = useCallback(() => {
    if (!hasRequestedFetch) {
      requestFetch();
      return;
    }
    void refetch();
  }, [hasRequestedFetch, refetch, requestFetch]);

  const addPokemon = useCallback((request: CreatePokemonRequest) => {
    createPokemonMutation.mutate(request);
  }, [createPokemonMutation]);

  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Unknown error"
    : null;
  const isLoading = hasRequestedFetch ? isPending || isFetching : false;
  const pokemons = data ?? [];

  return {
    state: { 
      pokemons, 
      isLoading, 
      error: errorMessage,
      isCreating: createPokemonMutation.isPending,
      createError: createPokemonMutation.error,
    },
    actions: { 
      load, 
      addPokemon,
    },
  };
};