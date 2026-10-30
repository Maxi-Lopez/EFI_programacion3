import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  // DEBUG: log cookie presence
  console.log('[MIDDLEWARE]', { pathname, hasToken: !!token, cookieHeader: request.headers.get('cookie') });

  // 1. Rutas que SOLO pueden ver Admin y Vendedor
  const rutasAdmin = [
    '/dashboard',
    '/catalogo/nuevo',
    '/ventas',
    '/compras',
    '/proveedores',
    '/categorias',
  ];

  // 2. Rutas que requieren estar logueado (cualquier rol)
  const rutasLogueado = [
    '/lista-deseos',
  ];

  // Helper para ver si la URL actual coincide con alguna ruta de la lista
  const coincideRuta = (rutas) => rutas.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );

  const esRutaAdmin = coincideRuta(rutasAdmin);
  const esRutaLogueado = coincideRuta(rutasLogueado);

  // Si no es ninguna ruta protegida, lo dejamos pasar
  if (!esRutaAdmin && !esRutaLogueado) {
    return NextResponse.next();
  }

  // 3. Si no hay token, lo mandamos al login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 4. Si hay token y es ruta admin, verificamos el rol
  if (esRutaAdmin) {
    try {
      // Decodificamos el payload del JWT (la segunda parte del token)
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      
      const rol = payload.rol || payload.role || payload.user_type;
      
      const esAdmin = rol === 'admin' || rol === 'administrador' || rol === 'vendedor';

      if (!esAdmin) {
        // Si es un cliente intentando entrar a ruta admin, lo mandamos al catálogo
        return NextResponse.redirect(new URL('/catalogo', request.url));
      }
    } catch (error) {
      // Si el token está corrupto o no tiene formato JWT válido
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/catalogo/nuevo/:path*',
    '/ventas/:path*',
    '/compras/:path*',
    '/proveedores/:path*',
    '/categorias/:path*',
    '/lista-deseos/:path*',
  ],
};