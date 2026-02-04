"use client";

import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeatmapData {
  day: string;
  hours: number[];
}

interface ActivityHeatmapProps {
  data: HeatmapData[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Find min and max for color scale
  const allValues = data.flatMap((d) => d.hours);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  const getColor = (value: number) => {
    const intensity = (value - minValue) / (maxValue - minValue);
    if (isDark) {
      if (intensity < 0.25) return "bg-blue-950";
      if (intensity < 0.5) return "bg-blue-800";
      if (intensity < 0.75) return "bg-blue-600";
      return "bg-blue-400";
    } else {
      if (intensity < 0.25) return "bg-blue-100";
      if (intensity < 0.5) return "bg-blue-300";
      if (intensity < 0.75) return "bg-blue-500";
      return "bg-blue-700";
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex mb-1">
            <div className="w-12" />
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-1 text-center text-xs text-slate-500"
              >
                {parseInt(hour) % 3 === 0 ? hour : ""}
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          {data.map((row) => (
            <div key={row.day} className="flex items-center mb-1">
              <div className="w-12 text-xs text-slate-500 font-medium">
                {row.day}
              </div>
              <div className="flex flex-1 gap-0.5">
                {row.hours.map((value, hourIndex) => (
                  <Tooltip key={hourIndex}>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex-1 h-6 rounded-sm cursor-pointer transition-transform hover:scale-110 ${getColor(value)}`}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">
                        {row.day} {hours[hourIndex]}:00
                      </p>
                      <p className="text-sm">
                        {value.toLocaleString()} mentions
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-xs text-slate-500">Less</span>
            <div className="flex gap-0.5">
              {(isDark
                ? ["bg-blue-950", "bg-blue-800", "bg-blue-600", "bg-blue-400"]
                : ["bg-blue-100", "bg-blue-300", "bg-blue-500", "bg-blue-700"]
              ).map((color, i) => (
                <div key={i} className={`w-4 h-4 rounded-sm ${color}`} />
              ))}
            </div>
            <span className="text-xs text-slate-500">More</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
