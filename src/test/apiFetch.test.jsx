import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiFetch } from '@/utils/apiClient';

const BASE_URL = 'http://127.0.0.1:8000/api';

describe('apiFetch', () => {
  let fetchMock;
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {};
    fetchMock = vi.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => localStorageMock[key] || null),
        setItem: vi.fn((key, value) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key) => {
          delete localStorageMock[key];
        }),
      },
      writable: true,
    });

    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('realiza GET y devuelve datos parseados', async () => {
    const data = [{ id: 1, nombre: 'Producto A' }];
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
    );

    const resultado = await apiFetch('/catalogo/producto-get/');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/catalogo/producto-get/`, expect.objectContaining({ headers: { 'Content-Type': 'application/json' } }));
    expect(resultado).toEqual(data);
  });

  it('envía el token en el header Authorization cuando existe', async () => {
    localStorageMock['access_token'] = 'token-prueba';
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    await apiFetch('/catalogo/producto/', { method: 'POST', body: JSON.stringify({}) });

    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_URL}/catalogo/producto/`,
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer token-prueba' }),
      })
    );
  });
});
