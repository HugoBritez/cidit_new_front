import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../auth/store/authStore";
import { LogOut } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mx-auto px-4 pt-20">
      <h1 className="text-2xl font-bold mb-6">Ajustes</h1>

      {/* Opción de cerrar sesión (visible solo en móvil) */}
      <div className="lg:hidden">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <LogOut className="text-red-500" size={20} />
            <span className="text-gray-700">Cerrar Sesión</span>
          </div>
        </button>
      </div>

      {/* Otros ajustes aquí */}
    </div>
  );
};

export default Settings;
