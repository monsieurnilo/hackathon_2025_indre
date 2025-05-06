import type { RouteObject } from "./types/RouteObject.ts";
import { Home } from "./pages/Home.tsx";
import { Actions } from "./pages/Actions.tsx";
import Municipality from "./pages/Municipality.tsx";

export const routes: RouteObject[] = [
    {
        "name": "Accueil",
        "route": "/",
        "page": <Home />
    },
    {
        "name": "Municipalités",
        "route": "/municipalities",
        "page": <Municipality />
    },
    {
        "name": "Liste des actions",
        "route": "/actions",
        "page": <Actions />
    }
]