import React, { ReactNode } from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import theme from '../../../global/styles/theme';
import { Input } from '.';

type Props = {
  children: ReactNode;
};

const Providers: React.FC<Props> = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('', () => {
  it('must have specific border colors when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="e-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId('input-email');

    expect(inputComponent.props.style[0].borderColor).toBe(
      theme.colors.attention
    );
    expect(inputComponent.props.style[0].borderWidth).toBe(3);
  });
});
