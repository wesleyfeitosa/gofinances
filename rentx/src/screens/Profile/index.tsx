import {
  BottomTabScreenProps,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import { KeyboardAvoidingView } from 'react-native';
import React, { ReactElement, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { BackButton } from '@components/BackButton';
import { AppTabRoutesParamList } from '@routes/types';
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
  const { user, signOut } = useAuth();
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
    signOut();
  }

  function handleOptionChange(optionSelected: OptionsAlternatives) {
    setOption(optionSelected);
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
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}
