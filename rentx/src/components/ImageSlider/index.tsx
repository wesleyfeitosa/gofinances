import React, { ReactElement, useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import { Container, ImageIndexes, CarImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props): ReactElement {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef(
    ({ viewableItems, changed }: ChangeImageProps) => {
      if (viewableItems.length) {
        setImageIndex(viewableItems[0].index!);
      }
    }
  );

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
