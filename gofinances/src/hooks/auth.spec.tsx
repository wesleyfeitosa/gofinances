import { renderHook, act } from '@testing-library/react-hooks';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { AuthProvider, useAuth } from './auth';

describe('Auth Hook', () => {
  it('should be able to sign in with Google Account existing', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toHaveProperty('id');
  });

  it('should not be able to sign in with Google Account if exists an error', async () => {
    jest
      .spyOn(GoogleSignin, 'signIn')
      .mockRejectedValue(new Error('unknown error'));

    try {
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await act(() => result.current.signInWithGoogle());
    } catch (err) {
      expect((err as { message: string }).message).toBe('Error: unknown error');
    }
  });
});
