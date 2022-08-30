import React, { ReactElement } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import LogoSvg from '@assets/logo_background_gray.svg';
import DoneSvg from '@assets/done.svg';
import { ConfirmButton } from '@components/ConfirmButton';
import { AuthRoutesParamList } from '@routes/types';

import { Container, Content, Title, Message, Footer } from './styles';

type Props = StackScreenProps<AuthRoutesParamList, 'Confirmation'>;

export function Confirmation({ navigation, route }: Props): ReactElement {
  const { title, message, nextScreenRoute } = route.params;
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
