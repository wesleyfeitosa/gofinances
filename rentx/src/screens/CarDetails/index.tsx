import React, { ReactElement } from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Container, Header, CarImages } from './styles';

export function CarDetails(): ReactElement {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://mediaservice.audi.com/media/live/50900/fly1400x601n1/f5f/2021.png?wid=850',
          ]}
        />
      </CarImages>
    </Container>
  );
}
