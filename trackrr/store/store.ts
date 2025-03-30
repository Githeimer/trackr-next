import { User } from "@/types"
import {create} from "zustand"

export interface AuthState {
    user: User | null,
    setUser: (user:User | null)=>void,
    logout: ()=> void;
}

export const useAuthStore=create<AuthState>((set) => ({
    user:null,
    setUser:(user)=>set({user}),
    logout:()=>set({user:null})
}));
