import { ReactNode } from 'react';

export interface UserProps {
  id: string;
  email: string;
  name: string;
  drive_license: string;
  avatar: string;
}

export interface AuthState {
  token: string;
  user: UserProps;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: UserProps;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
