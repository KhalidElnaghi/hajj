export const endpoints = {
  auth: {
    login: '/login',
    register: '/register',
    selectCompany: '/select-company',
    forgetPassword: '/auth/forget-password-by-email',
    verifyForgetPasswordOtp: '/auth/verify-forget-password-otp',
    resetPasswordByEmail: '/auth/reset-password-by-email',
  },
} as const;
