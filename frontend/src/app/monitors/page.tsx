import { SharedPersonTable } from "@/src/components/ui/SharedPersonTable";
import { MonitorService } from "@/src/services/monitor.service";
import Link from "next/link";
import { getUserRole } from "@/src/actions/auth";
import { redirect } from "next/navigation";

export default async function MonitorsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const role = await getUserRole();
  
  if (role !== "ROLE_ADMIN") {
    redirect("/dashboard");
  }

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 0;

  const pageData = await MonitorService.getAll(currentPage);
  const monitors = pageData.content;

  return (
    <div className="p-4 w-full min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Staff Monitors
        </h1>
        <Link
          href="/monitors/new"
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + New Monitor
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <SharedPersonTable items={monitors} baseRoute="monitors" role={role} />
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-500">
            Showing page {pageData.number + 1} of {pageData.totalPages}
            <span className="ml-2">
              ({pageData.totalElements} total monitors)
            </span>
          </span>

          <div className="flex gap-2">
            {pageData.number > 0 ? (
              <Link
                href={`/monitors?page=${pageData.number - 1}`}
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
                href={`/monitors?page=${pageData.number + 1}`}
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
