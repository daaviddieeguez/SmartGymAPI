import Link from "next/link";
import { Person, Member } from "@/src/types";
import { DeleteButton } from "./DeleteButton";

interface SharedPersonTableProps {
  items: Person[];
  baseRoute: "members" | "monitors";
}

export const SharedPersonTable = ({ items, baseRoute }: SharedPersonTableProps) => {
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
          <th className="p-4 font-semibold">DNI</th>
          <th className="p-4 font-semibold">Location</th>
          {baseRoute === "members" && <th className="p-4 font-semibold">Status</th>}
          <th className="p-4 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {items.map((person) => {
          const isMember = baseRoute === "members";
          const memberData = person as Member;

          return (
            <tr key={person.dni} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-800">
                <Link
                  href={`/${baseRoute}/${person.id}`}
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  {person.name}
                </Link>
              </td>
              <td className="p-4 text-gray-600">{person.dni}</td>
              <td className="p-4 text-gray-600">{person.locality}</td>
              
              {isMember && (
                <td className="p-4">
                  <div className="flex flex-col gap-1 items-center">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${memberData.premium ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>
                      {memberData.premium ? "Premium" : "Standard"}
                    </span>
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${memberData.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {memberData.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
              )}
              
              <td className="p-4 text-right flex justify-end items-center gap-4">
                <Link
                  href={`/${baseRoute}/${person.id}/edit`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium transition-colors"
                >
                  Edit
                </Link>
                <DeleteButton id={person.id} route={baseRoute} /> 
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};