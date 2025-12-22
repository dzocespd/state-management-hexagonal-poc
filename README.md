# State Management Hexagonal POC

- **Domain** (core) exposes use cases and ports only.
- **Secondary adapters** implement those ports (e.g., HTTP fetch of Pokémons). This holds real gateway implementation and in-memory implementations of the ports.
- **Primary adapters** consume the domain through React Query (server-state port) and Zustand (client/UI port).
- **React Context** provides the wiring of the port implementations to the component tree.

## Why React Query + Zustand Ports

- **Port-specialisation** – React Query owns fetch/caching/invalidation (server-state), while Zustand holds tiny bits of UI intent. Each adapter has a single reason to change.
- **Hexagonal clarity** – UI hooks call `getPokemonsHandler` with injected ports implementations from the Context. Nothing in React components imports secondary adapters directly.
- **Testability** – Specs can inject in-memory gateways through the Context Provider.
- **Locality** – Hooks expose `{ state, actions }` tailored for screens. Components remain dumb, and any additional UI-only state can live in isolated Zustand stores without touching global caches.

## Why Not a “Manager” Component Context

- **Manual cache plumbing** – You’d reimplement stale handling, retries, deduplication, etc., that React Query already provides and battle race conditions yourself.

## Why Prefer This Over Redux Here

- **Less boilerplate** – No slices, action creators, selectors, or thunks. Hooks call the domain use case, and React Query tracks status.
- **Explicit dependencies** – Dependencies are injected through a provider, making overrides trivial.
- **UI/control separation** – Zustand handles tiny UI flags (e.g., “has the user requested data?”) without polluting global Redux state or dispatching meaningless actions.
