import { create } from "zustand";
import * as AuthAPI from "./auth.api";

export interface AuthState {
token: string | null;
isLogged: boolean;
error: boolean;
login: (username:string, password:string) => void;
logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    token: AuthAPI.getToken(),
    isLogged: AuthAPI.isLogged(),
    error: false,
    login: (username:string, password:string) => {
        set({ error:false, isLogged:false })
        AuthAPI.login(username, password)
        .then(() => {
            set({ isLogged: AuthAPI.isLogged(), token:AuthAPI.getToken() })
        })
        .catch(() => {
            set({ error: true })
        })
    },
    logout: () => {
        set({ isLogged:false, token: null })
        AuthAPI.logout()
    }
}))