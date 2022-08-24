import React, { createContext, useState, useContext, useEffect } from 'react';

import { api } from '../../services/api';
import { database } from '../../database';
import { User } from '../../database/model/User';
import {
  AuthContextData,
  AuthProviderProps,
  AuthState,
  SignInCredentials,
} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const { id, name, email, avatar, driver_license, user_id, token } =
          response[0]._raw as unknown as User;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setData({
          token: token,
          user: {
            id,
            name,
            email,
            avatar,
            driver_license,
            user_id,
          },
        });
      }
    }

    loadUserData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post<AuthState>('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<User>('users');
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ token, user });
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
