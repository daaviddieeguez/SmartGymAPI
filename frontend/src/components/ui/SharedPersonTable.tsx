import Link from "next/link";
import { Person, Member } from "@/src/types";
import { DeleteButton } from "./DeleteButton";

interface SharedPersonTableProps {
  items: Person[];
  baseRoute: "members" | "monitors";
}

export const SharedPersonTable = ({
  items,
  baseRoute,
}: SharedPersonTableProps) => {
  if (items.length === 0) {
    return (
      <div className="p-20 text-center text-gray-400">
        <p className="text-xl font-semibold">No records found.</p>
        <p className="text-sm">
          Click the button above to add your first entry.
        </p>
      </div>
    );
  }

  const isMemberRoute = baseRoute === "members";

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-widest font-semibold">
            <th className="px-6 py-4 min-w-45">Full Name</th>
            <th className="px-6 py-4">Identification (DNI)</th>
            <th className="px-6 py-4">Locality</th>
            {isMemberRoute && <th className="px-6 py-4 text-center">Membership Status</th>}
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {items.map((person) => {
            const memberData = person as Member;

            return (
              <tr key={person.dni} className="transition-colors group hover:bg-gray-50">
                <td className="px-6 py-5">
                  <Link
                    href={`/${baseRoute}/${person.id}`}
                    className="font-bold text-black hover:text-gray-500 transition-colors"
                  >
                    {person.name}
                  </Link>
                </td>
                <td className="px-6 py-5 font-mono text-xs text-gray-500 uppercase">
                  {person.dni}
                </td>
                <td className="px-6 py-5 text-gray-600">
                  {person.locality}
                </td>
                
                {isMemberRoute && (
                  <td className="px-6 py-5 text-center">
                    <div className="flex flex-col gap-1 items-center">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${memberData.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${memberData.active ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        {memberData.active ? 'ACTIVE' : 'INACTIVE'}
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                        {memberData.premium ? "Premium Plan" : "Standard Plan"}
                      </span>
                    </div>
                  </td>
                )}
                
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <Link
                      href={`/${baseRoute}/${person.id}/edit`}
                      className="text-black hover:text-gray-500 text-xs font-bold underline underline-offset-2 transition-colors"
                    >
                      EDIT
                    </Link>
                    <DeleteButton id={person.id} route={baseRoute} /> 
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
