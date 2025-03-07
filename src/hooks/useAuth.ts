import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth, createMockUser } from '../lib/firebase';

// Flag to enable mock authentication for development
const USE_MOCK_AUTH = true; // Set to false when you want to use real Firebase auth

export interface AuthError {
  code: string;
  message: string;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    if (USE_MOCK_AUTH) {
      // Use mock user for development
      setUser(createMockUser() as unknown as User);
      setLoading(false);
      return () => {};
    } else {
      // Use real Firebase auth
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      
      return () => unsubscribe();
    }
  }, []);

  const validateGauntletEmail = (email: string): boolean => {
    return email.endsWith('@gauntletai.com');
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null);
    
    if (!validateGauntletEmail(email)) {
      setError({ 
        code: 'auth/invalid-email-domain', 
        message: 'Only gauntletai.com email addresses are allowed'
      });
      return;
    }

    if (USE_MOCK_AUTH) {
      // Simulate successful login with mock user
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(createMockUser() as unknown as User);
      } catch (err) {
        setError({
          code: 'auth/mock-error',
          message: 'Mock authentication error'
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError({
        code: firebaseErr.code || 'auth/unknown',
        message: firebaseErr.message || 'An unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setError(null);
    
    if (!validateGauntletEmail(email)) {
      setError({ 
        code: 'auth/invalid-email-domain', 
        message: 'Only gauntletai.com email addresses are allowed'
      });
      return;
    }

    if (USE_MOCK_AUTH) {
      // Simulate successful signup with mock user
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(createMockUser() as unknown as User);
      } catch (err) {
        setError({
          code: 'auth/mock-error',
          message: 'Mock authentication error'
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError({
        code: firebaseErr.code || 'auth/unknown',
        message: firebaseErr.message || 'An unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setError(null);

    if (USE_MOCK_AUTH) {
      // Simulate sign out
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(null);
      } catch (err) {
        setError({
          code: 'auth/mock-error',
          message: 'Mock authentication error'
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      await firebaseSignOut(auth);
    } catch (err: unknown) {
      const firebaseErr = err as FirebaseError;
      setError({
        code: firebaseErr.code || 'auth/unknown',
        message: firebaseErr.message || 'An unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    signUp
  };
} 