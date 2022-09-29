import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { AppTabRoutesParamList } from '@routes/types';
import { BackButton } from '@components/BackButton';
import { Car } from '@components/Car';
import { LoadAnimation } from '@components/LoadAnimation';
import { api } from '@services/api';
import { Car as ModelCar } from '@database/model/Car';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

type Props = BottomTabScreenProps<AppTabRoutesParamList, 'MyCars'>;

export function MyCars({ navigation }: Props): ReactElement {
  const [scheduledCars, setscheduledCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useFocusEffect(
    useCallback(() => {
      async function loadCars() {
        try {
          setLoading(true);
          const scheduledCars = await api.get('/rentals');

          const dataFormatted = scheduledCars.data.map((data: DataProps) => {
            return {
              id: data.id,
              car: data.car,
              start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
              end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
            };
          });

          setscheduledCars(dataFormatted);
        } catch (error) {
          Alert.alert('Erro ao carregar carros.');
        } finally {
          setLoading(false);
        }
      }

      if (netInfo.isConnected === true) {
        loadCars();
      } else {
        Alert.alert(
          'Você deve ter conexão com a internet para carregar os agendamentos!'
        );
      }
    }, [])
  );

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

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>

            <AppointmentsQuantity>{scheduledCars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={scheduledCars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />

                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
