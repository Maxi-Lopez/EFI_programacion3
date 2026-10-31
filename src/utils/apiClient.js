const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

import { getCookie } from './cookies';

export async function apiFetch(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? getCookie('access_token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
    headers,
  });

  if (response.status === 401) {
    const refresh = typeof window !== 'undefined' ? getCookie('refresh_token') : null;
    if (refresh) {
      const refreshRes = await fetch(`${BASE_URL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:';
        const secureFlag = isProduction ? '; Secure' : '';
        document.cookie = `access_token=${data.access}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax${secureFlag}`;
        headers['Authorization'] = `Bearer ${data.access}`;
        return fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
      } else {
        const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:';
        const secureFlag = isProduction ? '; Secure' : '';
        document.cookie = `access_token=; path=/; max-age=0${secureFlag}`;
        document.cookie = `refresh_token=; path=/; max-age=0${secureFlag}`;
        throw new Error('Sesión expirada');
      }
    }
  }

  if (!response.ok) {
    let errorMessage = 'Error en la petición';
    try {
      const errorData = await response.json();
      if (response.status === 400 && typeof errorData === 'object' && errorData !== null) {
        const firstField = Object.values(errorData).flat()[0];
        errorMessage = typeof firstField === 'string' ? firstField : JSON.stringify(errorData);
      } else {
        errorMessage = errorData.detail || JSON.stringify(errorData);
      }
    } catch {
      errorMessage = `Error ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
