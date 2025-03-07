import { useState, useEffect } from 'react';
import { 
  User,
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../lib/firebase';

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
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

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: FirebaseError | unknown) {
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

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: FirebaseError | unknown) {
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
    try {
      setLoading(true);
      await firebaseSignOut(auth);
    } catch (err: FirebaseError | unknown) {
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