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
        // No company selection needed, redirect to main route or returnTo page
        if (onSuccess) {
          onSuccess(data);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const returnTo = urlParams.get('returnTo') || paths.dashboard.root;

        window.location.href = returnTo;
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};
