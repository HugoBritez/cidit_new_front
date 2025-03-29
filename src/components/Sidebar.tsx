import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, HelpCircleIcon, ChartBar, Home, Menu } from 'lucide-react';

const Sidebar = () => {

  const menuItems = [
    { title: 'Dashboard', path: '/', icon: <ChartBar /> },
    { title: 'Inicio', path: '/home', icon: <Home /> },
    { title: 'Perfil', path: '/usuario', icon: <UserIcon /> },
    { title: 'Ayuda', path: '/ayuda', icon: <HelpCircleIcon /> },
  ];

  return (
    <>
      {/* Menú móvil inferior */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <nav className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="p-2 text-cidit-teal hover:text-cidit-cyan"
            >
              {item.icon}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar flotante para desktop */}
      <div className="hidden lg:block fixed top-1/2 left-4 -translate-y-1/2 p-4 rounded-xl bg-white shadow-lg text-slate-700 z-50">
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <div key={item.path} className="relative group">
              <Link
                to={item.path}
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <span className="text-cidit-teal">{item.icon}</span>
              </Link>
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            transition-all duration-200 whitespace-nowrap">
                {item.title}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 