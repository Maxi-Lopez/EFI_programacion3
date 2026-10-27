'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Credenciales inválidas');
    const data = await res.json();
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    document.cookie = `access_token=${data.access}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
    document.cookie = `refresh_token=${data.refresh}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    setUser({ username });
    router.push('/catalogo');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
