import { SharedPersonProfile } from "@/src/components/ui/SharedPersonProfile";
import { MemberService } from "@/src/services/member.service";
import { notFound } from "next/navigation";

export default async function MemberPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const memberId = Number(params.id);

  try {
    const member = await MemberService.getById(memberId);

    return <SharedPersonProfile person={member} baseRoute="members" />;
  } catch (error) {
    notFound();
}
}