'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModernNewPasswordView from 'src/sections/auth/jwt/modern-new-password-view';

export default function ModernNewPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Read email from sessionStorage instead of query params
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('forgotPasswordEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        // If no email in sessionStorage, redirect to forgot password
        router.push('/forgot-password');
      }
    }
  }, [router]);

  if (!email) {
    return null; // or a loading spinner
  }

  return <ModernNewPasswordView email={email} />;
}
