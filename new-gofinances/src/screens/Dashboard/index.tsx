import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { HighLightCard } from '../../components/HighLightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ContainerLoading,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HightlightProps {
  amount: string;
  lastTransaction: string;
}

interface HightlightData {
  entries: HightlightProps;
  expensives: HightlightProps;
  total: HightlightProps;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HightlightData>({
    entries: { lastTransaction: 'Nenhuma transação até o momento...' },
    expensives: { lastTransaction: 'Nenhuma transação até o momento...' },
    total: { lastTransaction: 'Nenhuma transação até o momento...' },
  } as HightlightData);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    transactions: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max(
        ...transactions
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`;
  }

  const loadTransaction = useCallback(async () => {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount);
        } else {
          expensivesTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          date,
          amount,
          type: transaction.type,
          category: transaction.category,
        };
      }
    );

    setData(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      'positive'
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      'negative'
    );
    const totalInterval =
      entriesTotal || expensivesTotal
        ? `01 a ${lastTransactionExpensives}`
        : 'Nenhuma transação até o momento...';

    const total = entriesTotal - expensivesTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: entriesTotal
          ? `Última entrada dia ${lastTransactionEntries}`
          : 'Nenhuma transação até o momento...',
      },
      expensives: {
        amount: expensivesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: expensivesTotal
          ? `Última saída dia ${lastTransactionExpensives}`
          : 'Nenhuma transação até o momento...',
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransaction();
    }, [loadTransaction])
  );

  return (
    <Container>
      {isLoading ? (
        <ContainerLoading>
          <ActivityIndicator color={theme.colors.primary} size={60} />
        </ContainerLoading>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />

                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighLightCards>
            <HighLightCard
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighLightCard
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="down"
            />
            <HighLightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighLightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
