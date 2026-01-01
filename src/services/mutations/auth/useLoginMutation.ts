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
    onSuccess: (data) => {
      // Save token, user, and companies data in cookies
      setAuthCookies({
        token: data.data.token,
        user: data.data.user,
        companies: data.data.companies,
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
