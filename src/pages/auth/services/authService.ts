import axios from "axios";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../types/auth.type";
import { API_URL } from "../../../shared/constants/api_url";

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/login`,
      credentials
    );
    console.log(response.data);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/register`,
      credentials
    );
    console.log(response.data);
    return response.data;
  },

  setupAxiosInterceptors(token: string) {
    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  },
};

export default authService;
