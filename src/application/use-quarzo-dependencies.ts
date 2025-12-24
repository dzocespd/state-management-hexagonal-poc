import { useContext } from "react";
import { QuarzoDependenciesContext } from "./quarzo-dependencies.context";

export const useQuarzoDependencies = () => {
  const context = useContext(QuarzoDependenciesContext);

  if (!context) {
    throw new Error(
      "useQuarzoDependencies must be used within QuarzoDependenciesProvider",
    );
  }

  return context;
};
