import React from 'react';
import {StatusBar} from 'react-native';

import {Home} from './src/pages/Home';

export function App() {
  return (
    <>
      <StatusBar backgroundColor="#121015" />
      <Home />
    </>
  );
}
