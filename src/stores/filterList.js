import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFilterStore = create(
  persist(
    set => ({
      userFilterList: [],
      setUserFilterList: (arrs) => set({ userFilterList : arrs }),
    }),
    {
      name: 'userFilter',
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            // console.log(state.userFilterList)
            // state.setUserFilterList(state.userFilterList)
            // this.userFilterList = state.userFilterList
          }
        }
      },
    }
  )
);

export default useFilterStore;