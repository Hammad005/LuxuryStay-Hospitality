import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const guestStore = create((set, get) => ({
  guest: null,
  guestLoading: false,
  checkingGuestAuth: true,
  success: false,

  checkGuestAuth: async () => {
    set({ checkingGuestAuth: true });
    try {
      const response = await axios.get("/guest/checkAuth");
      set({ guest: response.data.guest, checkingGuestAuth: false });
    } catch (error) {
      set({ checkingGuestAuth: false, user: null, error: error });
    } finally {
      set({ checkingGuestAuth: false });
    }
  },

  setGuest: (guest) => {
    set({ guest: guest });
  },

  signup: async (data) => {
    set({ guestLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await axios.post("/guest/createGuest", data);
      set({ guest: response.data.guest, guestLoading: false });
      toast.success("Signup successful");
    } catch (error) {
      set({ guestLoading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  logout: async () => {
    set({ guestLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.post("/guest/logout");
      set({ guest: null, guestLoading: false });
      toast.success("Logout successful");
    } catch (error) {
      set({ guestLoading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  updateProfile: async (id, data) => {
    set({ guestLoading: true, success: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await axios.put(`/guest/updateGuest/${id}`, data);
      set({ guestLoading: false, guest: response.data.guest, success: true });
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (error) {
      set({ guestLoading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
      return { success: false };
    }
  },

  resetSuccess: () => set({ success: false }),
}));
