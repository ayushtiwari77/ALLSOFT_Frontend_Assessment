import { create } from "zustand";

export const useUserStore = create((set) => ({
  phoneNumber: 9340487454,
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcF9hZGRyZXNzIjoiNDkuNDcuOS4yNDYiLCJ1bmlxdWVfaWQiOiI5MzQwNDg3NDU0IiwidXNlcl9uYW1lIjoiOTM0MDQ4NzQ1NCIsImFjY2Vzc190eXBlIjoiZW1wIiwibW9iaWxlIjoiOTM0MDQ4NzQ1NCIsImNsaWVudF9pZCI6ImFsbHNvZnQiLCJleHAiOjE3NjYzOTIzNTJ9.Lukco6v8FYrmbm5sLkO7WOTzEqIuAfs3iBP3_zOYyhU",
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
}));
