import React, { ReactElement, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Content,
  IconContainer,
  InputText,
  BorderLine,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function Input({ iconName, value, ...rest }: InputProps): ReactElement {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
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
          {...rest}
        />
      </Content>

      <BorderLine isFocused={isFocused} />
    </Container>
  );
}
