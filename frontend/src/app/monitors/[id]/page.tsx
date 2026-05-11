import { MonitorService } from "@/src/services/monitor.service";
import { SharedPersonProfile } from "@/src/components/ui/SharedPersonProfile";
import { notFound } from "next/navigation";

export default async function MonitorProfilePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const monitorId = Number(params.id);

  try {
    const monitor = await MonitorService.getById(monitorId);
    
    return <SharedPersonProfile person={monitor} baseRoute="monitors" />;
    
  } catch (error) {
    notFound(); 
  }
}