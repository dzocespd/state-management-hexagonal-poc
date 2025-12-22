import "./App.css";
import { usePokemonsScreen } from "./adapters/primary/ui/pokemons/usePokemonsScreen";

function App() {
  const {
    state: { error, isLoading, pokemons },
    actions: { load },
  } = usePokemonsScreen();

  return (
    <main>
      <button onClick={load}>Get Pokemons</button>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {pokemons.length > 0 && (
        <ul>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
