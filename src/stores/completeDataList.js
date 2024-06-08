import { create } from 'zustand';

const useCompleteDataList = create((set) => ({
  useCompleteData: [],
  setUseCompleteData: (arrs) => set(()=>({ useCompleteData: arrs })),
}));

export default useCompleteDataList;