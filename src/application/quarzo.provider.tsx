import type { ReactNode } from "react";
import type { QuarzoDependencies } from "../core/quarzo.dependencies";
import { buildQuarzoDependencies } from "./build-quarzo-dependencies";
import { QuarzoDependenciesContext } from "./quarzo-dependencies.context";

type QuarzoDependenciesProviderProps = {
  children: ReactNode;
  dependencies?: QuarzoDependencies;
};

export const QuarzoDependenciesProvider = ({
  children,
  dependencies = buildQuarzoDependencies(),
}: QuarzoDependenciesProviderProps) => (
  <QuarzoDependenciesContext.Provider value={dependencies}>
    {children}
  </QuarzoDependenciesContext.Provider>
);
