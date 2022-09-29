import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@hooks/auth';
import { AuthRoutes } from './auth.stack.routes';
import { AppTabRoutes } from './app.tab.routes';
import { Loading } from '../components/Loading';

export function Routes(): ReactElement {
  const { user, loading } = useAuth();

  return loading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
