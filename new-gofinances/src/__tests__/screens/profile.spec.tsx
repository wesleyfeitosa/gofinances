import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () => {
  it('should be able to properly render', () => {
    const { getByText, getByPlaceholderText } = render(<Profile />);

    expect(getByPlaceholderText('Nome')).toBeTruthy();
    expect(getByText('Perfil')).toBeTruthy();
  });

  it('should be able to load the user data', () => {
    const { getByTestId } = render(<Profile />);

    expect(getByTestId('input-name').props.value).toBe('Wesley');
    expect(getByTestId('input-surname').props.value).toBe('Feitosa');
  });

  it('should be able render title correctly', () => {
    const { getByTestId } = render(<Profile />);

    expect(getByTestId('text-title').props.children).toContain('Perfil');
  });
});
