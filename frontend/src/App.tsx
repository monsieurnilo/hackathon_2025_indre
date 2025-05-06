import './App.css'
import 'leaflet/dist/leaflet.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar.tsx";
import { routes } from "./routes.tsx";
import { NotFound } from "./pages/NotFound.tsx";

function App() {
  return (
    <Router >
      <Navbar />
      <Routes>
        {routes.map(route => {
          return (
            <Route key={route.route} path={route.route} element={route.page} />
          )
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
