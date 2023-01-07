import React from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categorias';

import { Button } from '../../components/Form/Button';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(item: Category) {
    setCategory(item);
  }

  return (
    <Container testID="category-select">
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <Category
            testID={`category-${index}`}
            onPress={() => handleCategorySelect(item)}
            isActived={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          testID="button-select"
          onPress={closeSelectCategory}
          title="Selecionar"
        />
      </Footer>
    </Container>
  );
}
