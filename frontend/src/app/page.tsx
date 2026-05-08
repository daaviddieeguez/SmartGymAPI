import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full lg:max-w-7xl flex-col items-center px-8 sm:px-16 bg-white dark:bg-black">
        <section className="pt-16 w-full flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white">
            Welcome to Smart Gym
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
            Your ultimate fitness companion
          </p>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Join thousands of satisfied members who have transformed their
            fitness journey with our cutting-edge technology.
          </p>
        </section>

        <section className="w-full pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/gym.jpg"
                alt="Gym Image"
                width={800}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full max-h-100"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Why Choose Smart Gym?
              </h2>
              <ul className="mt-6 space-y-3 list-disc list-inside text-lg text-gray-600 dark:text-gray-300">
                <li>Personalized workout plans tailored to your goals</li>
                <li>Real-time performance tracking and analytics</li>
                <li>Access to a supportive fitness community</li>
                <li>Integration with wearable devices for seamless tracking</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="w-full py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Basic
              </h3>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                $9.99
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access to basic workout plans and community features.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Premium
              </h3>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                $19.99
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Access to all features, including personalized coaching and advanced analytics.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Pro
              </h3>
              <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                $29.99
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                All Premium features plus exclusive content and priority support.
              </p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
