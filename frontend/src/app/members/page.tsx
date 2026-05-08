import { MemberService } from "@/src/services/member.service";

export default async function MembersPage() {
  const pageData = await MemberService.getAll();
  const members = pageData.content;

  console.log("First member data:", members[0]);

  return (
    <div className="p-8 md:w-3xl xl:w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Members Dashboard</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + New Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {members.length > 0 ? (
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">DNI</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {members.map((member) => (
                <tr
                  key={member.dni}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-800">
                    {member.name}
                  </td>
                  <td className="p-4 text-gray-600">{member.dni}</td>
                  <td className="p-4 text-gray-600">{member.locality}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 items-center">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                          member.premium
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {member.premium ? "Premium" : "Standard"}
                      </span>
                      <span
                        className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                          member.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">No members found.</p>
            <p className="text-sm text-gray-400">
              Add some data to your database to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}