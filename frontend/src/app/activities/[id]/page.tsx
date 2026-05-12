import { ActivityService } from "@/src/services/activity.service";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Member } from "@/src/types";

export default async function ActivityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const activityId = Number(resolvedParams.id);

  if (isNaN(activityId)) return notFound();

  try {
    const [activity, enrolledMembers] = await Promise.all([
      ActivityService.getById(activityId),
      ActivityService.getMembers(activityId) 
    ]);

    return (
      <div className="p-6 w-full min-h-screen bg-gray-50/50">
        
        {/* PAGE HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Activity Profile
            </h1>
            <p className="text-gray-500 font-medium mt-1">Viewing parameters for {activity.name}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/activities"
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              BACK TO SCHEDULE
            </Link>
            <Link
              href={`/activities/${activity.id}/edit`}
              className="bg-black hover:bg-zinc-800 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
            >
              EDIT PARAMETERS
            </Link>
          </div>
        </div>

        {/* MAIN DETAILS CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          
          {/* HEADER HIGHLIGHT */}
          <div className="p-8 border-b border-gray-100 bg-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{activity.name}</h2>
              <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-widest">
                {activity.category}
              </span>
            </div>
            
            <div className={`px-4 py-2 text-xs font-bold rounded-full uppercase tracking-wider border ${
              activity.premium 
                ? "bg-amber-50 text-amber-700 border-amber-200" 
                : "bg-gray-50 text-gray-600 border-gray-200"
            }`}>
              {activity.premium ? "PREMIUM RESTRICTION" : "OPEN ACCESS"}
            </div>
          </div>

          {/* DATA GRID */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-5">
                Class Metrics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Duration</span>
                  <span className="text-lg font-bold text-gray-900">{activity.duration} <span className="text-sm text-gray-500 font-medium">min</span></span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Estimated Burn</span>
                  <span className="text-lg font-bold text-gray-900">{activity.calories} <span className="text-sm text-gray-500 font-medium">kcal</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ENROLLED MEMBERS SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Class Roster</h2>
              <p className="text-xs text-gray-400 font-medium">Current enrolled members</p>
            </div>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-bold">
              {enrolledMembers.length} REGISTERED
            </span>
          </div>

          <div className="overflow-x-auto w-full">
            {enrolledMembers.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-sm font-semibold uppercase tracking-widest">No members enrolled yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
                    <th className="px-6 py-4">Member Name</th>
                    <th className="px-6 py-4">Identification (DNI)</th>
                    <th className="px-6 py-4 text-right">View Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {enrolledMembers.map((member: Member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-gray-800">
                        {member.name}
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-gray-500 uppercase">
                        {member.dni}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link
                          href={`/members/${member.id}`}
                          className="text-black hover:text-gray-500 text-xs font-bold underline underline-offset-2 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          OPEN RECORD
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    );
    
  } catch (error) {
    console.error(error);
    notFound(); 
  }
}