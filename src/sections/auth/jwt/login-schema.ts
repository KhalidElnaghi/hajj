import * as Yup from 'yup';

export const createLoginSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .required(t('email_required'))
      .email(t('email_invalid')),
    password: Yup.string()
      .required(t('password_required'))
      .min(8, t('password_min')),
    company: Yup.string().required(t('company_required')),
    rememberMe: Yup.boolean().default(false),
  });

export type LoginFormValues = {
  email: string;
  password: string;
  company: string;
  rememberMe: boolean;
};

