// import { usePokemonsScreen } from "../pages/usePokemonsScreen";
import { useQuarzoDependencies } from "../../../../application/use-quarzo-dependencies";

export const ComponentB = () => {
  // const { state: { pokemons, isLoading } } = usePokemonsScreen();
  const { stateManager } = useQuarzoDependencies();
  const pokemonsState = stateManager.getPokemons();
  console.log("Pokemons state from cache:", pokemonsState);


  return <div>ComponentB: {pokemonsState.data?.length}
  <p>isLoading: {pokemonsState.isLoading ? "true" : "false"}</p>
  </div>;
};

