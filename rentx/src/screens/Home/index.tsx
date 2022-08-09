import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackScreenProps } from '@react-navigation/stack';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export function Home({ navigation }: Props): ReactElement {
  const carData = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail:
      'https://mediaservice.audi.com/media/live/50900/fly1400x601n1/f5f/2021.png?wid=850',
  };

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
