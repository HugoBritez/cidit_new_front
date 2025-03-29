import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Sidebar />
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
