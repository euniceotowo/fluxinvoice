'use client';

import ForgotPasswordPage from '@/components/features/auth/forgot-password-page';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
  

function handleForgotPassword(){
    console.log('Forgot password clicked');
    router.push("/forgotpassword")

}

  const handleBackToLogin= () => {
    console.log('Forgot password clicked'); 
    router.push("/login")

  };

  return (
    <div data-theme="light">
      <ForgotPasswordPage
        onBackToLogin={handleBackToLogin}
        onForgotPassword={handleForgotPassword}
      />
    </div>
  );
}

