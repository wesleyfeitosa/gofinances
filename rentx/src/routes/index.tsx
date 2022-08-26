import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import { AuthRoutes } from './auth.stack.routes';
import { AppTabRoutes } from './app.tab.routes';

export function Routes(): ReactElement {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user?.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
