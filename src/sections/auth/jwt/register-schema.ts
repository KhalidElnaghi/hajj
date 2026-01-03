import * as Yup from 'yup';

export const createRegisterSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('name_required'))
      .min(2, t('name_min_length')),
    phone: Yup.string()
      .required(t('phone_required'))
      .matches(/^[0-9]+$/, t('phone_invalid')),
    email: Yup.string()
      .required(t('email_required'))
      .email(t('email_invalid')),
    password: Yup.string()
      .required(t('password_required'))
      .min(8, t('password_min')),
    password_confirmation: Yup.string()
      .required(t('password_confirmation_required'))
      .oneOf([Yup.ref('password')], t('passwords_must_match')),
    company_name: Yup.string()
      .required(t('company_name_required'))
      .min(2, t('company_name_min_length')),
  });

export type RegisterFormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  company_name: string;
};

