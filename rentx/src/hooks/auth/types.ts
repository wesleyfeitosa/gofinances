import { ReactNode } from 'react';

export interface UserProps {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

export interface AuthState {
  id: string;
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
  signOut: () => Promise<void>;
  updateUser: (user: UserProps) => Promise<void>;
  loading: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}
