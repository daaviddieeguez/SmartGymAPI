'use client';

export default function RegisterPage() {

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
        <main className="flex w-full max-w-md flex-col items-center px-8 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            Smart Gym
            </h1>
            <p className="text-sm tracking-widest text-gray-500 uppercase font-bold mb-8">
            Create Your Account
            </p>
            <form className="w-full flex flex-col gap-5" onSubmit={() => {}}>
            <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5">
                Email Address
                </label>
                <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all disabled:opacity-50"
                placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-bold text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Register
            </button>
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
                Already have an account?{' '}
                <a href="/login" className="font-bold text-black dark:text-white hover:underline">
                Sign In
                </a>
            </p>
        </main>
        </div>
    );
}