'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/src/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Algo salió mal. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex w-full max-w-md flex-col items-center px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
          Smart Gym
        </h1>
        <p className="text-sm tracking-widest text-gray-500 uppercase font-bold mb-8">
          Member Access
        </p>

        {error && (
          <div className="w-full bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg mb-6 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-black hover:bg-zinc-800 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </main>
    </div>
  );
}