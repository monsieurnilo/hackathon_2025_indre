import './App.css'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {NotFound} from "./pages/NotFound.tsx";
import ActionList from "./ActionList";

function App() {
  return (
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/actions" element={<ActionList />} />

        </Routes>
      </Router>
  )
}

export default App
