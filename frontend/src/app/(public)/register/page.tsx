'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/src/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen py-10">
      <main className="flex w-full max-w-2xl flex-col items-center px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
          Smart Gym
        </h1>
        <p className="text-sm tracking-widest text-gray-500 uppercase font-bold mb-8">
          Create Your Account
        </p>

        {error && (
          <div className="w-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form className="w-full grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
          {/* Credentials Section */}
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-800 pb-2 mb-1">
              Account Credentials
            </h2>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
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
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          {/* Personal Info Section */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-800 pb-2 mb-1">
              Personal Information
            </h2>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Identification (DNI)
            </label>
            <input
              type="text"
              name="dni"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="12345678A"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Birthdate
            </label>
            <input
              type="date"
              name="birthdate"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="600123456"
            />
          </div>

          {/* Address Section */}
          <div className="md:col-span-2 mt-4">
            <h2 className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest border-b border-gray-100 dark:border-zinc-800 pb-2 mb-1">
              Contact & Location
            </h2>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="123 Main St"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Locality
            </label>
            <input
              type="text"
              name="locality"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="Manchester"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Province
            </label>
            <input
              type="text"
              name="province"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="Greater Manchester"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
              Post Code
            </label>
            <input
              type="text"
              name="postCode"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 dark:border-zinc-800 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
              placeholder="M1 2AB"
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-black text-white rounded-lg font-bold text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <a href="/login" className="font-bold text-black hover:underline">
            Sign In
          </a>
        </p>
      </main>
    </div>
  );
}