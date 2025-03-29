import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/about">Sobre Nosotros</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Página de Inicio</h1>} />
          <Route path="/about" element={<h1>Sobre Nosotros</h1>} />
          <Route path="/contact" element={<h1>Contacto</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
