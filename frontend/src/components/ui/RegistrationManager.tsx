"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "@/src/types";
import { MemberService } from "@/src/services/member.service";
import { MonitorService } from "@/src/services/monitor.service";
import { ErrorModal } from "./ErrorModal";
import { StarRating } from "./StarRating";
import { FaRegStar } from "react-icons/fa";

interface RegistrationManagerProps {
  personId: number;
  baseRoute: "members" | "monitors";
  currentActivities: Activity[];
  allActivities: Activity[];
  isPremium?: boolean;
}

export const RegistrationManager = ({
  personId,
  baseRoute,
  currentActivities,
  allActivities,
  isPremium = false,
}: RegistrationManagerProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableActivities = allActivities.filter((activity) => {
    const isEnrolled = currentActivities.some(
      (currentActivity) => currentActivity.id === activity.id,
    );
    if (isEnrolled) return false;

    if (activity.premium) {
      if (baseRoute === "monitors") return true;
      if (baseRoute === "members" && isPremium) return true;
      return false;
    }

    return true;
  });

  const handleAssign = async () => {
    if (!selectedActivity) return;
    setIsLoading(true);
    try {
      if (baseRoute === "members") {
        await MemberService.addActivity(personId, Number(selectedActivity));
      } else {
        await MonitorService.addActivity(personId, Number(selectedActivity));
      }
      setSelectedActivity("");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.message || "Failed to assign activity. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (activityId: number) => {
    if (!confirm("Are you sure you want to remove this activity?")) return;
    setIsLoading(true);
    try {
      if (baseRoute === "members") {
        await MemberService.removeActivity(personId, activityId);
      } else {
        await MonitorService.removeActivity(personId, activityId);
      }
      router.refresh();
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        "Failed to remove the activity. It may be locked by the system.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50/50 border-t border-gray-100 relative">
      <ErrorModal
        isOpen={errorMessage !== null}
        message={errorMessage || ""}
        onClose={() => setErrorMessage(null)}
      />

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">
          {baseRoute === "members" ? "Class Enrollments" : "Assigned Classes"}
        </h3>
        <span className="text-xs font-bold text-gray-400">
          TOTAL: {currentActivities.length}
        </span>
      </div>

      {/* CURRENT ACTIVITIES LIST */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
        {currentActivities.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm font-medium">
            No activities assigned yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <tbody className="divide-y divide-gray-100">
              {currentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {activity.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {activity.category.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {activity.duration} min
                  </td>
                  {baseRoute === "members" && (
                    <>
                      <td className="px-6 py-4 text-gray-500">
                        {activity.calories} kcal
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${activity.premium ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-800"}`}
                        >
                          {activity.premium ? "Premium" : "Standard"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StarRating activityId={activity.id} />
                      </td>
                    </>
                  )}

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRemove(activity.id)}
                      disabled={isLoading}
                      className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                    >
                      REMOVE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ASSIGN NEW ACTIVITY CONTROLS */}
      {availableActivities.length > 0 ? (
        <div className="flex gap-4 flex-col md:flex-row">
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="grow px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-black transition-all"
          >
            <option value="" disabled>
              Select an activity to assign...
            </option>
            {availableActivities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name} ({activity.category.toUpperCase()}) -{" "}
                {activity.duration} min, {activity.averageScore.toFixed(1)} stars
                {baseRoute === "members"
                  ? ` [${activity.premium ? "Premium" : "Standard"}]`
                  : ""}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssign}
            disabled={!selectedActivity || isLoading}
            className="px-6 py-2 bg-black hover:bg-zinc-800 text-white rounded-lg text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Wait..." : "Assign"}
          </button>
        </div>
      ) : (
        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
          {baseRoute === "members" && !isPremium
            ? "No more standard activities available. Upgrade to Premium for more!"
            : "All available activities are assigned."}
        </div>
      )}
    </div>
  );
};
