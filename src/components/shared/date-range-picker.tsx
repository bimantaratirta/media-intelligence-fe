"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function DateRangePicker() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          Last 30 days
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
        <DropdownMenuItem>Last 90 days</DropdownMenuItem>
        <DropdownMenuItem>This year</DropdownMenuItem>
        <DropdownMenuItem>Custom range</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
