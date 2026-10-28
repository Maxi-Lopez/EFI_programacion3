import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  const rutasProtegidas = [
    '/catalogo/nuevo',
    '/ventas',
    '/compras',
    '/proveedores',
    '/categorias',
  ];

  const estaEnRutaProtegida = rutasProtegidas.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );

  if (estaEnRutaProtegida && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/catalogo/nuevo', '/ventas', '/compras', '/proveedores', '/categorias'],
};
