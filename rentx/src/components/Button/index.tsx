import React, { ReactElement } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  ...rest
}: Props): ReactElement {
  return (
    <Container {...rest} color={color} enabled={enabled}>
      <Title>{title}</Title>
    </Container>
  );
}
