
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  direction?: "left-to-right" | "right-to-left" | "bottom-to-top";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, direction = "right-to-left", ...props }, ref) => {
  const getTransformStyle = () => {
    if (direction === "bottom-to-top") {
      return { height: `${value || 0}%`, width: '100%', transform: 'none' };
    } else if (direction === "left-to-right") {
      return { transform: `translateX(-${100 - (value || 0)}%)` };
    } else {
      return { transform: `translateX(-${100 - (value || 0)}%)` };
    }
  };

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-white/10",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          indicatorClassName
        )}
        style={getTransformStyle()}
      />
    </ProgressPrimitive.Root>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
