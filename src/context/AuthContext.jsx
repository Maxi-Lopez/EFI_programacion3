'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';

const AuthContext = createContext();

const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
};

const extraerRol = (decoded) => {
  if (!decoded) return null;
  return decoded.role || decoded.rol || null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) return null;
    const decoded = decodeToken(token);
    const rol = extraerRol(decoded);
    return { token, username: decoded?.username || null, rol };
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (username, password) => {
    const data = await apiFetch('/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    document.cookie = `access_token=${data.access}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
    document.cookie = `refresh_token=${data.refresh}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    const decoded = decodeToken(data.access);
    setUser({ username, token: data.access, rol: extraerRol(decoded) });
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
