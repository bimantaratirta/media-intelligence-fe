"use client";

import { useState, KeyboardEvent, useRef } from "react";
import { X, Plus, Info } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface KeywordInputEnhancedProps {
  value: string[];
  onChange: (keywords: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  disabled?: boolean;
  variant?: "primary" | "mustContain" | "exclude";
  label: string;
  description: string;
  tooltipContent?: string;
}

const variantStyles = {
  primary: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200",
    icon: "text-blue-600",
  },
  mustContain: {
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200",
    icon: "text-green-600",
  },
  exclude: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200",
    icon: "text-red-600",
  },
};

export function KeywordInputEnhanced({
  value,
  onChange,
  placeholder = "Type and press Enter...",
  maxItems = 50,
  disabled = false,
  variant = "primary",
  label,
  description,
  tooltipContent,
}: KeywordInputEnhancedProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const styles = variantStyles[variant];

  const addKeyword = () => {
    if (inputValue.trim() && value.length < maxItems && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeKeyword = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex items-center gap-2">
        <h4 className="font-medium">{label}</h4>
        {tooltipContent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">{tooltipContent}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-sm text-slate-500">{description}</p>

      {/* Keywords */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((keyword) => (
            <Badge key={keyword} variant="secondary" className={cn("gap-1 pr-1 text-sm", styles.badge)}>
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="ml-1 rounded-full p-0.5 hover:bg-black/10"
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length >= maxItems ? "Maximum reached" : placeholder}
          disabled={disabled || value.length >= maxItems}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addKeyword}
          disabled={disabled || !inputValue.trim() || value.length >= maxItems}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-slate-400">
        {value.length}/{maxItems} keywords
      </p>
    </div>
  );
}
