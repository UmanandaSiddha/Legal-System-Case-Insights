import { auth } from '@/lib/firebase.client';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    document.cookie = `token=${token}; path=/; max-age=3600; secure`;

    const res = await fetch('/api/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(await res.json());

    // return await res.json();
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, { displayName: name });

    const token = await userCred.user.getIdToken();

    document.cookie = `token=${token}; path=/; max-age=3600; secure`;

    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name }),
    });

    return await res.json();
};

export const signInWithEmail = async (email: string, password: string) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCred.user.getIdToken();

    document.cookie = `token=${token}; path=/; max-age=3600; secure`;

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    });

    return await res.json();
};