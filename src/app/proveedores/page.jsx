'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';

export default function ProveedoresPage() {
  const { user } = useAuth();
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/proveedores/proveedor-get/');
        if (montado) setProveedores(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar los proveedores');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  if (loading) return <Cargando mensaje="Cargando proveedores…" />;
  if (error) return <div className="container mx-auto p-4 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Proveedores</h1>
      {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
        <div className="mb-4">
          <p className="text-sm text-slate-600">Total de proveedores: {proveedores.length}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {proveedores.map((prov) => (
          <Card key={prov.id} className="flex flex-col">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">
              {prov.nombre || prov.razon_social || prov.empresa || 'Proveedor'}
            </h2>
            <p className="text-sm text-slate-500 mb-2">
              {prov.contacto || prov.contacto_nombre || ''}
            </p>
            <p className="text-sm text-slate-500 mb-2">
              {prov.telefono || prov.telefono_contacto || ''}
            </p>
            <p className="text-sm text-slate-500 mb-2">
              {prov.direccion || prov.direccion_fiscal || ''}
            </p>
          </Card>
        ))}
      </div>
      {proveedores.length === 0 && (
        <div className="text-center py-10 text-slate-500">No hay proveedores registrados.</div>
      )}
    </div>
  );
}
