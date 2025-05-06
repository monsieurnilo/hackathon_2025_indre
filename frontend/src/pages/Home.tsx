
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <h1>Bienvenue</h1>
      <Link to="/actions"> -- Voir la documentation des actions</Link>
    </div>
  );
};
