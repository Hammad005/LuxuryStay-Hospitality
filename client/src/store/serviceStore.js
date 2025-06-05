import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const serviceStore = create((set, get) => ({
    services: [],
    serviceLoading: false,
    success: false,
    getServices: async () => {
        set({ serviceLoading: true });
        try {
            const response = await axios.get("/service/getServices");
            set({ services: response.data.services, serviceLoading: false });
        } catch (error) {
            set({ serviceLoading: false });
            toast.error(error.response.data.error || "An error occurred");
        }
    },
    createService: async (service) => {
        set({ serviceLoading: true, success: false });
        try {
            await axios.post("/service/addService", service);
            get().getServices(); // Refresh the service list after adding a new service
            set({ serviceLoading: false, success: true });
            toast.success("Service added successfully!");
            return { success: true };
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ serviceLoading: false, success: false });
            return { success: false };
        }
    },
    deleteService: async (serviceId) => {
        set({ serviceLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay
        try {
            await axios.delete(`/service/deleteService/${serviceId}`);
            get().getServices(); // Refresh the service list after deletion
            set({ serviceLoading: false });
            toast.success("Service deleted successfully!");
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ serviceLoading: false });
        }
    },
    updateService: async (serviceId, updatedService) => {
        set({ serviceLoading: true, success: false });
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading delay
        try {
            await axios.put(`/service/updateService/${serviceId}`, updatedService);
            get().getServices(); // Refresh the service list after updating
            set({ serviceLoading: false, success: true });
            toast.success("Service updated successfully!");
            return { success: true };
        } catch (error) {
            toast.error(error.response.data.error || "An error occurred");
            set({ serviceLoading: false, success: false });
            return { success: false };
        }
    },

    resetSuccess: () => {
        set({ success: false });
    },
}))