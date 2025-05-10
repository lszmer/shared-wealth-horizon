
import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  initial?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function AvatarButton({
  initial = "U",
  color = "bg-finance-accent",
  size = "md",
  className,
  ...props
}: AvatarButtonProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <button
      className={cn(
        "rounded-full flex items-center justify-center text-white font-medium",
        color,
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {initial.toUpperCase()}
    </button>
  );
}
