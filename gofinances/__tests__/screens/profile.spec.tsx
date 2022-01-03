import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../src/screens/Profile';

describe('Profile Screen', () => {
  it('should show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName.props.placeholder).toBeTruthy();
  });

  it('should user data has been loaded', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Wesley');
    expect(inputSurname.props.value).toEqual('Feitosa');
  });

  it('should title render correctly', () => {
    const { getByTestId } = render(<Profile />);

    const testTitle = getByTestId('text-title');

    expect(testTitle.props.children).toContain('Profile');
  });
});
