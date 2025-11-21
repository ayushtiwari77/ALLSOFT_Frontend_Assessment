import { create } from "zustand";

export const useUserStore = create((set) => ({
  phoneNumber: null,
  token: null,
  user_id: null,
  user_name: null,

  // setting phone number for verification
  setPhoneNumber: (phone) => set(() => ({ phoneNumber: phone })),
  setUserDetails: (data) =>
    set(() => ({
      token: data.token,
      user_id: data.user_id,
      user_name: data.user_name,
    })),
}));
