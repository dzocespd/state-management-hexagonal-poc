import type { Pokemon } from "../entities/pokemon";

export type CreatePokemonRequest = {
  name: string;
  url: string;
};

export type CreatePokemonGatewayPort = {
  createPokemon: (pokemon: CreatePokemonRequest) => Promise<Pokemon>;
};