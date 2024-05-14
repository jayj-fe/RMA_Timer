import { create } from 'zustand';

const useTranOwner = create((set) => ({
  useTranOwnerList: [],
  setUserTranOwnerList: (arrs) => set(()=>({ useTranOwnerList: arrs })),
}));

export default useTranOwner;