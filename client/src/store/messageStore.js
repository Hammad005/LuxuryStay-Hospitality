import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";


export const messageStore = create((set,get) => ({
    messages: null,
    messageLoading: false,

    sendMessage: async (data) => {
        set({ messageLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.post("/message/sendMessage", data);
            set({ messageLoading: false });
            toast.success("Message sent successfully");
        } catch (error) {
            set({ messageLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },
    getMessage: async () => {
        set({ messageLoading: true });
        try {
            const response = await axios.get("/message/getMessages");
            set({ messages: response.data.messages, messageLoading: false });
        } catch (error) {
            set({ messageLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },
    deleteMessage: async (id) => {
        set({ messageLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
            await axios.delete(`/message/deleteMessage/${id}`);
            get().getMessage(); // Refresh messages after deletion
            set({ messageLoading: false });
            toast.success("Message deleted successfully");
        } catch (error) {
            set({ messageLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },
}));