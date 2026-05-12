"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ActivityService } from "@/src/services/activity.service";

interface ActivityFormProps {
  initialData?: any;
}

export const ActivityForm = ({ initialData = {} }: ActivityFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isEdit = !!initialData.id;

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    category: initialData.category || "fitness",
    duration: initialData.duration || "",
    calories: initialData.calories || "",
    premium: initialData.premium || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError(null);
    setFieldErrors({});

    try {
      const cleanPayload = {
        name: formData.name,
        category: formData.category,
        duration: Number(formData.duration),
        calories: Number(formData.calories),
        premium: formData.premium,
      };

      if (isEdit) await ActivityService.update(initialData.id, cleanPayload);
      else await ActivityService.create(cleanPayload);

      router.push("/activities");
      router.refresh();
    } catch (err: any) {
      if (err.errors && Object.keys(err.errors).length > 0) setFieldErrors(err.errors);
      else if (err.message) setGeneralError(err.message);
      else setGeneralError("An unexpected error occurred connecting to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1.5";

  return (
    <div className="p-6 w-full min-h-screen bg-gray-50/50 flex flex-col items-center">
      
      <div className="w-full max-w-3xl mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            {isEdit ? "Edit" : "Create"} Activity
          </h1>
          <p className="text-gray-500 font-medium mt-1">Configure class parameters and access levels.</p>
        </div>
        <Link href="/activities" className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
          CANCEL
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {generalError && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">General Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelClass}>Activity Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Morning Yoga Flow" />
                {fieldErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.name}</p>}
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <select name="category" required value={formData.category} onChange={handleChange} className={inputClass}>
                  <option value="cardio">Cardio</option>
                  <option value="fitness">Fitness</option>
                  <option value="pool">Pool</option>
                  <option value="cycling">Cycling</option>
                  <option value="hiit">HIIT</option>
                  <option value="core">Core</option>
                  <option value="dance">Dance</option>
                  <option value="bodycore">Bodycore</option>
                </select>
                {fieldErrors.category && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.category}</p>}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">Metrics & Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Duration (minutes) *</label>
                <input type="number" name="duration" required min="1" value={formData.duration} onChange={handleChange} className={inputClass} />
                {fieldErrors.duration && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.duration}</p>}
              </div>

              <div>
                <label className={labelClass}>Calories Burned (avg) *</label>
                <input type="number" name="calories" required min="1" value={formData.calories} onChange={handleChange} className={inputClass} />
                {fieldErrors.calories && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.calories}</p>}
              </div>

              <div className="md:col-span-2 mt-2">
                <label className="flex items-center gap-3 cursor-pointer group bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" name="premium" checked={formData.premium} onChange={handleChange} className="peer sr-only" />
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all"></div>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-gray-700 group-hover:text-amber-600 transition-colors">Premium Only Access</span>
                    <span className="text-xs text-gray-400 font-medium">Limit this activity to premium members.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg text-white font-bold text-sm tracking-wide transition-all shadow-sm ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"}`}
            >
              {isLoading ? "SAVING..." : "SAVE ACTIVITY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};