'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';

export default function VentasPage() {
  const { user } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/ventas/venta-get/');
        if (montado) setVentas(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar las ventas');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  if (loading) return <Cargando mensaje="Cargando ventas…" />;
  if (error) return <div className="container mx-auto p-4 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Ventas</h1>
      {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
        <div className="mb-4">
          <p className="text-sm text-slate-600">Total de ventas: {ventas.length}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ventas.map((venta) => (
          <Card key={venta.id} className="flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-slate-800">
                Venta #{venta.id || venta.pk || ''}
              </h2>
              <span className="text-sm font-medium text-slate-600">
                {venta.fecha || venta.fecha_venta || venta.fecha_compra || ''}
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-2">
              Cliente: {venta.cliente || venta.cliente_nombre || venta.username || '—'}
            </p>
            <div className="mt-auto pt-2">
              <span className="text-sm font-bold text-slate-800">
                Total: ${venta.total || venta.total_venta || venta.monto || '0.00'}
              </span>
            </div>
          </Card>
        ))}
      </div>
      {ventas.length === 0 && (
        <div className="text-center py-10 text-slate-500">No hay ventas registradas.</div>
      )}
    </div>
  );
}
