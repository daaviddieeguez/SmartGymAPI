import { MemberService } from "@/src/services/member.service";
import { SharedPersonForm } from "@/src/components/ui/SharedPersonForm";
import { notFound } from "next/navigation";

export default async function EditMemberPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const memberId = Number(params.id);

  try {
    const member = await MemberService.getById(memberId);

    return (
      <SharedPersonForm 
        initialData={member} 
        baseRoute="members"
      />
    );
  } catch (error) {
    notFound();
  }
}