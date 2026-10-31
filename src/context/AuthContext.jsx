'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import { getCookie } from '@/utils/cookies';

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
    const token = typeof window !== 'undefined' ? getCookie('access_token') : null;
    if (!token) return null;
    const decoded = decodeToken(token);
    const rol = extraerRol(decoded);
    const username = extraerUsername(decoded);
    return { token, username, rol };
  });
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = getCookie('wishlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.cookie = `wishlist=${JSON.stringify(wishlist)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
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
    const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const secureFlag = isProduction ? '; Secure' : '';
    document.cookie = `access_token=${data.access}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax${secureFlag}`;
    document.cookie = `refresh_token=${data.refresh}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${secureFlag}`;
    const decoded = decodeToken(data.access);
    setUser({ username: extraerUsername(decoded) || username, token: data.access, rol: extraerRol(decoded) });
    router.push('/catalogo');
  };

  const logout = () => {
    const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const secureFlag = isProduction ? '; Secure' : '';
    document.cookie = `access_token=; path=/; max-age=0${secureFlag}`;
    document.cookie = `refresh_token=; path=/; max-age=0${secureFlag}`;
    setUser(null);
    setWishlist([]);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, wishlist, login, logout, toggleDeseo }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
