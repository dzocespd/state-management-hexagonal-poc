import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { QuarzoDependenciesProvider } from "./application/quarzo.provider.tsx";
import { buildQuarzoDependencies } from "./application/build-quarzo-dependencies.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuarzoDependenciesProvider dependencies={buildQuarzoDependencies(queryClient)}>
        <App />
      </QuarzoDependenciesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
