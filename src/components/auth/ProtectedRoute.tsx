import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  bypassAuth?: boolean; // Add option to bypass authentication for development
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  bypassAuth = true // Set to true by default for now during development
}) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user && !bypassAuth) {
      router.push('/');
    }
  }, [user, loading, router, bypassAuth]);

  if (loading && !bypassAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Allow access to the page if bypassAuth is true or user is authenticated
  if (bypassAuth || user) {
    return <>{children}</>;
  }

  return null;
}; 