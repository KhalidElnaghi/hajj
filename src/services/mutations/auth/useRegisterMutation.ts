import { useMutation } from '@tanstack/react-query';
import { paths } from 'src/routes/paths';
import { register, RegisterPayload, RegisterResponse } from '../../api/auth';
import { setAuthCookies } from '../../shared/auth-cookies';

interface UseRegisterMutationOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: any) => void;
}

export const useRegisterMutation = (options?: UseRegisterMutationOptions) => {
  const { onSuccess, onError } = options || {};

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (data: RegisterPayload) => {
      return register(data);
    },
    onSuccess: (data) => {
      setAuthCookies({
        token: data.data.token,
        user: data.data.user,
        companies: [],
      });

      if (onSuccess) {
        onSuccess(data);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get('returnTo') || paths.dashboard.root;

      window.location.href = returnTo;
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

