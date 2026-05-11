import { MonitorService } from "@/src/services/monitor.service";
import { SharedPersonForm } from "@/src/components/ui/SharedPersonForm";
import { notFound } from "next/navigation";

export default async function EditMonitorPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const monitorId = Number(params.id);

  try {
    const monitor = await MonitorService.getById(monitorId);
    
    return (
      <SharedPersonForm 
        initialData={monitor} 
        baseRoute="monitors"
      />
    );
  } catch (error) {
    notFound();
  }
}