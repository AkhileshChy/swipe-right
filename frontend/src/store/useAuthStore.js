import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    signup: async (signupData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/signup", signupData);
            set({ authUser: res.data.user });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            set({ loading: false });
        }
    },
    login: async (loginData) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.post("/auth/login", loginData);
            set({ authUser: res.data.user });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            set({ loading: false });
        }   
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            if (res.status === 200) set({ authUser: null });
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
}))