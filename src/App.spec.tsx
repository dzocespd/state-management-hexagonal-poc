import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";
import { QuarzoDependenciesProvider } from "./application/quarzo.provider";
import { buildInMemoryDependencies } from "./application/build-quarzo-dependencies";

const queryClient = new QueryClient();

const dependencies = buildInMemoryDependencies(queryClient);

test("loads pokemons from context dependencies", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <QuarzoDependenciesProvider dependencies={dependencies}>
        <App />
      </QuarzoDependenciesProvider>
    </QueryClientProvider>,
  );

  fireEvent.click(screen.getByRole("button", { name: /get pokemons/i }));
  expect(await screen.findByText("bulbasaur")).toBeTruthy();
});
