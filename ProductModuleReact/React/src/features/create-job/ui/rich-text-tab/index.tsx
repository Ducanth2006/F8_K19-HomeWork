import { useState } from "react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { RichTextEditor } from "@/shared/ui/rich-text-editor";
import type { JobCreateFormInput } from "../../model";

interface RichTextTabProps {
  control: Control<JobCreateFormInput>;
  errors: FieldErrors<JobCreateFormInput>;
}
type tabTypes = "description" | "requirements" | "benefits";

export const RichTextTab = ({ control, errors }: RichTextTabProps) => {
  const [activeTab, setActiveTab] = useState<tabTypes>("description");
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex border-b gap-4">
        <button
          onClick={() => setActiveTab("description")}
          className={
            activeTab === "description"
              ? "border-emerald-600 text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }
        >
          Mô tả công việc
        </button>
        <button
          onClick={() => setActiveTab("requirements")}
          className={
            activeTab === "requirements"
              ? "border-emerald-600 text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }
        >
          Mô tả yêu cầu
        </button>
        <button
          onClick={() => setActiveTab("benefits")}
          className={
            activeTab === "benefits"
              ? "border-emerald-600 text-emerald-600"
              : "text-gray-500 hover:text-gray-700"
          }
        >
          Mô tả lợi ích
        </button>
      </div>
      {/* Tabs */}
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
        {errors.description_html&&<p className="text-red-500 text-xs mt-1">{errors.description_html.message}</p>}
      </div>
      <div className={activeTab === "requirements" ? "block" : "hidden"}>
        <Controller
          name="requirements_html"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value||""}
              onChange={field.onChange}
              placeholder="Mô tập công việc vào đây !!"
            />
          )}
        />
        {errors.requirements_html&&<p className="text-red-500 text-xs mt-1">{errors.requirements_html.message}</p>}
      </div>
         <div className={activeTab === "benefits" ? "block" : "hidden"}>
        <Controller
          name="benefits_html"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value||""}
              onChange={field.onChange}
              placeholder="Mô tập công việc vào đây !!"
            />
          )}
        />
        {errors.benefits_html&&<p className="text-red-500 text-xs mt-1">{errors.benefits_html.message}</p>}
      </div>
    </div>
  );
};
