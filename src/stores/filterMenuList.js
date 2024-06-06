import { create } from 'zustand';

const useFilterMenuList = create((set) => ({
  useTranOwnerList: [],
  setUserTranOwnerList: (arrs) => set(()=>({ useTranOwnerList: arrs })),
  useFinalRmaStatusLists: [],
  setUseFinalRmaStatusLists: (arrs) => set(()=>({ useFinalRmaStatusLists: arrs })),
}));

export default useFilterMenuList;