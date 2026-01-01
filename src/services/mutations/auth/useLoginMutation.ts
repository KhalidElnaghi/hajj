import { useMutation } from '@tanstack/react-query';
import { paths } from 'src/routes/paths';
import { login, LoginPayload, LoginResponse } from '../../api/auth';
import { setAuthCookies } from '../../shared/auth-cookies';

interface UseLoginMutationOptions {
  onSuccess?: (data: LoginResponse) => void;
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

      // Check if company selection is required
      if (data.data.requires_company_selection) {
        // Don't redirect, let the component handle company selection
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        // No company selection needed, redirect to dashboard
        if (onSuccess) {
          onSuccess(data);
        } else {
          // Default: redirect to dashboard using full page reload
          const returnTo = paths.dashboard.root;
          window.location.href = returnTo;
        }
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
