import { create } from 'zustand';
import { View } from '@/types';

interface State {
  view: View;
  setView: (view: View) => void;
}

export const useViewStore = create<State>((set) => ({
  view: 'table',

  setView: (view) => {
    set({ view });
  },
}));
