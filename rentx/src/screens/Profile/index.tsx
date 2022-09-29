import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { Alert, KeyboardAvoidingView } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '@components/BackButton';
import { AppTabRoutesParamList } from '@routes/types';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { PasswordInput } from '@components/PasswordInput';
import { useAuth } from '@hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

type Props = BottomTabScreenProps<AppTabRoutesParamList, 'Profile'>;
type OptionsAlternatives = 'dataEdit' | 'passwordEdit';

export function Profile({ navigation }: Props): ReactElement {
  const theme = useTheme();
  const netInfo = useNetInfo();
  const { user, signOut, updateUser } = useAuth();
  const [option, setOption] = useState<OptionsAlternatives>('dataEdit');
  const isDataEditSelected = option === 'dataEdit';
  const isPasswordEditSelected = option === 'passwordEdit';
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
          style: 'destructive',
        },
      ]
    );
  }

  function handleOptionChange(optionSelected: OptionsAlternatives) {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert('Para mudar a senha, conecte-se a internet!');
    } else {
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const resultImageInfo = result as ImagePicker.ImageInfo;
    if (resultImageInfo.uri) {
      setAvatar(resultImageInfo.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatório'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
      });

      Alert.alert('Perfil atualizado!');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      }
      Alert.alert('Não foi possível atualizar o perfil.');
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <Container>
        <Header>
          <HeaderTop>
            <BackButton color={theme.colors.shape} onPress={handleBack} />

            <HeaderTitle>Editar Perfil</HeaderTitle>

            <LogoutButton onPress={handleSignOut}>
              <Feather name="power" size={24} color={theme.colors.shape} />
            </LogoutButton>
          </HeaderTop>

          <PhotoContainer>
            {!!avatar && (
              <Photo
                source={{
                  uri: avatar,
                }}
              />
            )}

            <PhotoButton onPress={handleAvatarSelect}>
              <Feather name="camera" size={24} color={theme.colors.shape} />
            </PhotoButton>
          </PhotoContainer>
        </Header>

        <Content customMarginBottom={useBottomTabBarHeight()}>
          <Options>
            <Option
              onPress={() => handleOptionChange('dataEdit')}
              active={isDataEditSelected}
            >
              <OptionTitle active={isDataEditSelected}>Dados</OptionTitle>
            </Option>

            <Option
              onPress={() => handleOptionChange('passwordEdit')}
              active={isPasswordEditSelected}
            >
              <OptionTitle active={isPasswordEditSelected}>
                Trocar senha
              </OptionTitle>
            </Option>
          </Options>

          {isDataEditSelected ? (
            <Section>
              <Input
                defaultValue={user.name}
                iconName="user"
                placeholder="Nome"
                autoCorrect={false}
                onChangeText={setName}
              />

              <Input
                defaultValue={user.email}
                iconName="mail"
                editable={false}
              />

              <Input
                defaultValue={user.driver_license}
                iconName="credit-card"
                placeholder="CNH"
                keyboardType="numeric"
                onChangeText={setDriverLicense}
              />
            </Section>
          ) : (
            <Section>
              <PasswordInput iconName="lock" placeholder="Senha atual" />

              <PasswordInput iconName="lock" placeholder="Nova senha" />

              <PasswordInput iconName="lock" placeholder="Repetir senha" />
            </Section>
          )}

          <Button title="Salvar Alterações" onPress={handleProfileUpdate} />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}
