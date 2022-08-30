import React from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={require('@assets/car-loading-animation.json')}
        autoPlay
        style={{ height: 80 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
