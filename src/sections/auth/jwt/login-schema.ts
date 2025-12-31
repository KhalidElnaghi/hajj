import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('البريد الإلكتروني أو اسم المستخدم مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: Yup.string()
    .required('كلمة السر مطلوبة')
    .min(8, 'كلمة السر يجب أن تكون على الأقل 8 أحرف'),
  company: Yup.string().required('يرجى اختيار الشركة'),
  rememberMe: Yup.boolean().default(false),
});

export type LoginFormValues = Yup.InferType<typeof loginSchema>;

