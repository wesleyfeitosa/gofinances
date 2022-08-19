import React, { ReactElement, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  Content,
  IconContainer,
  InputText,
  BorderLine,
} from './styles';

interface PasswordInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: PasswordInputProps): ReactElement {
  const theme = useTheme();
  const [isPasswordSecurity, setIsPasswordSecurity] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordSecurity((oldState) => !oldState);
  }

  return (
    <Container>
      <Content>
        <IconContainer>
          <Feather
            name={iconName}
            size={24}
            color={
              isFocused || isFilled
                ? theme.colors.main
                : theme.colors.text_detail
            }
          />
        </IconContainer>

        <InputText
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          secureTextEntry={isPasswordSecurity}
          {...rest}
        />

        <BorderlessButton onPress={handlePasswordVisibilityChange}>
          <IconContainer>
            <Feather
              name={isPasswordSecurity ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_detail}
            />
          </IconContainer>
        </BorderlessButton>
      </Content>

      <BorderLine isFocused={isFocused} />
    </Container>
  );
}
