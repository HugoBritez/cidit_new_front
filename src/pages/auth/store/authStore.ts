import { create } from "zustand";
import { User } from "../types/auth.type";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

// Función para extraer información del usuario desde el token JWT
const getUserFromToken = (token: string): User | null => {
  try {
    const decoded: any = jwtDecode(token);
    return {
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role,
      email: decoded.email,
      firstname: decoded.firstname,
      lastname: decoded.lastname,
    };
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
  initialize: () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = getUserFromToken(token);
      if (user) {
        set({ user, token, isAuthenticated: true });
      } else {
        // Si no se puede decodificar el token, cerramos sesión
        localStorage.removeItem("token");
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  }
}));
