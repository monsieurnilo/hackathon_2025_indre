import {Link, useLocation} from "react-router-dom";
import {routes} from "../../routes.tsx";

export function Navbar(){

    const location = useLocation();

    return (
        <nav style={{ width: "100%" }}>            <menu>
                {routes.map(route => {
                    const isSelected = location.pathname === route.route;
                    return (
                        <li key={route.name} className={isSelected ? "selected" : ""}>
                            <Link to={route.route}>
                                {route.name}
                            </Link>
                        </li>
                    )
                })}
            </menu>
        </nav>
    )
}