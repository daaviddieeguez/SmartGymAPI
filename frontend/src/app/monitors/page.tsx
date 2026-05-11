import { SharedPersonTable } from "@/src/components/ui/SharedPersonTable";
import { MonitorService } from "@/src/services/monitor.service";
import Link from "next/link";

export default async function MonitorsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 0;

  const pageData = await MonitorService.getAll(currentPage);
  const monitors = pageData.content;

  return (
    <div className="p-8 md:w-3xl xl:w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Monitors Dashboard
        </h1>
        <Link
          href="/monitors/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + New Monitor
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <SharedPersonTable items={monitors} baseRoute="monitors" />
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
