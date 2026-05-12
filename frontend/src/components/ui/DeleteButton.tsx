"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MemberService } from "@/src/services/member.service";
import { MonitorService } from "@/src/services/monitor.service";
import { ActivityService } from "@/src/services/activity.service";
import { ErrorModal } from "./ErrorModal";

interface DeleteButtonProps {
  id: number;
  route: "members" | "monitors" | "activities";
}

export const DeleteButton = ({ id, route }: DeleteButtonProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const entityName = route === "members" ? "member" : route === "monitors" ? "monitor" : "activity";

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);
    try {
      if (route === "members") {
        await MemberService.delete(id);
      } else if (route === "monitors") {
        await MonitorService.delete(id);
      } else {
        await ActivityService.delete(id);
      }
      
      setIsConfirmOpen(false);
      router.refresh();
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
      setIsConfirmOpen(false);
      setErrorMessage(`Cannot delete this ${entityName}. It may still have connected records in the database.`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* ERROR MODAL */}
      <ErrorModal 
        isOpen={errorMessage !== null} 
        message={errorMessage || ""} 
        onClose={() => setErrorMessage(null)} 
      />

      <button
        onClick={() => setIsConfirmOpen(true)}
        className="text-gray-400 hover:text-black text-[10px] uppercase tracking-widest font-bold underline underline-offset-2 transition-colors ml-4"
      >
        DELETE
      </button>

      {/* CONFIRMATION MODAL */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-extrabold mb-2 text-gray-900 tracking-tight">Confirm Deletion</h2>
            <p className="text-sm text-gray-500 mb-8 font-medium">
              Are you sure you want to permanently delete this {entityName}? This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`w-full px-4 py-3 font-bold text-xs uppercase tracking-widest text-white rounded-lg transition-colors shadow-sm ${
                  isDeleting
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isDeleting ? "DELETING..." : "YES, DELETE RECORD"}
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                disabled={isDeleting}
                className="w-full px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};