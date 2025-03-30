"use client";

import { useEffect } from 'react';
import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { auth } from '@/lib/firebase.client';

export const useAuth = () => {
    const {
        auth: { user, setUser, reset, setLoading, isLoading },
    } = useAuthStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);

            if (firebaseUser) {
                try {
                    const token = await getIdToken(firebaseUser);

                    document.cookie = `token=${token}; path=/; max-age=3600; secure`;

                    const res = await fetch('/api/auth/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token }),
                    });

                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                    } else {
                        reset();
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    reset();
                }
            } else {
                document.cookie = 'token=; Max-Age=0; path=/';
                reset();
            }
        });

        return () => unsubscribe();
    }, [setUser, reset, setLoading]);

    return { user, isLoading, reset };
};