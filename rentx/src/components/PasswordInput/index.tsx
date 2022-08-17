import React, { ReactElement, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Container, IconContainer, InputText } from './styles';

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({
  iconName,
  ...rest
}: PasswordInputProps): ReactElement {
  const theme = useTheme();

  const [isPasswordSecurity, setIsPasswordSecurity] = useState(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordSecurity((oldState) => !oldState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText secureTextEntry={isPasswordSecurity} {...rest} />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={isPasswordSecurity ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
