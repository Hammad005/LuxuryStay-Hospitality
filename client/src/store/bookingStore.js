import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { roomStore } from "./roomStore";

export const bookingStore = create((set, get) => ({
  allBookings: [],
  userBookings: [],
  bookingLoading: false,
  success: false,

  createBooking: async (data) => {
    set({ bookingLoading: true, success: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.post("/booking/createBooking", data);
      get().getGuestBookings();
      roomStore.getState().getRooms();
      set({ bookingLoading: false, success: true });
      toast.success("Booking created successfully!");
      return { success: true };
    } catch (error) {
      set({ bookingLoading: false, success: false });
      roomStore.getState().getRooms();
      toast.error(error?.response?.data?.error || "An error occurred");
      return { success: false };
    }
  },

  getAllBookings: async () => {
    set({ bookingLoading: true });
    try {
      const response = await axios.get("/booking/getAllBookings");
      set({ allBookings: response.data.bookings, bookingLoading: false });
    } catch (error) {
      set({ bookingLoading: false });
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  },

  getGuestBookings: async () => {
    set({bookingLoading: true});
    try {
      const response = await axios.get("/booking/getGuestBookings");
      set({ userBookings: response.data.bookings, bookingLoading: false });
    } catch (error) {
      set({ bookingLoading: false });
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  },

  cancelBooking: async (id) => {
    set({ bookingLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.put(`/booking/cancelBooking/${id}`);
      get().getGuestBookings();
      roomStore.getState().getRooms();
      set({ bookingLoading: false });
      toast.success("Booking cancelled successfully");
    } catch (error) {
      set({ bookingLoading: false });
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  },
  cancelBookingByStaff: async (id) => {
    set({ bookingLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await axios.put(`/booking/cancelBookingByStaff/${id}`);
      get().getAllBookings();
      roomStore.getState().getRooms();
      set({ bookingLoading: false });
      toast.success("Booking cancelled successfully");
    } catch (error) {
      set({ bookingLoading: false });
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  },

  resetSuccess: () => set({ success: false })
}));
