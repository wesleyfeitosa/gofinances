import React, { ReactNode } from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Input } from './index';
import theme from '../../../global/styles/theme';

interface ProviderProps {
  children: ReactNode;
}

interface ComponentProps {
  active: boolean;
}

const Providers = ({ children }: ProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const Component = ({ active }: ComponentProps) => (
  <Input
    testID="input-email"
    placeholder="E-mail"
    keyboardType="email-address"
    autoCorrect={false}
    active={active}
  />
);

describe('Input Component', () => {
  it('must have specific border color when active', () => {
    const { getByTestId } = render(<Component active />, {
      wrapper: Providers,
    });

    const inputComponent = getByTestId('input-email');

    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });

  it('must not have specific border color when deactivated', () => {
    const { getByTestId } = render(<Component active={false} />, {
      wrapper: Providers,
    });

    const inputComponent = getByTestId('input-email');

    expect(inputComponent.props.style[0].borderColor).toBeUndefined();
  });
});
