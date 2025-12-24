import { create } from 'zustand'

type PokemonsUiState = {
  hasRequestedFetch: boolean
  requestFetch: () => void
  reset: () => void
}

/**
 * Pure UI state managed via Zustand. It keeps track of whether the user
 * has explicitly requested the pokemon list so we can lazily enable the
 * React Query fetch port.
 */
export const usePokemonsUiStore = create<PokemonsUiState>((set) => ({
  hasRequestedFetch: false,
  requestFetch: () => set({ hasRequestedFetch: true }),
  reset: () => set({ hasRequestedFetch: false }),
}))
