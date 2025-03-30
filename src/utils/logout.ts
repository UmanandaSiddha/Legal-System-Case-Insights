import { signOut } from 'firebase/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from '@/lib/firebase.client';

export const logout = async () => {
    await signOut(auth);

    document.cookie = 'token=; Max-Age=0; path=/;';

    const reset = useAuthStore.getState().auth.reset;
    reset();

    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
};