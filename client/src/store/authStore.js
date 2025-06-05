import { create } from "zustand";
import { guestStore } from "./guestStore";
import { staffStore } from "./staffStore";
import axios from "@/lib/axios";
import { toast } from "sonner";

export const authStore = create((set) => ({
    loginLoading: false,

    login: async (loginData) => {
        set({ loginLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            const response = await axios.post("/auth", loginData);
            guestStore.getState().setGuest(response.data.guest);
            staffStore.getState().setStaff(response.data.staff);
            toast.success("Login successful");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.error || "An error occurred");
            set({ loginLoading: false });
            guestStore.getState().setGuest(null);
            staffStore.getState().setStaff(null);
        } finally {
            set({ loginLoading: false });
        }
    },
}))