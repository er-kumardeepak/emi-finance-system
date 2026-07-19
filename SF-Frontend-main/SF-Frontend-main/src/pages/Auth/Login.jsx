import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Logo from '../../components/common/Logo';
import { MdInfo } from 'react-icons/md';
import { brand } from '../../constants/brand';

const DEMO_EMAIL = 'admin123@gmail.com';
const DEMO_PASSWORD = 'Admin@123';

export default function Login() {
    const [email, setEmail] = useState(DEMO_EMAIL);
    const [password, setPassword] = useState(DEMO_PASSWORD);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error', err);
            setError(err?.response?.data?.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-5">

                {/* Demo Notice */}
                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-800/60 dark:bg-sky-900/20">
                    <div className="flex gap-3">
                        <span className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400">
                            <MdInfo size={20} />
                        </span>
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-sky-800 dark:text-sky-300">
                                Demo Access
                            </p>
                            <p className="text-sm text-sky-700 dark:text-sky-400 leading-relaxed">
                                This is a portfolio demonstration of <span className="font-medium">{brand.fullName}</span>. Demo credentials have been pre-filled — simply click <span className="font-medium">Sign In</span> to explore.
                            </p>
                            <p className="text-xs text-sky-600/80 dark:text-sky-500 leading-relaxed">
                                The production version is hosted separately with secure authentication, protected client data, and private infrastructure. This demo contains sample data for evaluation purposes only.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft dark:border-slate-700/80 dark:bg-slate-900">
                    <div className="flex flex-col items-center">
                        <Logo />
                        <p className="font-display mt-4 text-sm font-semibold text-sky-600 dark:text-sky-400">
                            {brand.name}
                        </p>
                        <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Sign in to your account
                        </h2>
                    </div>

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-xl bg-red-50 p-3.5 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                label="Username"
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="username"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
