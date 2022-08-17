import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  light = false,
  ...rest
}: Props): ReactElement {
  return (
    <Container {...rest} color={color} enabled={enabled}>
      <Title light={light}>{title}</Title>
    </Container>
  );
}
