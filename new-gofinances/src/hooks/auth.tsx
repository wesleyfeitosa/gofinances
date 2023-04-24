/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageData();
  }, []);

  async function signInWithGoogle() {
    try {
      const userLogged = {
        id: '1122',
        email: `wesley@email.com`,
        name: `Wesley`,
        photo: `dsafascsc`,
      };

      setUser(userLogged);
      AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
    } catch (error: any) {}
  }

  async function signOut() {
    setUser({} as User);

    await AsyncStorage.removeItem(userStorageKey);
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOut, userStorageLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
