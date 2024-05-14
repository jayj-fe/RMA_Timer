import { create } from 'zustand';

const useFilterStore = create((set) => ({
  userFilterList: [],
  setUserFilterList: (arrs) => set(()=>({ userFilterList: arrs })),
}));

export default useFilterStore;