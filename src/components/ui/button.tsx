import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-slate-950 hover:brightness-110 border-transparent",
  outline: "bg-transparent border border-border hover:bg-surface2",
  ghost: "bg-transparent border border-transparent hover:bg-surface2"
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
