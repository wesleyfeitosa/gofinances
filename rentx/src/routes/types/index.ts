import { NavigatorScreenParams } from '@react-navigation/native';

import { CarDTO } from '@dtos/CarDTO';

export type AuthRoutesParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: { name: string; email: string; driverLicense: string };
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: keyof AuthRoutesParamList;
  };
};

export type AppStackRoutesParamList = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: { car: CarDTO; dates: string[] };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: keyof AppStackRoutesParamList;
  };
  MyCars: undefined;
};

export type AppTabRoutesParamList = {
  HomeStack: NavigatorScreenParams<AppStackRoutesParamList>;
  Profile: undefined;
  MyCars: undefined;
};
