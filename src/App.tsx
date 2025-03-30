import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useAuthStore } from "./pages/auth/store/authStore";
import Login from "./pages/auth/components/Login";
import Register from "./pages/auth/components/Register";
import Settings from "./pages/settings/Settings";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div>
                <Header />
                <Sidebar />
                <Routes>
                  <Route path="/" element={<h1>Página de Inicio</h1>} />
                  <Route path="/about" element={<h1>Sobre Nosotros</h1>} />
                  <Route path="/contact" element={<h1>Contacto</h1>} />
                  <Route path="/ajustes" element={<Settings />} />
                </Routes>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
