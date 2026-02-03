"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface KeywordInputProps {
  value: string[];
  onChange: (keywords: string[]) => void;
  placeholder?: string;
  maxItems?: number;
  disabled?: boolean;
}

export function KeywordInput({
  value,
  onChange,
  placeholder = "Type and press Enter...",
  maxItems = 50,
  disabled = false,
}: KeywordInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (value.length >= maxItems) return;
      if (value.includes(inputValue.trim())) {
        setInputValue("");
        return;
      }
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeKeyword = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((keyword) => (
          <Badge key={keyword} variant="secondary" className="gap-1 pr-1">
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="ml-1 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 p-0.5"
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length >= maxItems ? "Maximum reached" : placeholder}
        disabled={disabled || value.length >= maxItems}
      />
      <p className="text-xs text-slate-500">
        Press Enter to add. {value.length}/{maxItems} keywords.
      </p>
    </div>
  );
}
