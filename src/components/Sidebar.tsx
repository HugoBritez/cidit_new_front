import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  UserIcon,
  HelpCircleIcon,
  ChartBar,
  Home,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useAuthStore } from "../pages/auth/store/authStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const menuItems = [
    { title: "Dashboard", path: "/", icon: <ChartBar size={20} /> },
    { title: "Inicio", path: "/home", icon: <Home size={20} /> },
    { title: "Perfil", path: "/usuario", icon: <UserIcon size={20} /> },
    { title: "Ajustes", path: "/ajustes", icon: <Settings size={20} /> },
    { title: "Ayuda", path: "/ayuda", icon: <HelpCircleIcon size={20} /> },
  ];

  // Menú adicional para administradores
  const adminMenuItems = [
    { title: "Gestionar Usuarios", path: "/admin/users", icon: <Users size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Función para determinar si un elemento está activo
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* Menú móvil inferior */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <nav className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 ${isActive(item.path) ? "text-cidit-teal" : "text-gray-500 hover:text-black"}`}
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar para desktop (versión con texto) */}
      <div className="hidden lg:flex flex-col h-full">
        <nav className="flex flex-col w-full h-full space-y-1 py-6">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  active ? "text-black font-semibold" : "text-gray-600 hover:text-black"
                } rounded-md group relative transition-all duration-200 overflow-hidden`}
              >
                <div className={`absolute inset-0 ${
                  active ? "opacity-10 mx-2" : "mx-2 opacity-0 group-hover:opacity-20"
                } bg-gradient-to-t from-[#1daaba] via-[#02c577] to-[#b1f750] rounded-md transition-opacity duration-200`}></div>
                <span className={`mr-3 ${
                  active ? "text-black" : "text-gray-500 group-hover:text-black"
                } relative z-10`}>{item.icon}</span>
                <span className={`${
                  active ? "font-semibold" : "font-medium group-hover:font-semibold"
                } text-sm relative z-10`}>
                  {item.title}
                </span>
              </Link>
            );
          })}

          {/* Menú de administración */}
          {user?.role === "admin" && (
            <>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="px-4 mb-2">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Administración</span>
              </div>
              {adminMenuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 ${
                      active ? "text-black font-semibold" : "text-gray-600 hover:text-black"
                    } rounded-md group relative transition-all duration-200 overflow-hidden`}
                  >
                    <div className={`absolute inset-0 ${
                      active ? "opacity-10 mx-2" : "mx-2 opacity-0 group-hover:opacity-20"
                    } bg-gradient-to-t from-[#1daaba] via-[#02c577] to-[#b1f750] rounded-md transition-opacity duration-200`}></div>
                    <span className={`mr-3 ${
                      active ? "text-black" : "text-gray-500 group-hover:text-black"
                    } relative z-10`}>{item.icon}</span>
                    <span className={`${
                      active ? "font-semibold" : "font-medium group-hover:font-semibold"
                    } text-sm relative z-10`}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </>
          )}
          
          {/* Botón de cerrar sesión */}
          <div className="mt-auto pt-6 px-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-500 hover:text-red-700 rounded-md group relative transition-all duration-200 overflow-hidden"
            >
              <div className="absolute  mx-2 inset-0 opacity-0 bg-gradient-to-t from-[#ffcccb] via-[#ff8080] to-[#ff6666] rounded-md group-hover:opacity-20 transition-opacity duration-200"></div>
              <LogOut size={20} className="mr-3 relative z-10" />
              <span className="font-medium text-sm group-hover:font-semibold relative z-10">
                Cerrar Sesión
              </span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
