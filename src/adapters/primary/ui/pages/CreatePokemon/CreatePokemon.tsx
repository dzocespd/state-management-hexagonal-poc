import { useCreatePokemonScreen } from "./useCreatePokemonScreen";
import { useCallback } from "react";

export const CreatePokemon = () => {
  const { actions : {addPokemon} } = useCreatePokemonScreen();
  

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    console.log(name, url);
    addPokemon({ name, url });
  }, [addPokemon]);

  return <main>

    <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="url" placeholder="URL" />
        <button type="submit">Create</button>
    </form>
  </main>
};