import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  margin-bottom: 8px;
`;

export const Content = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 56px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-right: 2px;
`;

export const InputText = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  padding: 0 24px;
`;

export const BorderLine = styled.View<Props>`
  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
