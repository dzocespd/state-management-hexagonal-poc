import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonsHandler } from "../../../../core/use-cases";
import { useQuarzoDependencies } from "../../../../application/use-quarzo-dependencies";
import { usePokemonsUiStore } from "../../state/pokemons.ui-store";

export const usePokemonsScreen = () => {
  const hasRequestedFetch = usePokemonsUiStore(
    (state) => state.hasRequestedFetch,
  );
  const requestFetch = usePokemonsUiStore((state) => state.requestFetch);
  const { getPokemonsGateway } = useQuarzoDependencies();

  const { data, error, isFetching, isPending, refetch } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemonsHandler(getPokemonsGateway),
    enabled: hasRequestedFetch,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const load = useCallback(() => {
    if (!hasRequestedFetch) {
      requestFetch();
      return;
    }

    void refetch();
  }, [hasRequestedFetch, refetch, requestFetch]);

  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Unknown error"
    : null;
  const isLoading = hasRequestedFetch ? isPending || isFetching : false;
  const pokemons = data ?? [];

  return {
    state: { pokemons, isLoading, error: errorMessage },
    actions: { load },
  };
};
