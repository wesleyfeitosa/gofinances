import React, { createContext, useState, useContext, useEffect } from 'react';

import { api } from '@services/api';
import { database } from '@database/index';
import { User } from '@database/model/User';
import {
  AuthContextData,
  AuthProviderProps,
  AuthState,
  SignInCredentials,
  UserProps,
} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

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
        const userCreated = await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });

        setData({ id: userCreated.id, token, user });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<User>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as AuthState);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(user: UserProps) {
    try {
      const userCollection = database.get<User>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData((oldData) => {
        return {
          ...oldData,
          user,
        };
      });
    } catch (error) {
      if (__DEV__) console.log(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const { id, name, email, avatar, driver_license, user_id, token } =
          response[0]._raw as unknown as User;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setData({
          id,
          token: token,
          user: {
            id: user_id,
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

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
