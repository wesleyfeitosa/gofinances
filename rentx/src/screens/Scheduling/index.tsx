import React, { ReactElement, useState } from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { StackScreenProps } from '@react-navigation/stack';

import { BackButton } from '../../components/BackButton';
import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import {
  Calendar,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';
import { RootStackParamList } from '../../@types/routes/root-stack-param-list';

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
import { DateData } from 'react-native-calendars';

type Props = StackScreenProps<RootStackParamList, 'Scheduling'>;

export function Scheduling({ navigation }: Props): ReactElement {
  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>(
    {} as DateData
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const theme = useTheme();

  function handleConfirm() {
    navigation.navigate('SchedulingDetails');
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let startDate = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let endDate = date;

    if (startDate.timestamp > endDate.timestamp) {
      startDate = endDate;
      endDate = startDate;
    }

    setLastSelectedDate(endDate);

    const interval = generateInterval(startDate, endDate);
    setMarkedDates(interval);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

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
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
