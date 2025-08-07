import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-3 rounded-2xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl";

    const variants = {
      primary:
        "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500/50 shadow-green-500/25",
      secondary:
        "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-500/50 shadow-slate-500/25",
      outline:
        "border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white focus:ring-green-500/50 bg-transparent",
      ghost:
        "text-green-500 hover:bg-green-500/10 focus:ring-green-500/50 bg-transparent shadow-none",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-5 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner size="sm" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
