import { forwardRef } from "react";

import cn from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  unit?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, unit, className, ...props }, ref) => (
    <div>
      {label && <label className="mb-1.5 block text-14-500">{label}</label>}
      <div className="relative">
        <input
          {...props}
          ref={ref}
          className={cn(
            "w-full rounded border p-2",
            error && "border-red-500",
            className,
          )}
        />
        {unit && (
          <span className="absolute right-20 top-1/2 -translate-y-1/2 text-14-500 text-gray-500">
            {unit}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-12-400 text-red-500">{error}</p>}
    </div>
  ),
);

Input.displayName = "Input";

export default Input;
