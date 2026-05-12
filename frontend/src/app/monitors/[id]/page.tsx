import { MonitorService } from "@/src/services/monitor.service";
import { SharedPersonProfile } from "@/src/components/ui/SharedPersonProfile";
import { notFound } from "next/navigation";
import { ActivityService } from "@/src/services/activity.service";

export default async function MonitorProfilePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const monitorId = Number(params.id);

  try {
    const [monitor, currentActivities, activitiesPage] = await Promise.all([
      MonitorService.getById(monitorId),
      MonitorService.getActivities(monitorId),
      ActivityService.getAll(0, 1000),
    ]);

    const allActivitiesArray = activitiesPage.content;

    return (
      <SharedPersonProfile
        person={monitor}
        baseRoute="monitors"
        currentActivities={currentActivities}
        allActivities={allActivitiesArray}
      />
    );
  } catch (error) {
    notFound();
  }
}
