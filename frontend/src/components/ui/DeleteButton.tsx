"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MemberService } from "@/src/services/member.service";
import { MonitorService } from "@/src/services/monitor.service";
import { ActivityService } from "@/src/services/activity.service";

interface DeleteButtonProps {
  id: number;
  route: "members" | "monitors" | "activities";
}

export const DeleteButton = ({ id, route }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (route === "members") {
        await MemberService.delete(id);
      } else if (route === "monitors") {
        await MonitorService.delete(id);
      } else {
        await ActivityService.delete(id);
      }
      
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting " + (route === "members" ? "member" : route === "monitors" ? "monitor" : "activity") + ":", error);
      alert("Failed to delete " + (route === "members" ? "member" : route === "monitors" ? "monitor" : "activity"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-4 text-red-600 hover:text-red-800 text-xs font-bold"
      >
        DELETE
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this {route === "members" ? "member" : route === "monitors" ? "monitor" : "activity"}?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 font-medium text-white rounded-lg transition-colors ${
                  isDeleting
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
