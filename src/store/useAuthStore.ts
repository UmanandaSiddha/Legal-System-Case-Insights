import { IUser } from '@/types/type';
import { create } from 'zustand';

interface AuthState {
    auth: {
        user: IUser | null;
        isLoading: boolean;
        setUser: (user: IUser | null) => void;
        setLoading: (loading: boolean) => void;
        reset: () => void;
    };
}

export const useAuthStore = create<AuthState>((set) => ({
    auth: {
        user: null,
        isLoading: true,
        setUser: (user) =>
            set((state) => ({
                ...state,
                auth: { ...state.auth, user, isLoading: false },
            })),
        setLoading: (loading) =>
            set((state) => ({
                ...state,
                auth: { ...state.auth, isLoading: loading },
            })),
        reset: () =>
            set((state) => ({
                ...state,
                auth: { ...state.auth, user: null, isLoading: false },
            })),
    }
}));
