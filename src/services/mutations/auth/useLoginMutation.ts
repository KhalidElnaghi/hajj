import { useMutation } from '@tanstack/react-query';
import { paths } from 'src/routes/paths';
import { login, LoginPayload, LoginResponse } from '../../api/auth';
import { setAuthCookies } from '../../shared/auth-cookies';

interface UseLoginMutationOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useLoginMutation = (options?: UseLoginMutationOptions) => {
  const { onSuccess, onError } = options || {};

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (data: LoginPayload) => {
      return login(data);
    },
    onSuccess: (data, variables) => {
      // Save tokens and user data in cookies
      setAuthCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpireAt: data.accessTokenExpireAt,
        refreshTokenExpireAt: data.refreshTokenExpireAt,
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          role: data.role,
          completeTeacherProfile: data.completeTeacherProfile,
          accessToken: data.accessToken,
        },
        rememberMe: variables.rememberMe || false,
      });

      // Call custom onSuccess if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Default: redirect to dashboard using full page reload
        // This ensures auth context re-initializes with new cookies
        const returnTo = paths.dashboard.root;
        window.location.href = returnTo;
      }
    },
    onError: (error) => {
      // Call custom onError if provided
      if (onError) {
        onError(error);
      }
    },
  });
};

