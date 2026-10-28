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

const extraerUsername = (decoded) => {
  if (!decoded) return null;
  return decoded.username || decoded.sub || decoded.user_name || decoded.email || decoded.name || decoded.preferred_username || null;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) return null;
    const decoded = decodeToken(token);
    const rol = extraerRol(decoded);
    const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    return { token, username: username || extraerUsername(decoded), rol };
  });
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleDeseo = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]);
  };

  const login = async (username, password) => {
    const data = await apiFetch('/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('username', username);
    document.cookie = `access_token=${data.access}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
    document.cookie = `refresh_token=${data.refresh}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    const decoded = decodeToken(data.access);
    setUser({ username, token: data.access, rol: extraerRol(decoded) });
    router.push('/catalogo');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('wishlist');
    document.cookie = 'access_token=; path=/; max-age=0';
    document.cookie = 'refresh_token=; path=/; max-age=0';
    setUser(null);
    setWishlist([]);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, wishlist, loading, login, logout, toggleDeseo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
