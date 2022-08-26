import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';
import { AppTabRoutesParamList } from './types';
import { AppStackRoutes } from './app.stack.routes';
import HomeSvg from '../assets/home-menu-icon.svg';
import CarSvg from '../assets/car-menu-icon.svg';
import PeopleSvg from '../assets/people-menu-icon.svg';

const { Navigator, Screen } = createBottomTabNavigator<AppTabRoutesParamList>();

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 58,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="HomeStack"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
