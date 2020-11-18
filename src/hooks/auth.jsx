import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Investimento:token');
    const user = localStorage.getItem('@Investimento:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async (dados) => {
    const response = await api.post('session', dados);

    const { token, user } = response.data.data;

    localStorage.setItem('@Investimento:token', token);
    localStorage.setItem('@Investimento:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Investimento:token');
    localStorage.removeItem('@Investimento:user');

    setData({});
  }, []);

  const register = useCallback(async (dados) => {
    await api.post('users', dados);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
