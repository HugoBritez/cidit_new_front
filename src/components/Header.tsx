import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../pages/auth/store/authStore';

const Header = () => {
  const user = useAuthStore(state => state.user);
  
  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-30 bg-gradient-to-t from-[#1daaba] via-[#02c577] to-[#b1f750]"
    >
      <div className="flex items-center justify-end h-full px-4">
        <h1 className="text-white text-2xl font-bold mr-auto">CIDIT</h1>
        {/* Barra de búsqueda */}
        <div className="lg:w-[calc(100%-24rem)] sm:hidden max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-white text-slate-800 rounded-lg focus:outline-[#02c577] focus:ring-2 focus:ring-cidit-teal"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Iconos de la derecha */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white cursor-pointer transition-colors">
            <Bell size={20} />
          </button>

          {/* Avatar del usuario */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
              <span className="text-white font-medium">{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
            </div>
            <span className="text-white hidden md:block">{user?.username || 'Usuario'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 