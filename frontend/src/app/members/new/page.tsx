"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PersonRequest } from "@/src/types";
import { MemberService } from "@/src/services/member.service";

export default function NewMemberPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<PersonRequest>({
    dni: "",
    name: "",
    birthdate: "",
    address: "",
    locality: "",
    province: "",
    postCode: "",
    phoneNumber: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  // Handle form submission
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFieldErrors({});

    try {
      await MemberService.create(formData);
      router.push("/members");
      router.refresh();
    } catch (err: any) {
      // 2. Catch the Spring Boot structure!
      if (err.errors) {
        // If Spring Boot sent field validation errors, put them in state
        setFieldErrors(err.errors);
      } else if (err.message) {
        // If it's a general RuntimeException from your handler
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Add New Member
        </h1>
        <Link
          href="/members"
          className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8">
        {generalError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-100 dark:border-red-800/50">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DNI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                DNI *
              </label>
              <input
                type="text"
                name="dni"
                required
                pattern="^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$"
                title="8 digits followed by an uppercase letter"
                value={formData.dni}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="12345678A"
              />
              {fieldErrors.dni && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.dni}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                minLength={3}
                maxLength={50}
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="John Doe"
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.name}</p>
              )}
            </div>

            {/* Birthdate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Birthdate *
              </label>
              <input
                type="date"
                name="birthdate"
                required
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              {fieldErrors.birthdate && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.birthdate}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                name="phoneNumber"
                required
                pattern="^[0-9]{9}$"
                title="Must be exactly 9 digits"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="600123456"
              />
              {fieldErrors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.phoneNumber}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Street Name, Number, Floor"
              />
              {fieldErrors.address && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.address}</p>
              )}
            </div>

            {/* Locality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Locality *
              </label>
              <input
                type="text"
                name="locality"
                required
                value={formData.locality}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Manchester"
              />
              {fieldErrors.locality && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.locality}</p>
              )}
            </div>

            {/* Province */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Province *
              </label>
              <input
                type="text"
                name="province"
                required
                value={formData.province}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Greater Manchester"
              />
              {fieldErrors.province && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.province}</p>
              )}
            </div>

            {/* Post Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Post Code *
              </label>
              <input
                type="text"
                name="postCode"
                required
                pattern="^[0-9]{5}$"
                title="Must be exactly 5 digits"
                value={formData.postCode}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="12345"
              />
              {fieldErrors.postCode && (
                <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.postCode}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
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
              {isLoading ? "Saving..." : "Create Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
