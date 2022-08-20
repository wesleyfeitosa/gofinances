import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { RootStackParamList } from '../../../@types/routes/root-stack-param-list';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

type Props = StackScreenProps<RootStackParamList, 'SignUpSecondStep'>;

export function SignUpSecondStep({ navigation, route }: Props) {
  const { user } = route.params;

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação.');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais.');
    }

    navigation.navigate('Confirmation', {
      title: 'Conta criada!',
      message: `Agora é só fazer login \ne aproveitar`,
      nextScreenRoute: 'SignIn',
    });
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
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
        </>

        <Button
          title="Cadastrar"
          color={theme.colors.success}
          onPress={handleRegister}
        />
      </Container>
    </KeyboardAvoidingView>
  );
}
