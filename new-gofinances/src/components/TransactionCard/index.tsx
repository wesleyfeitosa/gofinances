import React from 'react';
import { categories } from '../../utils/categorias';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({
  data: { type, name, amount, category, date },
}: Props) {
  const [categoryItem] = categories.filter((item) => item.key === category);

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryItem.icon} />
          <CategoryName>{categoryItem.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
