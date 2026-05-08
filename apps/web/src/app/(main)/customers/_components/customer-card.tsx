'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Customer } from '@/types';
import { useMemo } from 'react';

interface Props {
  customer: Customer;
  onClick?: () => void;
  tabIndex?: number;
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="py-1.5 px-2 rounded-4xl bg-primary text-primary-foreground uppercase">
      {initials}
    </div>
  );
}

export function CustomerCard({ customer, onClick, tabIndex }: Props) {
  const initials = useMemo(
    () =>
      customer.name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0] ?? '')
        .join(''),
    [customer],
  );
  return (
    <Card
      className="h-full cursor-pointer hover:-translate-y-1 transition-transform"
      role={onClick ? 'button' : undefined}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
      <CardContent className="flex items-center h-full gap-2.5">
        <Avatar initials={initials} />
        <div className="flex flex-col items-start gap-1">
          <div data-testid="customer-name" className="font-bold">
            {customer.name}
          </div>
          {!!customer.facebookAlias && (
            <div
              data-testid="facebook-alias"
              className="text-sm text-muted-foreground"
            >
              {customer.facebookAlias}
            </div>
          )}
          {!customer.phone1 && !customer.phone2 ? (
            <div className="text-sm text-muted-foreground">
              No hay teléfonos registrados
            </div>
          ) : (
            <>
              {!!customer.phone1 && (
                <div data-testid="phone1">{customer.phone1}</div>
              )}
              {!!customer.phone2 && (
                <div data-testid="phone2">{customer.phone2}</div>
              )}
            </>
          )}
        </div>
      </CardContent>
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
