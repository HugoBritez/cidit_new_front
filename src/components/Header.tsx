import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header
      className={`fixed top-0 right-0 h-16  w-full lg:w-full z-30 bg-linear-to-t from-[#1daaba] via-[#02c577] to-[#b1f750] `}
    >
      <div className="flex items-center justify-end h-full px-4">
        <h1 className="text-white text-2xl font-bold mr-auto">CIDIT</h1>
        {/* Barra de búsqueda */}
        <div className=" lg:w-[calc(100%-10rem)] sm:hidden  max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 bg-white text-slate-800  rounded-lg focus:outline-[#02c577] focus:ring-2 focus:ring-cidit-teal "
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Iconos de la derecha TODO AGREGAR NOTIFICACIONES Y CONFIGURACIONES */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white cursor-pointer transition-colors">
            <Bell size={20} />
          </button>

          {/* Avatar del usuario */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
              <span className="text-white font-medium">U</span>
            </div>
            <span className="text-white hidden md:block">Usuario</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 