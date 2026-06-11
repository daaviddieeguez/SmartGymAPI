import { ActivityTable } from "@/src/components/ui/ActivityTable";
import { ActivityService } from "@/src/services/activity.service";
import Link from "next/link";
import { getUserSession } from "@/src/actions/auth";

export default async function ActivitiesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getUserSession();
  const role = session?.role || null;
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 0;

  const pageData = await ActivityService.getAll(currentPage);
  const activities = pageData.content;

  const showNewActivity = role === "ROLE_ADMIN" || role === "ROLE_MONITOR";

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Activities Management
        </h1>
        {showNewActivity && (
          <Link
            href="/activities/new"
            className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + New Activity
          </Link>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ActivityTable items={activities} role={role} />
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-500">
            Showing page {pageData.number + 1} of {pageData.totalPages}
            <span className="ml-2">
              ({pageData.totalElements} total activities)
            </span>
          </span>

          <div className="flex gap-2">
            {pageData.number > 0 ? (
              <Link
                href={`/activities?page=${pageData.number - 1}`}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-white text-sm font-medium transition-colors text-gray-700"
              >
                Previous
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 border border-gray-100 rounded-lg text-gray-300 text-sm font-medium cursor-not-allowed"
              >
                Previous
              </button>
            )}
            {pageData.number < pageData.totalPages - 1 ? (
              <Link
                href={`/activities?page=${pageData.number + 1}`}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-white text-sm font-medium transition-colors text-gray-700"
              >
                Next
              </Link>
            ) : (
              <button
                disabled
                className="px-4 py-2 border border-gray-100 rounded-lg text-gray-300 text-sm font-medium cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}