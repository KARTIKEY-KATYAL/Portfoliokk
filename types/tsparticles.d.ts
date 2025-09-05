declare module "@tsparticles/engine" {
  // Using unknown instead of any to satisfy lint while keeping broad compatibility
  export type Container = unknown;
  export type SingleOrMultiple<T> = T | T[];
}

declare module "@tsparticles/slim" {
  export function loadSlim(engine: unknown): Promise<void>;
}
