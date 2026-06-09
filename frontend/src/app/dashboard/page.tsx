import Link from "next/link";
import { MemberService } from "@/src/services/member.service";
import { MonitorService } from "@/src/services/monitor.service";
import { ActivityService } from "@/src/services/activity.service";
import { RiTeamLine } from "react-icons/ri";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { TfiLayoutAccordionMerged } from "react-icons/tfi";
import { getUserRole } from "../../actions/auth";
import { Member, Monitor, Activity, PageResponse } from "@/src/types";

export default async function DashboardPage() {
  const role = await getUserRole();

  let membersData: PageResponse<Member> = { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
  let monitorsData: PageResponse<Monitor> = { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };
  let activitiesData: PageResponse<Activity> = { content: [], totalPages: 0, totalElements: 0, size: 0, number: 0 };

  const isAdmin = role === "ROLE_ADMIN";
  const isMonitor = role === "ROLE_MONITOR";

  if (isAdmin) {
    const [memb, mon, act] = await Promise.all([
      MemberService.getAll(0),
      MonitorService.getAll(0),
      ActivityService.getAll(0)
    ]);
    membersData = memb;
    monitorsData = mon;
    activitiesData = act;
  } else if (isMonitor) {
    const [memb, act] = await Promise.all([
      MemberService.getAll(0),
      ActivityService.getAll(0)
    ]);
    membersData = memb;
    activitiesData = act;
  } else {
    activitiesData = await ActivityService.getAll(0);
  }

  const recentMembers = membersData.content.slice(0, 8);
  const recentMonitors = monitorsData.content.slice(0, 8);
  const recentActivities = activitiesData.content.slice(0, 6);

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50/50">
      
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Control Panel</h1>
        <p className="text-gray-500 font-medium">Global overview of Smart Gym operations.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Metric 1: Members */}
        {(isAdmin || isMonitor) && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Members</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{membersData.totalElements}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <RiTeamLine className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Metric 2: Staff */}
        {isAdmin && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Monitors</p>
              <h3 className="text-3xl font-extrabold text-gray-900">{monitorsData.totalElements}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <LuBriefcaseBusiness className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Metric 3: Catalog */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Class Catalog</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{activitiesData.totalElements}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <TfiLayoutAccordionMerged className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* TOP GRID: Members & Monitors */}
      {(isAdmin || isMonitor) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* MEMBERS SNAPSHOT */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Latest Members</h2>
                <p className="text-xs text-gray-400 font-medium">{membersData.totalElements} total registered</p>
              </div>
              <Link href="/members" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                VIEW DIRECTORY
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Member Name</th>
                    <th className="px-6 py-4 font-semibold text-center">Plan</th>
                    <th className="px-6 py-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-700">{m.name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] font-bold ${m.premium ? 'text-amber-600' : 'text-gray-400'}`}>
                          {m.premium ? 'PREMIUM' : 'STANDARD'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${m.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${m.active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          {m.active ? 'ACTIVE' : 'INACTIVE'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* MONITORS SNAPSHOT */}
          {isAdmin && (
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Staff Monitors</h2>
                  <p className="text-xs text-gray-400 font-medium">{monitorsData.totalElements} active personnel</p>
                </div>
                <Link href="/monitors" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                  MANAGE STAFF
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Monitor Name</th>
                      <th className="px-6 py-4 font-semibold">Location</th>
                      <th className="px-6 py-4 font-semibold text-right">DNI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentMonitors.map((mon) => (
                      <tr key={mon.id} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-700">{mon.name}</td>
                        <td className="px-6 py-4 text-gray-500">{mon.locality}</td>
                        <td className="px-6 py-4 text-right font-mono text-xs text-gray-400">{mon.dni}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}

      {/* BOTTOM SECTION: Activities */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Gym Activity Catalog</h2>
            <p className="text-xs text-gray-400 font-medium">Currently offering {activitiesData.totalElements} distinct classes</p>
          </div>
          <Link href="/activities" className="bg-black hover:bg-zinc-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-shadow shadow-sm hover:shadow-md">
            FULL SCHEDULE
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] tracking-widest border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Activity</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold text-center">Duration</th>
                <th className="px-6 py-4 font-semibold text-center">Calories</th>
                <th className="px-6 py-4 font-semibold text-right">Access Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivities.map((act) => (
                <tr key={act.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800">{act.name}</td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold">
                      {act.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">{act.duration} min</td>
                  <td className="px-6 py-4 text-center text-gray-500">{act.calories} kcal</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold ${act.premium ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                      {act.premium ? 'PREMIUM ONLY' : 'OPEN ACCESS'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}