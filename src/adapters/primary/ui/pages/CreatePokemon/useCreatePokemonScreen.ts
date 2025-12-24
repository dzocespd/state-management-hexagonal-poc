import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPokemonHandler } from "../../../../../core/use-cases/create-pokemon";
import { useQuarzoDependencies } from "../../../../../application/use-quarzo-dependencies";
import type { CreatePokemonRequest } from "../../../../../core/ports/create-pokemon.gateway.port";

export const useCreatePokemonScreen = () => {
  const { createPokemonGateway, stateManager } = useQuarzoDependencies();

  // Mutation for creating pokemon with optimistic update
  const createPokemonMutation = useMutation({
    mutationFn: (request: CreatePokemonRequest) =>
      createPokemonHandler(createPokemonGateway, request),

    // Optimistic update: update cache immediately
    onMutate: async (newPokemon) => {
      // Optimistically add to cache
      stateManager.addPokemon(newPokemon);

      return { previousPokemons: stateManager.getPokemons().data };
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

  const addPokemon = useCallback(
    (request: CreatePokemonRequest) => {
      createPokemonMutation.mutate(request);
    },
    [createPokemonMutation]
  );

  return {
    state: {
      isCreating: createPokemonMutation.isPending,
      createError: createPokemonMutation.error,
    },
    actions: {
      addPokemon,
    },
  };
};
