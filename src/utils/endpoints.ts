export const endpoints = {
  auth: {
    login: '/auth/email-login',
    forgetPassword: '/auth/forget-password-by-email',
    verifyForgetPasswordOtp: '/auth/verify-forget-password-otp',
    resetPasswordByEmail: '/auth/reset-password-by-email',
  },
} as const;
