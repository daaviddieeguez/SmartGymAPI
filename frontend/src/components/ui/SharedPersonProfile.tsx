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
    <div className="p-6 w-full min-h-screen bg-gray-50/50">
      
      {/* PAGE HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            {baseRoute.slice(0, -1)} Record
          </h1>
          <p className="text-gray-500 font-medium mt-1">Viewing detailed profile information.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/${baseRoute}`}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            BACK TO LIST
          </Link>
          <Link
            href={`/${baseRoute}/${person.id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
          >
            EDIT RECORD
          </Link>
        </div>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* HIGHLIGHT HEADER (Name & Core Status) */}
        <div className="p-8 border-b border-gray-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Avatar Placeholder */}
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl border-4 border-white shadow-sm">
              {person.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{person.name}</h2>
              <p className="text-sm text-gray-500 font-mono mt-1">ID: {person.dni}</p>
            </div>
          </div>

          {/* Quick Status Badges */}
          <div className="flex gap-3">
            {isMember && (
              <>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${memberData.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                  <span className={`w-2 h-2 rounded-full ${memberData.active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  {memberData.active ? 'ACTIVE ACCOUNT' : 'INACTIVE ACCOUNT'}
                </div>
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${memberData.premium ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                  {memberData.premium ? 'PREMIUM PLAN' : 'STANDARD PLAN'}
                </div>
              </>
            )}
            {isMonitor && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                STAFF MONITOR
              </div>
            )}
          </div>
        </div>

        {/* DATA GRID */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Section 1: Contact & Personal */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-5">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Phone Number</span>
                <span className="text-sm font-medium text-gray-800">{person.phoneNumber || "Not provided"}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Birthdate</span>
                <span className="text-sm font-medium text-gray-800">{person.birthdate}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-5">
              Location Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Street Address</span>
                <span className="text-sm font-medium text-gray-800">{person.address}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Locality</span>
                <span className="text-sm font-medium text-gray-800">{person.locality}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Province / Postal</span>
                <span className="text-sm font-medium text-gray-800">{person.province}, {person.postCode}</span>
              </div>
            </div>
          </div>

        </div>

        {/* FINANCIAL / SYSTEM DETAILS (Footer area) */}
        {isMonitor && (
          <div className="p-8 bg-gray-50/50 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-4">
              Employment Data
            </h3>
            <div className="bg-white border border-gray-200 p-5 rounded-xl inline-block shadow-sm">
              <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Monthly Salary</span>
              <span className="text-2xl font-extrabold text-gray-900">
                €{monitorData.salary ? monitorData.salary.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};