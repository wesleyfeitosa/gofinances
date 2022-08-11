import React, { ReactElement } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { RootStackParamList } from '../../@types/routes/root-stack-param-list';

import { Container, Content, Title, Message, Footer } from './styles';

type Props = StackScreenProps<RootStackParamList, 'SchedulingComplete'>;

export function SchedulingComplete({ navigation }: Props): ReactElement {
  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigation.navigate('Home');
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

        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
