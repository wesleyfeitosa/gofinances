import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '@components/BackButton';
import { ImageSlider } from '@components/ImageSlider';
import { Accessory } from '@components/Accessory';
import { Button } from '@components/Button';
import { LoadAnimation } from '@components/LoadAnimation';
import theme from '@styles/theme';
import { AppStackRoutesParamList } from '@routes/types';
import { getAccessoryIcon } from '@utils/getAccessoryIcon';
import { addDaysToDate } from '@utils/addDaysToDate';
import { api } from '@services/api';
import { CarDTO } from '@dtos/CarDTO';
import { useAuth } from '@hooks/auth';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

type Props = StackScreenProps<AppStackRoutesParamList, 'SchedulingDetails'>;

export function SchedulingDetails({ navigation, route }: Props): ReactElement {
  const { car, dates } = route.params;
  const netInfo = useNetInfo();
  const rentTotal = Number(dates.length * car.price);

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function handleConfirmRental() {
    try {
      setLoading(true);

      await api.post('/rentals', {
        user_id: user.id,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir \naté a concessionária da RENTX \npegar seu automóvel.`,
        nextScreenRoute: 'Home',
      });
    } catch (error) {
      Alert.alert('Não foi possível confirmar o agendamento!');
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  const rentalPeriod = useMemo(() => {
    return {
      startDate: format(addDaysToDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(
        addDaysToDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    };
  }, [dates]);

  useFocusEffect(
    useCallback(() => {
      async function fetchCarUpdated() {
        const response = await api.get(`/cars/${car.id}`);
        setCarUpdated(response.data);
      }

      if (netInfo.isConnected === true) {
        fetchCarUpdated();
      }
    }, [setCarUpdated, netInfo])
  );

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <>
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>

          <Content>
            <Details>
              <Description>
                <Brand>{car.brand}</Brand>
                <Name>{car.name}</Name>
              </Description>

              <Rent>
                <Period>{car.period}</Period>
                <Price>
                  R$ {netInfo.isConnected === true ? car.price : '...'}
                </Price>
              </Rent>
            </Details>

            {!!carUpdated.accessories && (
              <Accessories>
                {carUpdated.accessories.map((accessory) => (
                  <Accessory
                    key={accessory.type}
                    name={accessory.name}
                    icon={getAccessoryIcon(accessory.type)}
                  />
                ))}
              </Accessories>
            )}

            <RentalPeriod>
              <CalendarIcon>
                <Feather
                  name="calendar"
                  size={RFValue(24)}
                  color={theme.colors.shape}
                />
              </CalendarIcon>

              <DateInfo>
                <DateTitle>DE</DateTitle>
                <DateValue>{rentalPeriod.startDate}</DateValue>
              </DateInfo>

              <Feather
                name="chevron-right"
                size={RFValue(10)}
                color={theme.colors.text}
              />

              <DateInfo>
                <DateTitle>ATÉ</DateTitle>
                <DateValue>{rentalPeriod.endDate}</DateValue>
              </DateInfo>
            </RentalPeriod>

            <RentalPrice>
              <RentalPriceLabel>TOTAL</RentalPriceLabel>
              <RentalPriceDetails>
                <RentalPriceQuota>
                  R$ {car.price} x{dates.length} diárias
                </RentalPriceQuota>
                <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
              </RentalPriceDetails>
            </RentalPrice>
          </Content>

          <Footer>
            <Button
              title="Alugar agora"
              color={theme.colors.success}
              onPress={handleConfirmRental}
            />
          </Footer>
        </>
      )}
    </Container>
  );
}
