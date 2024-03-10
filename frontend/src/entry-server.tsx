import type { RouteModule, DataModule } from "@impalajs/react";
export { render } from "@impalajs/react";
import "regenerator-runtime/runtime";
export const routeModules = import.meta.glob<RouteModule>(
  "./routes/**/*.{tsx,jsx}"
);
export const dataModules = import.meta.glob<DataModule>(
  "./routes/**/*.data.{ts,js}"
);
