import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create()(
  persist(
    (set) => ({
      phoneNumber: null,
      token: null,
      user_id: null,
      user_name: null,
      searchedResults: [], //empty array for searched documents

      // setting phone number for verification
      setPhoneNumber: (phone) => set(() => ({ phoneNumber: phone })),
      setUserDetails: (data) =>
        set(() => ({
          token: data.token,
          user_id: data.user_id,
          user_name: data.user_name,
        })),

      handleLogout: () =>
        set(() => ({
          phoneNumber: null,
          token: null,
          user_id: null,
          user_name: null,
        })),

      setSearchedResults: (data) => set(() => ({ searchedResults: data })),
      clearSearchedResults: () => set(() => ({ searchedResults: [] })),
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
