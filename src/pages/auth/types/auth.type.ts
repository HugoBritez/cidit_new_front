export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}


export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
  firstname: string;
  lastname: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
