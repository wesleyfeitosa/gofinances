import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { ReactElement, useEffect, useState } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

import { AppTabRoutesParamList } from '@routes/types';
import { BackButton } from '@components/BackButton';
import { Car } from '@components/Car';
import { LoadAnimation } from '@components/LoadAnimation';
import { CarDTO } from '@dtos/CarDTO';
import { api } from '@services/api';

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

interface ScheduledCarProps {
  id: number;
  user_id: number;
  car: CarDTO;
  startDate: string;
  endDate: string;
}
type Props = BottomTabScreenProps<AppTabRoutesParamList, 'MyCars'>;

export function MyCars({ navigation }: Props): ReactElement {
  const [scheduledCars, setscheduledCars] = useState<ScheduledCarProps[]>([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function loadCars() {
      try {
        setLoading(true);
        const scheduledCars = await api.get('/schedules_byuser?user_id=1');

        setscheduledCars(scheduledCars.data);
      } catch (error) {
        Alert.alert('Erro ao carregar carros.');
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

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
                    <CarFooterDate>{item.startDate}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{item.endDate}</CarFooterDate>
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
