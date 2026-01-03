import { useMutation } from '@tanstack/react-query';
import { paths } from 'src/routes/paths';
import { register, RegisterPayload, RegisterResponse } from '../../api/auth';

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
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};

