"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            await signIn('google', { callbackUrl: '/dashboard' });
        } catch (error) {
            console.error(error);
            setGoogleLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (res?.error) {
                setError('Invalid email or password');
            } else {
                router.push('/dashboard');
                router.refresh(); // Refresh state to pick up the new session
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans text-gray-900">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center sm:text-left">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-3xl font-black tracking-tighter text-green-700">Agri<span className="text-black">Connect</span></span>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            {isSignUp ? 'Create an Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {isSignUp ? 'Join AgriConnect today.' : 'Log in to your account.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                                placeholder="farmer@agriconnect.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200"
                                placeholder="••••••••"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-2">Any email/password will work for this demo</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <span className="inline-block h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            ) : (
                                isSignUp ? "Sign Up" : "Sign In"
                            )}
                        </button>

                        <div className="text-center mt-4 pb-2">
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-sm text-green-700 font-semibold hover:underline bg-transparent"
                            >
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or {isSignUp ? 'sign up' : 'continue'} with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading || loading}
                            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            {googleLoading ? (
                                <span className="inline-block h-5 w-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
                            ) : (
                                <>
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 relative bg-green-900 items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-110"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1b?q=80&w=2000&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/60 to-transparent mix-blend-multiply"></div>

                <div className="relative z-10 p-16 max-w-xl text-left">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 backdrop-blur-sm text-sm font-medium mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                        Next-Gen Farming
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                        Grow smarter,<br />not harder.
                    </h2>
                    <p className="text-green-100/80 text-lg leading-relaxed mb-8">
                        Precision agriculture tools at your fingertips. Monitor crop health, forecast yields, and make data-driven decisions that boost your bottom line.
                    </p>
                </div>
            </div>
        </div >
    );
}
