'use client';

import { useState } from 'react';
import { UserRoleEnum } from '@/types/enum';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '@/actions/auth.action';

export default function AuthForms() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.USER);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(email, password, name);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-center mb-4">
                {isLogin ? 'Login to your account' : 'Create a new account'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded text-black"
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded text-black"
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
                </button>
            </form>

            <div className="text-center my-4">
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-500 underline"
                >
                    {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
                </button>
            </div>

            <div className="text-center">
                <button
                    onClick={signInWithGoogle}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
}
