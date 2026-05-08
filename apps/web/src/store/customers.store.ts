import api from '@/lib/axios';
import { create } from 'zustand';
import { Customer } from '@/types';
import { getRequestErrorMessage } from '@/utils';
import { CustomerDto } from '@/schemas/customer.schema';

interface State {
  customers: Customer[];
  isLoading: boolean;
  error: string;
  selectedCustomer: Customer | null;
  showCreateSheet: boolean;
  setSelectedCustomer: (c: Customer | null) => void;
  setShowCreateSheet: (showCreateSheet: boolean) => void;
  createCustomer: (data: CustomerDto) => Promise<void>;
  updateCustomer: (id: string, data: CustomerDto) => Promise<void>;
  fetchCustomers: (name?: string) => Promise<void>;
}

export const useCustomerStore = create<State>((set) => ({
  customers: [],
  isLoading: false,
  error: '',
  selectedCustomer: null,
  showCreateSheet: false,
  setShowCreateSheet: (showCreateSheet) => {
    set({ showCreateSheet });
  },
  createCustomer: async (data) => {
    try {
      set({ isLoading: true, error: '' });

      const res = await api.post('/customers', data);

      set((state) => ({
        customers: [...state.customers, res.data],
      }));
    } catch (err: unknown) {
      set({
        error: getRequestErrorMessage(err),
      });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCustomers: async (name?: string) => {
    try {
      set({ isLoading: true, error: '' });

      const res = await api.get('/customers', {
        params: { name },
      });

      set({ customers: res.data });
    } catch (err: unknown) {
      set({
        error: getRequestErrorMessage(err),
      });
    } finally {
      set({ isLoading: false });
    }
  },
  setSelectedCustomer: (selectedCustomer) => {
    console.log('hi', { selectedCustomer });
    set({ selectedCustomer });
  },
  updateCustomer: async (id, data) => {
    try {
      set({ isLoading: true, error: '' });

      await api.patch(`/customers/${id}`, data);

      set((state) => ({
        selectedCustomer: { ...state.selectedCustomer!, ...data },
        customers: state.customers.map((c) =>
          c.id !== id ? c : { ...c, ...data },
        ),
      }));
    } catch (err: unknown) {
      set({
        error: getRequestErrorMessage(err),
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
