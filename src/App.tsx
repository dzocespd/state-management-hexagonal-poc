import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { ComponentA } from "./adapters/primary/ui/components/ComponentA";
import { CreatePokemon } from "./adapters/primary/ui/pages/CreatePokemon/CreatePokemon";
import { PokemonsList } from "./adapters/primary/ui/pages/PokemonList/PokemonsList";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Pokemons List</Link>
        <br />
        <Link to="/component-a">Component A</Link>
        <br />
        <Link to="/create-pokemon">Create Pokemon</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PokemonsList />} />
        <Route path="/component-a" element={<ComponentA />} />
        <Route path="/create-pokemon" element={<CreatePokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
