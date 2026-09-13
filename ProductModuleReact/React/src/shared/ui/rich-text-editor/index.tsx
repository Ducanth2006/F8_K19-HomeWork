import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Italic,
  Heading,
  Link,
  List,
  BlockQuote,
  Undo,
  Essentials,
  Paragraph,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

export interface RichTextEditorProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  minHeight?: number;
  disable?: boolean;
}

export const RichTextEditor = ({
  value = "",
  onChange,
  placeholder,
  minHeight = 150,
  disable = false,
}: RichTextEditorProps) => {
  return (
    <div className="w-full">
      {/* Tùy chỉnh trực tiếp chiều cao vùng nhập liệu, tránh làm cuộn mất thanh Toolbar */}
      <style>{`
        .ck-editor__editable_inline {
          min-height: ${minHeight}px;
          max-height: 320px;
        }
      `}</style>

      <CKEditor
        editor={ClassicEditor}
        disabled={disable}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            Link,
            List,
            BlockQuote,
            Undo,
          ],
          placeholder: placeholder || "Nhập nội dung...",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Đoạn văn",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Tiêu đề lớn (H2)",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Tiêu đề nhỏ (H3)",
                class: "ck-heading_heading3",
              },
            ],
          },
        }}
        onChange={(_, editor) => {
          const htmlDataString = editor.getData();
          onChange?.(htmlDataString);
        }}
      />
    </div>
  );
};