import { MemberService } from "@/src/services/member.service";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MemberPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const memberId = Number(params.id);

  try {
    const member = await MemberService.getById(memberId);

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Member Profile
          </h1>
          <div className="flex gap-4">
            <Link
              href="/members"
              className="text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              Back to Dashboard
            </Link>
            <Link
              href={`/members/${member.id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Personal Information</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li><strong className="text-gray-900 dark:text-gray-200">Name:</strong> {member.name}</li>
                <li><strong className="text-gray-900 dark:text-gray-200">DNI:</strong> {member.dni}</li>
                <li><strong className="text-gray-900 dark:text-gray-200">Birthdate:</strong> {member.birthdate}</li>
                <li><strong className="text-gray-900 dark:text-gray-200">Phone:</strong> {member.phoneNumber}</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Location Details</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li><strong className="text-gray-900 dark:text-gray-200">Address:</strong> {member.address}</li>
                <li><strong className="text-gray-900 dark:text-gray-200">Locality:</strong> {member.locality}</li>
                <li><strong className="text-gray-900 dark:text-gray-200">Province:</strong> {member.province}</li>
                <li><strong className="text-gray-900 dark:text-gray-200">Postal Code:</strong> {member.postCode}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound(); 
  }
}