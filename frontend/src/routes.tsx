import type {RouteObject} from "./types/RouteObject.ts";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import Municipality from "./pages/Municipality.tsx";

export const routes : RouteObject[] = [
    {
        "name": "Accueil",
        "route": "/",
        "page": <Home/>
    },
    {
        "name": "Municipalités",
        "route": "/municipalities",
        "page": <Municipality/>
    },
    {
        "name": "A propos",
        "route": "/about",
        "page": <About/>
    }
]