import { forwardRef } from "react";

import cn from "@/utils/cn";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div>
      {label && <label className="mb-1.5 block text-14-500">{label}</label>}
      <textarea
        {...props}
        ref={ref}
        className={cn(
          "w-full rounded border p-2 min-h-100 resize-none",
          error && "border-red-500",
          className,
        )}
      />
      {error && <p className="mt-1 text-12-500 text-red-500">{error}</p>}
    </div>
  ),
);

TextArea.displayName = "TextArea"; // forwardRef 사용 시 displayName 설정 권장

export default TextArea;
