import { clientBootstrap, RouteModule } from "@impalajs/react/client";
import "regenerator-runtime/runtime";
const modules = import.meta.glob<RouteModule>("./routes/**/*.{tsx,jsx}");

clientBootstrap(modules);
