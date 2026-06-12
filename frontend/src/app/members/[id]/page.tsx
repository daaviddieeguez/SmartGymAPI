import { MemberService } from "@/src/services/member.service";
import { ActivityService } from "@/src/services/activity.service";
import { SharedPersonProfile } from "@/src/components/ui/SharedPersonProfile";
import { getUserSession } from "@/src/actions/auth";
import { redirect } from "next/navigation";

export default async function MemberProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  const params = await props.params;
  const memberId = Number(params.id);

  if (session.role === "ROLE_MEMBER" && session.userId !== memberId) {
    redirect(`/members/${session.userId}`);
  }

  const [member, currentActivities, activitiesPage] = await Promise.all([
    MemberService.getById(memberId),
    MemberService.getActivities(memberId),
    ActivityService.getAll(0, 1000) 
  ]);

  const allActivitiesArray = activitiesPage.content;
  const email = session.userId === memberId ? session.email : null;

  return (
    <SharedPersonProfile
      person={member}
      baseRoute="members"
      currentActivities={currentActivities}
      allActivities={allActivitiesArray}
      email={email}
      role={session.role}
    />
  );
}