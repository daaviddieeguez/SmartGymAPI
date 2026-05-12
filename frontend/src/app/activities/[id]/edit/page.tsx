import { ActivityService } from "@/src/services/activity.service";
import { ActivityForm } from "@/src/components/ui/ActivityForm";
import { notFound } from "next/navigation";

export default async function EditActivityPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const activityId = Number(params.id);

  try {
    const activity = await ActivityService.getById(activityId);
    
    return <ActivityForm initialData={activity} />;
    
  } catch (error) {
    notFound();
  }
}