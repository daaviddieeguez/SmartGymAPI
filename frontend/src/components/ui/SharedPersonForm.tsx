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

export const SharedPersonForm = ({ initialData = {}, baseRoute }: SharedPersonFormProps) => {
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
        if (isEdit) await MemberService.update(initialData.id, cleanPayload);
        else await MemberService.create(cleanPayload);
      } else {
        cleanPayload.salary = Number(formData.salary);
        if (isEdit) await MonitorService.update(initialData.id, cleanPayload);
        else await MonitorService.create(cleanPayload);
      }

      router.push(`/${baseRoute}`);
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
      
      <div className="w-full max-w-4xl mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            {isEdit ? "Edit" : "Create"} {baseRoute.slice(0, -1)}
          </h1>
          <p className="text-gray-500 font-medium mt-1">Ensure all required fields are filled out accurately.</p>
        </div>
        <Link href={`/${baseRoute}`} className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">
          CANCEL
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {generalError && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8">
          
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">Personal Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className={labelClass}>National ID (DNI)</label>
              <input type="text" name="dni" disabled={isEdit} required value={formData.dni} onChange={handleChange} className={`${inputClass} ${isEdit ? 'opacity-60 cursor-not-allowed font-mono' : 'font-mono'}`} />
              {fieldErrors.dni && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.dni}</p>}
            </div>
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} />
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className={labelClass}>Birthdate *</label>
              <input type="date" name="birthdate" required value={formData.birthdate} onChange={handleChange} className={inputClass} />
              {fieldErrors.birthdate && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.birthdate}</p>}
            </div>
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input type="text" name="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} className={inputClass} />
              {fieldErrors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.phoneNumber}</p>}
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">Location Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className={labelClass}>Street Address *</label>
              <input type="text" name="address" required value={formData.address} onChange={handleChange} className={inputClass} />
              {fieldErrors.address && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.address}</p>}
            </div>
            <div>
              <label className={labelClass}>Locality / City *</label>
              <input type="text" name="locality" required value={formData.locality} onChange={handleChange} className={inputClass} />
              {fieldErrors.locality && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.locality}</p>}
            </div>
            <div>
              <label className={labelClass}>Province *</label>
              <input type="text" name="province" required value={formData.province} onChange={handleChange} className={inputClass} />
              {fieldErrors.province && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.province}</p>}
            </div>
            <div>
              <label className={labelClass}>Postal Code *</label>
              <input type="text" name="postCode" required value={formData.postCode} onChange={handleChange} className={inputClass} />
              {fieldErrors.postCode && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.postCode}</p>}
            </div>
          </div>

          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-6">System Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {isMonitor && (
              <div>
                <label className={labelClass}>Monthly Salary (€) *</label>
                <input type="number" step="0.01" name="salary" required value={formData.salary} onChange={handleChange} className={inputClass} />
                {fieldErrors.salary && <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.salary}</p>}
              </div>
            )}

            {isMember && (
              <div className="flex gap-8 items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" name="premium" checked={formData.premium} onChange={handleChange} className="peer sr-only" />
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-amber-600 transition-colors">Premium Plan</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="peer sr-only" />
                    <div className="w-5 h-5 bg-white border-2 border-gray-300 rounded peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">Account Active</span>
                </label>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg text-white font-bold text-sm tracking-wide transition-all shadow-sm ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"}`}
            >
              {isLoading ? "SAVING..." : "SAVE RECORD"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};