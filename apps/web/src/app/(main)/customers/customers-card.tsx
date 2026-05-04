'use client';

import { Card } from '@/components/card/card';
import { Customer } from '@/types';
import { useMemo } from 'react';

interface Props {
  customer: Customer;
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="p-3 rounded-4xl bg-black text-white uppercase">
      {initials}
    </div>
  );
}

export function CustomerCard({ customer }: Props) {
  const initials = useMemo(
    () =>
      customer.name
        .split('')
        .map((n) => n[0])
        .join(''),
    [customer],
  );
  return (
    <Card>
      <Card.Header className="flex gap-2">
        <Avatar initials={initials} />
        <div className="flex flex-col gap-1">
          <div className="font-bold">{customer.name}</div>
          {!!customer.facebookAlias && (
            <div className="text-sm text-gray-100">
              {customer.facebookAlias}
            </div>
          )}
        </div>
      </Card.Header>
      <Card.Body className="flex flex-col gap-2">
        {!customer.phone1 && !customer.phone2 ? (
          <div className="text-md text-gray-100">
            No hay teléfonos registrados
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

/**
 * Header de la card:

Avatar con las iniciales del cliente — círculo azul con las primeras letras de su nombre
Al lado del avatar, nombre del cliente en bold y alias de Facebook en gris pequeño abajo

Separador:

Línea horizontal gris claro border-gray-100 con margen vertical

Body de la card:

Teléfono 1 con un ícono de teléfono a la izquierda
Teléfono 2 si existe, mismo estilo
Si no tiene teléfono mostrar "Sin teléfono" en gris

Footer de la card:

Botón "Ver detalle" que ocupa el ancho completo
Borde azul, texto azul, fondo transparente
Al hacer hover fondo azul claro
 */
