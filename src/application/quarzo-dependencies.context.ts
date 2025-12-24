import { createContext } from "react";
import type { QuarzoDependencies } from "./quarzo.dependencies";

export const QuarzoDependenciesContext =
  createContext<QuarzoDependencies | null>(null);
