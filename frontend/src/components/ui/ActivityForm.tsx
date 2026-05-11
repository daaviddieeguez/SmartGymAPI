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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
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

      console.log("Sending payload:", cleanPayload);

      if (isEdit) {
        await ActivityService.update(initialData.id, cleanPayload);
      } else {
        await ActivityService.create(cleanPayload);
      }

      router.push("/activities");
      router.refresh();
    } catch (err: any) {
      console.error("FULL ERROR OBJECT:", err);
      if (err.errors && Object.keys(err.errors).length > 0) {
        setFieldErrors(err.errors);
      } else if (err.message) {
        setGeneralError(err.message);
      } else {
        setGeneralError(
          "An unexpected error occurred connecting to the server.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">
          {isEdit ? "Edit" : "Create"} Activity
        </h1>
        <Link
          href="/activities"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8">
        {generalError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Activity Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              >
                <option value="cardio">Cardio</option>
                <option value="fitness">Fitness</option>
                <option value="pool">Pool</option>
                <option value="cycling">Cycling</option>
                <option value="hiit">HIIT</option>
                <option value="core">Core</option>
                <option value="dance">Dance</option>
                <option value="bodycore">Bodycore</option>
              </select>
              {fieldErrors.category && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {fieldErrors.category}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (minutes) *
              </label>
              <input
                type="number"
                name="duration"
                required
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
              {fieldErrors.duration && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {fieldErrors.duration}
                </p>
              )}
            </div>

            {/* Calories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Calories Burned *
              </label>
              <input
                type="number"
                name="calories"
                required
                min="1"
                value={formData.calories}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
              />
              {fieldErrors.calories && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {fieldErrors.calories}
                </p>
              )}
            </div>

            {/* Premium Checkbox */}
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="premium"
                  checked={formData.premium}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Premium Only Access
                </span>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${isLoading ? "bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"}`}
            >
              {isLoading ? "Saving..." : "Save Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
