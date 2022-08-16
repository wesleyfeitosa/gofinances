import React, { ReactElement, useMemo, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { LoadAnimation } from '../../components/LoadAnimation';
import theme from '../../styles/theme';
import { RootStackParamList } from '../../@types/routes/root-stack-param-list';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { addDaysToDate } from '../../utils/addDaysToDate';
import { api } from '../../services/api';

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

type Props = StackScreenProps<RootStackParamList, 'SchedulingDetails'>;

export function SchedulingDetails({ navigation, route }: Props): ReactElement {
  const { car, dates } = route.params;
  const rentTotal = Number(dates.length * car.rent.price);
  const [loading, setLoading] = useState(false);

  async function handleConfirmRental() {
    try {
      setLoading(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
      const unavailableDates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        ...rentalPeriod,
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      });

      navigation.navigate('SchedulingComplete');
    } catch (error) {
      Alert.alert('Erro ao realizar reserva.');
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
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>

          <Content>
            <Details>
              <Description>
                <Brand>{car.brand}</Brand>
                <Name>{car.name}</Name>
              </Description>

              <Rent>
                <Period>{car.rent.period}</Period>
                <Price>R$ {car.rent.price}</Price>
              </Rent>
            </Details>

            <Accessories>
              {car.accessories.map((accessory) => (
                <Accessory
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))}
            </Accessories>

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
                  R$ {car.rent.price} x{dates.length} diárias
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
