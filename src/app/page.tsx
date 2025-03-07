"use client";

import { LoginForm } from '@/components/auth/LoginForm';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md">
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
} 