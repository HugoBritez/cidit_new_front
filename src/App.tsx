import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useAuthStore } from "./pages/auth/store/authStore";
import Login from "./pages/auth/components/Login";
import Register from "./pages/auth/components/Register";
import Settings from "./pages/settings/Settings";
import UserManagement from "./pages/usuario/components/UserManagement";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

// Componente para inicializar el estado de autenticación
const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const initialize = useAuthStore((state) => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthInitializer>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex flex-1 pt-16">
                    {/* Sidebar para escritorio (ancho ajustado) */}
                    <div className="hidden lg:block w-56 bg-white shadow-md z-40">
                      <Sidebar />
                    </div>
                    
                    {/* Contenido principal */}
                    <main className="flex-1 bg-blue-100 overflow-y-auto">
                      <div className="px-4 py-6">
                        <Routes>
                          <Route path="/" element={<h1 className="text-2xl font-bold">Página de Inicio</h1>} />
                          <Route path="/home" element={<h1 className="text-2xl font-bold">Inicio</h1>} />
                          <Route path="/usuario" element={<h1 className="text-2xl font-bold">Perfil de Usuario</h1>} />
                          <Route path="/ayuda" element={<h1 className="text-2xl font-bold">Ayuda</h1>} />
                          <Route path="/ajustes" element={<Settings />} />
                          <Route
                            path="/admin/users"
                            element={
                              <AdminRoute>
                                <UserManagement />
                              </AdminRoute>
                            }
                          />
                        </Routes>
                      </div>
                    </main>
                  </div>
                  
                  {/* Sidebar móvil (footer) */}
                  <div className="lg:hidden">
                    <Sidebar />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthInitializer>
  );
}

export default App;
