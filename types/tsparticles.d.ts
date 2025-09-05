declare module "@tsparticles/engine" {
  export type Container = any;
  export type SingleOrMultiple<T> = T | T[];
}

declare module "@tsparticles/slim" {
  export function loadSlim(engine: any): Promise<void>;
}
