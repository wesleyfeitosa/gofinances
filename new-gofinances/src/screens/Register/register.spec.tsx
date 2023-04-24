import React, { ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { Register } from '.';
import theme from '../../global/styles/theme';

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Register Screen', () => {
  it('should be able to open category modal on click button', () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const openModalButton = getByTestId('category-select-button');
    const categoryModal = getByTestId('category-modal');

    expect(categoryModal.props.visible).toBeFalsy();

    fireEvent.press(openModalButton);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
