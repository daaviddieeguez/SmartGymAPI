import Link from "next/link";
import { Person, Member, Monitor } from "@/src/types";

interface SharedPersonProfileProps {
  person: Person;
  baseRoute: "members" | "monitors";
}

export const SharedPersonProfile = ({ person, baseRoute }: SharedPersonProfileProps) => {
  const isMember = baseRoute === "members";
  const isMonitor = baseRoute === "monitors";

  const memberData = person as Member;
  const monitorData = person as Monitor;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">
          {baseRoute.slice(0, -1)} Profile
        </h1>
        <div className="flex gap-4">
          <Link
            href={`/${baseRoute}`}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors py-2 font-medium"
          >
            Back to Dashboard
          </Link>
          <Link
            href={`/${baseRoute}/${person.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-zinc-800">
              Personal Information
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><strong className="text-gray-900 dark:text-gray-200">Name:</strong> {person.name}</li>
              <li><strong className="text-gray-900 dark:text-gray-200">DNI:</strong> {person.dni}</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Birthdate:</strong> {person.birthdate}</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Phone:</strong> {person.phoneNumber}</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-zinc-800">
              Location Details
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li><strong className="text-gray-900 dark:text-gray-200">Address:</strong> {person.address}</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Locality:</strong> {person.locality}</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Province:</strong> {person.province}</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Postal Code:</strong> {person.postCode}</li>
            </ul>
          </div>

          <div className="md:col-span-2 mt-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              {isMember ? "Membership Details" : "Employment Details"}
            </h2>
            
            <div className="flex gap-6">
              {isMember && (
                <>
                  <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg flex-1">
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Status</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block ${memberData.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {memberData.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg flex-1">
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Plan Type</span>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider inline-block ${memberData.premium ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                      {memberData.premium ? "Premium" : "Standard"}
                    </span>
                  </div>
                </>
              )}

              {isMonitor && (
                <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-lg flex-1">
                  <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Salary</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    €{monitorData.salary ? monitorData.salary.toFixed(2) : "0.00"}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};