import { useState } from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import type { JobCreateFormInput,JobCreateFormOutput } from "../../model";

interface RichTextTabProps {
  control: Control<JobCreateFormInput, any, JobCreateFormOutput>;
  errors: FieldErrors<JobCreateFormInput>;
}
type tabTypes = "description" | "requirements" | "benefits";

export const RichTextTab = ({ control, errors }: RichTextTabProps) => {
  const [activeTab, setActiveTab] = useState<tabTypes>("description");
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-200 bg-gray-50/70 p-2 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "description"
              ? "bg-white text-emerald-600 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          Mô tả công việc
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("requirements")}
          className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "requirements"
              ? "bg-white text-emerald-600 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          Mô tả yêu cầu
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("benefits")}
          className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            activeTab === "benefits"
              ? "bg-white text-emerald-600 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          Mô tả lợi ích
        </button>
      </div>
      {/* Tabs */}
      <div className="p-4">
        <div className={activeTab === "description" ? "block" : "hidden"}>
          <Controller
            name="description_html"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Mô tập công việc vào đây !!"
              />
            )}
          />
          {errors.description_html && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description_html.message}</p>}
        </div>
        <div className={activeTab === "requirements" ? "block" : "hidden"}>
          <Controller
            name="requirements_html"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Mô tập công việc vào đây !!"
              />
            )}
          />
          {errors.requirements_html && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.requirements_html.message}</p>}
        </div>
        <div className={activeTab === "benefits" ? "block" : "hidden"}>
          <Controller
            name="benefits_html"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                placeholder="Mô tập công việc vào đây !!"
              />
            )}
          />
          {errors.benefits_html && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.benefits_html.message}</p>}
        </div>
      </div>
    </div>
  );
};

