import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { RootStackParamList } from '../../../@types/routes/root-stack-param-list';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

type Props = StackScreenProps<RootStackParamList, 'SignUpFirstStep'>;

export function SignUpFirstStep({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNavigateToSecondStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatório'),
        email: Yup.string()
          .email('Email inválido')
          .required('Email obrigatório'),
        name: Yup.string().required('Nome obrigatório'),
      });

      const userData = { name, email, driverLicense };

      await schema.validate(userData);

      navigation.navigate('SignUpSecondStep', { user: userData });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.message);
      }

      throw error;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      contentContainerStyle={{
        height: Dimensions.get('window').height + getStatusBarHeight(),
        backgroundColor: theme.colors.background_primary,
      }}
    >
      <Container>
        <>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>
        </>

        <Button title="Proxímo" onPress={handleNavigateToSecondStep} />
      </Container>
    </KeyboardAvoidingView>
  );
}
