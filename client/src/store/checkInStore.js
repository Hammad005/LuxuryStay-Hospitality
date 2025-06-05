import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { bookingStore } from "./bookingStore";
import { roomStore } from "./roomStore";

export const checkInStore = create((set, get) => ({
    allCheckIns: [],
    userCheckIns: [],
    checkInLoading: false,
    success: false,

    resetSuccess: () => {
        set({ success: false });
    },

    createBookingCheckIn: async (data) => {
        set({ checkInLoading: true, success: false });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.post("/checkIn/createBookingCheckIn", data);
            get().getUserCheckIns();
            bookingStore.getState().getGuestBookings();
            set({ checkInLoading: false, success: true });
            toast.success("Check-in successfully!");
            return { success: true };
        } catch (error) {
            set({ checkInLoading: false, success: false });
            toast.error(error.response.data.error || "An error occurred");
            return { success: false };
        }
    },
    createBookingCheckInByStaff: async (data) => {
        set({ checkInLoading: true, success: false });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.post("/checkIn/createBookingCheckInByStaff", data);
            get().getAllCheckIns();
            bookingStore.getState().getAllBookings();
            set({ checkInLoading: false, success: true });
            toast.success("Check-in successfully!");
            return { success: true };
        } catch (error) {
            set({ checkInLoading: false, success: false });
            toast.error(error.response.data.error || "An error occurred");
            return { success: false };
        }
    },

    createDirectCheckIn: async (data) => {
          set({ checkInLoading: true, success: false });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.post("/checkIn/createDirectCheckIn", data);
            get().getUserCheckIns();
            roomStore.getState().getRooms();
            set({ checkInLoading: false, success: true });
            toast.success("Check-in successfully!");
            return { success: true };
        } catch (error) {
            set({ checkInLoading: false, success: false });
            roomStore.getState().getRooms();
            toast.error(error.response.data.error || "An error occurred");
            return { success: false };
        }
    },

    getUserCheckIns: async () => {
        set({ checkInLoading: true });
        try {
            const response = await axios.get("/checkIn/getUserCheckIns");
            set({ userCheckIns: response.data.checkIns, checkInLoading: false });
        } catch (error) {
            set({ checkInLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },

    getAllCheckIns: async () => {
        set({ checkInLoading: true });
        try {
            const response = await axios.get("/checkIn/getAllCheckIns");
            set({ allCheckIns: response.data.checkIns, checkInLoading: false });
        } catch (error) {
            set({ checkInLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },

    addService: async (data) => {
        set({ checkInLoading: true});
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.put("/checkIn/addService", data);
            get().getUserCheckIns();
            set({ checkInLoading: false});
            toast.success("Service added successfully!");
        } catch (error) {
            set({ checkInLoading: false});
            toast.error(error.response.data.error || "An error occurred");
        }
    },
}))