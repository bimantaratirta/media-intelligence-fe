"use client";

import { MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatCompact } from "@/lib/utils";

interface Province {
  id: string;
  name: string;
  mentions: number;
  positive: number;
  negative: number;
  change: number;
  [key: string]: unknown;
}

interface ProvinceListProps {
  provinces: Province[];
  selectedId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (province: any) => void;
  maxItems?: number;
}

export function ProvinceList({
  provinces,
  selectedId,
  onSelect,
  maxItems = 10,
}: ProvinceListProps) {
  const displayedProvinces = provinces.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Top Provinces
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {displayedProvinces.map((province, index) => (
              <div
                key={province.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors",
                  selectedId === province.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500"
                    : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                )}
                onClick={() => onSelect?.(province)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500 w-5">
                      {index + 1}.
                    </span>
                    <div>
                      <p className="font-medium">{province.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-green-600">
                          {province.positive}% pos
                        </span>
                        <span className="text-red-600">
                          {province.negative}% neg
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCompact(province.mentions)}</p>
                    <p
                      className={cn(
                        "text-xs flex items-center justify-end gap-1",
                        province.change >= 0 ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {province.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(province.change)}%
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(province.mentions / provinces[0].mentions) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {provinces.length > maxItems && (
          <Button variant="ghost" className="w-full mt-4">
            Show All {provinces.length} Provinces
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
