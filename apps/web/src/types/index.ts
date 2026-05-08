export type Role = 'ADMIN' | 'EMPLOYEE';
export type NoteType = 'CONTADO' | 'CREDITO';
export type NoteStatus =
  | 'PAGADA'
  | 'PENDIENTE'
  | 'PROXIMA_A_VENCER'
  | 'VENCIDA';
export type PaymentMethod = 'EFECTIVO' | 'TRANSFERENCIA' | 'CLIP';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Customer {
  id: string;
  name: string;
  facebookAlias?: string;
  address?: string;
  phone1?: string;
  phone2?: string;
  createdAt: string;
}

export interface NoteItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  clipReference?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  type: NoteType;
  subTotal: number;
  total: number;
  dueDate: string;
  trackingNumber?: string;
  customer: Customer;
  items: NoteItem[];
  payments: Payment[];
  balance: number;
  status: NoteStatus;
  daysLeft: number;
  createdAt: string;
}

export interface NavigationLink {
  description: string;
  href: string;
  icon: React.ReactNode;
  title: string;
}

export interface Column<T> {
  header: string;
  key: keyof T;
  shouldSkipRender?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface SharedButtonProps {
  size?: number;
  title?: string;
  onClick?: () => void;
}

export type View = 'table' | 'grid';

export interface FormInputType {
  label: string;
  component?: React.ElementType;
  props?: Record<string, string>;
}
