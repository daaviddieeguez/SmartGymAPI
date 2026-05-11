import Link from "next/link";
import { Activity } from "@/src/types";
import { DeleteButton } from "./DeleteButton";

interface ActivityTableProps {
  items: Activity[];
}

export const ActivityTable = ({ items }: ActivityTableProps) => {
  if (items.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        <p className="text-lg">No records found.</p>
        <p className="text-sm text-gray-400">Add some data to your database to get started!</p>
      </div>
    );
  }

  return (
    <table className="w-full text-center border-collapse">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
          <th className="p-4 font-semibold">Name</th>
          <th className="p-4 font-semibold">Category</th>
          <th className="p-4 font-semibold">Stats</th>
          <th className="p-4 font-semibold">Access</th>
          <th className="p-4 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {items.map((activity) => (
          <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
            
            {/* Name */}
            <td className="p-4 font-medium text-gray-800">
              <Link
                href={`/activities/${activity.id}`}
                className="hover:text-blue-600 hover:underline transition-colors"
              >
                {activity.name}
              </Link>
            </td>

            {/* Category */}
            <td className="p-4 text-gray-600 capitalize">
              {activity.category}
            </td>
            
            {/* Stats (Duration & Calories) */}
            <td className="p-4 text-gray-600">
              {activity.duration} min / {activity.calories} kcal
            </td>

            {/* Access Status */}
            <td className="p-4">
              <div className="flex flex-col gap-1 items-center">
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${activity.premium ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                  {activity.premium ? "Premium" : "Standard"}
                </span>
              </div>
            </td>
            
            {/* Actions */}
            <td className="p-4 text-right flex justify-end items-center gap-4">
              <Link
                href={`/activities/${activity.id}/edit`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium transition-colors"
              >
                Edit
              </Link>
              <DeleteButton id={activity.id} route="activities" /> 
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};