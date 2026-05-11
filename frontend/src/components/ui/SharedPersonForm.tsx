"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MemberService } from "@/src/services/member.service";
import { MonitorService } from "@/src/services/monitor.service";

interface SharedPersonFormProps {
  initialData?: any;
  baseRoute: "members" | "monitors";
}

export const SharedPersonForm = ({
  initialData = {},
  baseRoute,
}: SharedPersonFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isMember = baseRoute === "members";
  const isMonitor = baseRoute === "monitors";
  
  const isEdit = !!initialData.id; 

  const [formData, setFormData] = useState({
    dni: initialData.dni || "",
    name: initialData.name || "",
    birthdate: initialData.birthdate || "",
    address: initialData.address || "",
    locality: initialData.locality || "",
    province: initialData.province || "",
    postCode: initialData.postCode || "",
    phoneNumber: initialData.phoneNumber || "",
    salary: initialData.salary || "",
    premium: initialData.premium || false,
    active: initialData.active ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
      const cleanPayload: any = {
        dni: formData.dni,
        name: formData.name,
        birthdate: formData.birthdate,
        address: formData.address,
        locality: formData.locality,
        province: formData.province,
        postCode: formData.postCode,
        phoneNumber: formData.phoneNumber,
      };

      if (baseRoute === "members") {
        cleanPayload.premium = formData.premium;
        cleanPayload.active = formData.active;
        
        if (isEdit) {
          await MemberService.update(initialData.id, cleanPayload);
        } else {
          await MemberService.create(cleanPayload);
        }
      } else {
        cleanPayload.salary = Number(formData.salary);
        
        if (isEdit) {
          await MonitorService.update(initialData.id, cleanPayload);
        } else {
          await MonitorService.create(cleanPayload);
        }
      }

      router.push(`/${baseRoute}`);
      router.refresh();
    } catch (err: any) {
      if (err.errors && Object.keys(err.errors).length > 0) {
        setFieldErrors(err.errors);
      } else if (err.message) {
        setGeneralError(err.message);
      } else {
        setGeneralError("An unexpected error occurred connecting to the server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">
          {isEdit ? "Edit" : "Create"} {baseRoute.slice(0, -1)}
        </h1>
        <Link href={`/${baseRoute}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 transition-colors">
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
            
            {/* DNI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DNI</label>
              <input 
                type="text" 
                name="dni" 
                disabled={isEdit} 
                required
                value={formData.dni} 
                onChange={handleChange}
                className={`w-full px-4 py-2 border dark:border-zinc-700 rounded-lg outline-none ${isEdit ? 'bg-gray-100 dark:bg-zinc-800 text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500'}`} 
              />
              {fieldErrors.dni && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.dni}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Birthdate *</label>
              <input type="date" name="birthdate" required value={formData.birthdate} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.birthdate && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.birthdate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
              <input type="text" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.phoneNumber}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address *</label>
              <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.address && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.address}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Locality *</label>
              <input type="text" name="locality" required value={formData.locality} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.locality && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.locality}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Province *</label>
              <input type="text" name="province" required value={formData.province} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.province && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.province}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Post Code *</label>
              <input type="text" name="postCode" required value={formData.postCode} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              {fieldErrors.postCode && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.postCode}</p>}
            </div>

            {isMonitor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Salary (€) *</label>
                <input type="number" step="0.01" name="salary" required value={formData.salary} onChange={handleChange} className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
                {fieldErrors.salary && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.salary}</p>}
              </div>
            )}

            {isMember && (
              <div className="flex gap-4 items-center mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="premium" checked={formData.premium} onChange={handleChange} className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Premium Member</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer ml-4">
                  <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="w-5 h-5 text-emerald-500 bg-gray-100 border-gray-300 rounded dark:bg-zinc-800 dark:border-zinc-700" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Account Active</span>
                </label>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                isLoading
                  ? "bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              }`}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};