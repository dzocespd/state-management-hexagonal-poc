import { createContext } from "react";
import type { QuarzoDependencies } from "../core/quarzo.dependencies";

export const QuarzoDependenciesContext =
  createContext<QuarzoDependencies | null>(null);
