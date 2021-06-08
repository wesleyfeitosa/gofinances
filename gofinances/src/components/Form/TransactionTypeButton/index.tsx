import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Icon, Title, Button } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type: 'up' | 'down';
  isActived: boolean;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

export function TransactionTypeButton({
  title,
  type,
  isActived,
  ...rest
}: Props) {
  return (
    <Container isActived={isActived} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
