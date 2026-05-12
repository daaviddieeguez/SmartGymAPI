import { MemberService } from "@/src/services/member.service";
import { ActivityService } from "@/src/services/activity.service";
import { SharedPersonProfile } from "@/src/components/ui/SharedPersonProfile";

export default async function MemberProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const memberId = Number(params.id);

  const [member, currentActivities, activitiesPage] = await Promise.all([
    MemberService.getById(memberId),
    MemberService.getActivities(memberId),
    ActivityService.getAll(0, 1000) 
  ]);

  const allActivitiesArray = activitiesPage.content;

  return (
    <SharedPersonProfile
      person={member}
      baseRoute="members"
      currentActivities={currentActivities}
      allActivities={allActivitiesArray}
    />
  );
}