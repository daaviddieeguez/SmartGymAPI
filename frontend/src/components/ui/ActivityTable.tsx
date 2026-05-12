import Link from "next/link";
import { Activity } from "@/src/types";
import { DeleteButton } from "./DeleteButton";

interface ActivityTableProps {
  items: Activity[];
}

export const ActivityTable = ({ items }: ActivityTableProps) => {
  if (items.length === 0) {
    return (
      <div className="p-20 text-center text-gray-400">
        <p className="text-xl font-semibold">No activities found.</p>
        <p className="text-sm">
          Start by adding a new program to your catalog.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
            <th className="px-6 py-4">Activity Name</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4 text-center">Duration</th>
            <th className="px-6 py-4 text-center">Calories</th>
            <th className="px-6 py-4 text-center">Access</th>
            <th className="px-6 py-4 text-right">Score</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {items.map((activity) => (
            <tr
              key={activity.id}
              className="hover:bg-amber-50/30 transition-colors group"
            >
              <td className="px-6 py-5">
                <Link
                  href={`/activities/${activity.id}`}
                  className="font-bold text-black hover:text-gray-400 transition-colors"
                >
                  {activity.name}
                </Link>
              </td>
              <td className="px-6 py-5">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">
                  {activity.category}
                </span>
              </td>
              <td className="px-6 py-5 text-center text-gray-600 font-medium">
                {activity.duration} min
              </td>
              <td className="px-6 py-5 text-center text-gray-500">
                {activity.calories} kcal
              </td>
              <td className="px-6 py-5 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    activity.premium
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {activity.premium ? "Premium" : "Standard"}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <span className="text-lg font-bold text-amber-500">
                  {activity.averageScore.toFixed(1)}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end items-center gap-4  transition-opacity">
                  <Link
                    href={`/activities/${activity.id}/edit`}
                    className="text-black hover:text-gray-500 text-xs font-bold underline underline-offset-2 transition-colors"
                  >
                    EDIT
                  </Link>
                  <DeleteButton id={activity.id} route="activities" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
