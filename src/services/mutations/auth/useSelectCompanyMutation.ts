import { useMutation } from '@tanstack/react-query';
import { paths } from 'src/routes/paths';
import { selectCompany, SelectCompanyResponse } from '../../api/auth';
import { setAuthCookies } from '../../shared/auth-cookies';
import Cookie from 'js-cookie';

interface UseSelectCompanyMutationOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useSelectCompanyMutation = (options?: UseSelectCompanyMutationOptions) => {
  const { onSuccess, onError } = options || {};

  return useMutation<SelectCompanyResponse, Error, number | string>({
    mutationFn: async (companyId: number | string) => {
      return selectCompany(companyId);
    },
    onSuccess: (data) => {
      // Get companies from cookies (they were saved during login)
      const companiesCookie = Cookie.get('companies');
      const companies = companiesCookie ? JSON.parse(companiesCookie) : [];

      setAuthCookies({
        token: data.data.token,
        user: data.data.user,
        companies: companies,
      });

      if (onSuccess) {
        onSuccess();
      }

      // Check for returnTo parameter in URL
      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get('returnTo') || paths.dashboard.root;

      // Redirect to returnTo page or main route
      window.location.href = returnTo;
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
    },
  });
};
