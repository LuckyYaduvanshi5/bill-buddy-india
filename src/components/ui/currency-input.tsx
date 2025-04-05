
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  symbol?: string;
  onValueChange?: (value: number) => void;
}

export function CurrencyInput({
  className,
  symbol = "₹",
  onValueChange,
  defaultValue,
  value,
  ...props
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(
    value?.toString() || defaultValue?.toString() || ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    
    if (rawValue === "" || rawValue === ".") {
      setDisplayValue("");
      onValueChange && onValueChange(0);
      return;
    }
    
    const numValue = parseFloat(rawValue);
    
    if (!isNaN(numValue)) {
      setDisplayValue(rawValue);
      onValueChange && onValueChange(numValue);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <span className="text-muted-foreground">{symbol}</span>
      </div>
      <Input
        className={cn("pl-8", className)}
        value={displayValue}
        onChange={handleChange}
        type="text"
        inputMode="decimal"
        {...props}
      />
    </div>
  );
}
