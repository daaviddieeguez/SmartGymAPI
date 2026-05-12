import { ActivityService } from "@/src/services/activity.service";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ActivityDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const activityId = Number(params.id);

  try {
    const activity = await ActivityService.getById(activityId);

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Activity Details
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Viewing information for {activity.name}</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/activities"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors py-2 font-medium"
            >
              Back to Dashboard
            </Link>
            <Link
              href={`/activities/${activity.id}/edit`}
              className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Edit Activity
            </Link>
          </div>
        </div>

        {/* INFORMATION CARD */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* General Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-zinc-800">
                General Information
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-semibold mb-1">Name</span>
                  <span className="text-lg text-gray-900 dark:text-gray-100 font-medium">{activity.name}</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-semibold mb-1">Category</span>
                  <span className="text-gray-900 dark:text-gray-200 capitalize">{activity.category}</span>
                </li>
              </ul>
            </div>
            
            {/* Workout Metrics */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-zinc-800">
                Workout Metrics
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-semibold mb-1">Duration</span>
                  <span className="text-gray-900 dark:text-gray-200">{activity.duration} minutes</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-gray-400 dark:text-zinc-500 font-semibold mb-1">Estimated Calories</span>
                  <span className="text-gray-900 dark:text-gray-200">{activity.calories} kcal</span>
                </li>
              </ul>
            </div>

            {/* Access Level */}
            <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Access Level
              </h2>
              <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-lg flex items-center justify-between border border-gray-100 dark:border-zinc-700/50">
                <div>
                  <span className="block font-medium text-gray-900 dark:text-white mb-1">Membership Requirement</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.premium 
                      ? "Only Premium members can book and attend this class." 
                      : "This class is available to all active gym members."}
                  </span>
                </div>
                <span className={`px-4 py-2 text-sm font-bold rounded-full uppercase tracking-wider ${
                  activity.premium 
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50" 
                    : "bg-slate-200 text-slate-700 dark:bg-zinc-700 dark:text-zinc-200"
                }`}>
                  {activity.premium ? "Premium" : "Standard"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
    
  } catch (error) {
    notFound(); 
  }
}