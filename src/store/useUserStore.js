import { create } from "zustand";

export const useUserStore = create((set) => ({
  phoneNumber: null,
  token: "9a8sd7f9a87fsd98a7sdf987a9sdf7a9s8df7a9s8df",
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

  handleLogout: () =>
    set(() => ({
      phoneNumber: null,
      token: null,
      user_id: null,
      user_name: null,
    })),
}));
