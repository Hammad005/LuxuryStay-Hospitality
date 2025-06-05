import axios from "@/lib/axios";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import { create } from "zustand";

export const roomStore = create((set, get) => ({
    rooms: [],
    roomLoading: false,

    getRooms: async () => {
        set({ roomLoading: true });
        try {
            const response = await axios.get("/room/getRooms");
            set({ rooms: response.data, roomLoading: false });
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ roomLoading: false });
        }
    },
    createRoom: async (room) => {
        set({ roomLoading: true });
        try {
            await axios.post("/room/addRoom", room);
            get().getRooms(); // Refresh the room list after adding a new room
            set({roomLoading: false});
            toast.success("Room added successfully!");
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ roomLoading: false });
        }
    },
    deleteRoom: async (roomId) => {
        set({ roomLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay
        try {
            await axios.delete(`/room/deleteRoom/${roomId}`);
            get().getRooms(); // Refresh the room list after deletion
            set({ roomLoading: false });
            toast.success("Room deleted successfully!");
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ roomLoading: false });
        }
    },
}))