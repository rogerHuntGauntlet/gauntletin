import React, { useState, FormEvent } from 'react';
import { useAuthContext } from '../../context/AuthContext';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, error, loading } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      // Error is handled by the auth hook
    }
  };

  const validateEmail = (email: string): boolean => {
    return email.endsWith('@gauntletai.com');
  };

  const isEmailValid = email === '' || validateEmail(email);

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">GauntletIn</h1>
        <h2 className="mt-2 text-xl font-semibold text-gray-700">
          {isSignUp ? 'Create your account' : 'Sign in to your account'}
        </h2>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                ${!isEmailValid ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {!isEmailValid && (
            <p className="mt-2 text-sm text-red-600">
              Only gauntletai.com email addresses are allowed
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error.message}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading || !isEmailValid}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${loading || !isEmailValid 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-500"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : 'Need an account? Sign up'}
        </button>
      </div>
    </div>
  );
}; 