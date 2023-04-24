import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { categories } from '../../utils/categorias';
import { CategorySelect } from '.';
import theme from '../../global/styles/theme';

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <CategorySelect
        category={categories[0]}
        setCategory={() => jest.fn()}
        closeSelectCategory={() => jest.fn()}
      />,
      { wrapper: Providers }
    );
    expect(getByTestId('category-select')).toBeTruthy();
  });

  it('should call setCategory when a category is selected', () => {
    const setCategory = jest.fn();
    const { getByTestId } = render(
      <CategorySelect
        category={categories[0]}
        setCategory={() => setCategory(categories[1])}
        closeSelectCategory={() => jest.fn()}
      />,
      { wrapper: Providers }
    );

    fireEvent.press(getByTestId('category-0'));
    expect(setCategory).toHaveBeenCalledTimes(1);
    expect(setCategory).toHaveBeenCalledWith(categories[1]);
  });

  it('should call closeSelectCategory when the button is pressed', () => {
    const closeSelectCategory = jest.fn();
    const { getByTestId } = render(
      <CategorySelect
        category={categories[0]}
        setCategory={() => jest.fn()}
        closeSelectCategory={() => closeSelectCategory()}
      />,
      { wrapper: Providers }
    );

    fireEvent.press(getByTestId('button-select'));
    expect(closeSelectCategory).toHaveBeenCalledTimes(1);
  });
});
