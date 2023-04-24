import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface IconProps {
  type: 'positive' | 'negative';
}

interface ContainerProps {
  isActived: boolean;
  type: 'positive' | 'negative';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;

  border-width: ${({ isActived }) => (isActived ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActived, type }) =>
    isActived &&
    type === 'positive' &&
    css`
      background-color: ${({ theme }) => theme.colors.successLight};
    `};

  ${({ isActived, type }) =>
    isActived &&
    type === 'negative' &&
    css`
      background-color: ${({ theme }) => theme.colors.attentionLight};
    `};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
