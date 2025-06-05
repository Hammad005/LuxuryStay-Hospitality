import { toast } from "sonner";
import axios from "../lib/axios";
import { create } from "zustand";

export const staffStore = create((set, get) => ({
  staff: null,
  staffLoading: false,
  success: false,
  checkingstaffAuth: true,
  allStaff: [],

  checkStaffAuth: async () => {
    set({ checkingstaffAuth: true });
    try {
      const response = await axios.get("/staffAuth/checkAuth");
      set({ staff: response.data.staff, checkingstaffAuth: false });
    } catch (error) {
      set({ checkingstaffAuth: false, staff: null, error: error });
    } finally {
      set({ checkingstaffAuth: false });
    }
  },

  setStaff: (staff) => {
    set({ staff: staff });
  },

  resetSuccess: () => {
    set({ success: false });
  },

  staffLogout: async () => {
    set({ staffLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.post("/staffAuth/logout");
      set({ staff: null, staffLoading: false });
      toast.success("Logout successful");
    } catch (error) {
      set({ staffLoading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },
  registerStaff: async (data) => {
    set({ staffLoading: true, success: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await axios.post("/staffAuth/register", data);
      set({ staffLoading: false, success: true });

      get().getAllStaff(); // Refresh staff data after registration
      toast.success("Registration successful");

      return { success: true };
    } catch (error) {
      set({ staffLoading: false, success: false });
      toast.error(error.response?.data?.error || "An error occurred");

      return { success: false };
    }
  },

  getAllStaff: async () => {
    set({ staffLoading: true });
    try {
      const response = await axios.get("/staffAuth/getAllStaff");
      set({ allStaff: response.data.staff, staffLoading: false });
    } catch (error) {
      set({ staffLoading: false, error: error });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  deleteStaff: async (id) => {
    set({ staffLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.delete(`/staffAuth/deleteStaff/${id}`);
      set({ staffLoading: false });
      get().getAllStaff(); // Refresh staff data after deletion
      toast.success("Staff deleted successfully");
    } catch (error) {
      set({ staffLoading: false });
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  updateStaff: async (id, data) => {
    set({ staffLoading: true, success: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.put(`/staffAuth/updateStaff/${id}`, data);
      set({ staffLoading: false, success: true });
      get().getAllStaff(); // Refresh staff data after update
      toast.success("Staff updated successfully");
      return { success: true };
    } catch (error) {
      set({ staffLoading: false, success: false });
      toast.error(error.response.data.error || "An error occurred");
      return { success: false };
    }
  },
}));
