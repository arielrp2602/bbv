import api from '@/lib/axios';
import { create } from 'zustand';
import { Customer } from '@/types';
import { getRequestErrorMessage } from '@/utils';

interface State {
  customers: Customer[];
  loading: boolean;
  error: string;
  fetchCustomers: (name?: string) => Promise<void>;
}

export const useCustomerStore = create<State>((set) => ({
  customers: [],
  loading: false,
  error: '',

  fetchCustomers: async (name?: string) => {
    try {
      set({ loading: true, error: '' });

      const res = await api.get('/customers', {
        params: { name },
      });

      set({ customers: res.data });
    } catch (err: any) {
      set({
        error: getRequestErrorMessage(err),
      });
    } finally {
      set({ loading: false });
    }
  },
}));
