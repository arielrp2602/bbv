import api from '@/lib/axios';
import { create } from 'zustand';
import { Customer } from '@/types';
import { getRequestErrorMessage } from '@/utils';

interface State {
  customers: Customer[];
  isLoading: boolean;
  error: string;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (c: Customer | null) => void;
  updateCustomer: (id: string, data: Partial<Customer>) => Promise<void>;
  fetchCustomers: (name?: string) => Promise<void>;
}

export const useCustomerStore = create<State>((set) => ({
  customers: [],
  isLoading: false,
  error: '',
  selectedCustomer: null,

  fetchCustomers: async (name?: string) => {
    try {
      set({ isLoading: true, error: '' });

      const res = await api.get('/customers', {
        params: { name },
      });

      set({ customers: res.data });
    } catch (err: any) {
      set({
        error: getRequestErrorMessage(err),
      });
    } finally {
      set({ isLoading: false });
    }
  },
  setSelectedCustomer: (selectedCustomer) => {
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
    } catch (err: any) {
      set({
        error: getRequestErrorMessage(err),
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
