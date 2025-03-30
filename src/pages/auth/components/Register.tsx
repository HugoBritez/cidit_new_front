import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import authService from "../services/authService";
import type { RegisterCredentials } from "../types/auth.type";
import logo from "../../../assets/images/brand.svg"

const Register = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.register(credentials);
      setAuth(response.user, response.access_token);
      authService.setupAxiosInterceptors(response.access_token);
      navigate("/");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-[#1daaba] via-[#02c577] to-[#b1f750]">
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="flex justify-center my-6">
            <img src={logo} alt="logo" className="w-50 h-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center text-cidit-dark">
            Registrate como usuario
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full p-2 border rounded focus:outline-[#02c577] "
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 border rounded focus:outline-[#02c577] "
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-2 border rounded focus:outline-[#02c577] "
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-2 border rounded focus:outline-[#02c577] "
                value={credentials.firstname}
                onChange={(e) =>
                  setCredentials({ ...credentials, firstname: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                className="w-full p-2 border rounded focus:outline-[#02c577] "
                value={credentials.lastname}
                onChange={(e) =>
                  setCredentials({ ...credentials, lastname: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#02c577] text-white p-2 rounded hover:bg-[#02c577] cursor-pointer transition-colors"
            >
              <p className="text-white text-center font-bold">Registrarse</p>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-[#1daaba] hover:text-[#02c577] transition-colors font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
