import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { StackScreenProps } from '@react-navigation/stack';

import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

type Props = StackScreenProps<RootStackParamList, 'Scheduling'>;

export function Scheduling({ navigation }: Props): ReactElement {
  const theme = useTheme();

  function handleConfirm() {
    navigation.navigate('SchedulingDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton color={theme.colors.shape} onPress={() => {}} />

        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
