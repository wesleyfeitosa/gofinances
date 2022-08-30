import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Splash } from '@screens/Splash';
import { Confirmation } from '@screens/Confirmation';
import { SignIn } from '@screens/SignIn';
import { SignUpFirstStep } from '@screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '@screens/SignUp/SignUpSecondStep';
import { AuthRoutesParamList } from './types';

const { Navigator, Screen } = createStackNavigator<AuthRoutesParamList>();

export function AuthRoutes() {
  return (
    <Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
