import axios from "@/lib/axios";
import { create } from "zustand";
import { roomStore } from "./roomStore";
import { checkInStore } from "./checkInStore";
import { toast } from "sonner";

export const checkOutStore = create((set, get) => ({
    allCheckOuts: [],
    userCheckOuts: [],
    checkOutLoading: false,
    success: false,

    createCheckOut: async (data) => {
        set({ checkOutLoading: true, success: false });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.post("/checkOut/createCheckOut", data);
            roomStore.getState().getRooms();
            checkInStore.getState().getUserCheckIns();
            get().getUserCheckOuts();
            set({ checkOutLoading: false, success: true });
            toast.success("Check-out successfully!");
            return { success: true };
        } catch (error) {
            set({ checkOutLoading: false, success: false });
            toast.error(error.response.data.error || "An error occurred");
            return { success: false };
        }
    },

    resetSuccess: () => {
        set({ success: false });
    },

    getUserCheckOuts: async () => {
        set({ checkOutLoading: true });
        try {
            const response = await axios.get("/checkOut/getUserCheckOuts");
            set({ userCheckOuts: response.data.checkOuts, checkOutLoading: false });
        } catch (error) {
            set({ checkOutLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },

    getAllCheckOuts: async () => {
        set({ checkOutLoading: true });
        try {
            const response = await axios.get("/checkOut/getAllCheckOuts");
            set({ allCheckOuts: response.data.checkOuts, checkOutLoading: false });
        } catch (error) {
            set({ checkOutLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },
}))