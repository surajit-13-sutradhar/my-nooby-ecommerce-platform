// GLobal state for the "User object"

import { create } from "zustand" // package for global state management
import axios from "../lib/axios.js"
import toast from "react-hot-toast" // Notification

export const useUserStore = create((get, set) => ({
    user:null,
    loading:false,
    checkingAuth: true,

    signup: async ({name, email, password, confirmPassword}) => {
        set({loading: true})

        if(password !== confirmPassword) {
            set({loading: false})
            return toast.error("Passwords do not match")
        }

        try {
            const res = await axios.post("/auth/signup", {name,email,password})
            set({user: res.data.yser,loading:false})
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.message || "An error occured")
        }
    },
}))