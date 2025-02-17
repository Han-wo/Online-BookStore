/*eslint-disable*/
import cn from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  variant = "default",
  children,
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "rounded px-4 py-2 text-14-500 transition-colors",
        variant === "default" &&
          "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
        variant === "secondary" &&
          "border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100",
        className,
      )}
      {...props}
    >
      {isLoading ? "로딩 중..." : children}
    </button>
  );
}
