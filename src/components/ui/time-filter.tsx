
import * as React from "react";
import { cn } from "@/lib/utils";

interface TimeFilterProps {
  options?: string[];
  currentOption?: string;
  onChange?: (option: string) => void;
  className?: string;
}

export function TimeFilter({
  options = ["1T", "1W", "1M", "1J", "MAX"],
  currentOption = "1W",
  onChange,
  className,
}: TimeFilterProps) {
  const [selected, setSelected] = React.useState(currentOption);

  const handleClick = (option: string) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={cn("flex justify-between w-full text-sm", className)}>
      {options.map((option) => (
        <button
          key={option}
          className={cn(
            "px-1 py-0.5 flex-1 text-center",
            selected === option
              ? "border-b-2 border-finance-dark font-medium"
              : "text-gray-400"
          )}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
