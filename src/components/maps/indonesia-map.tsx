"use client";

import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProvinceData {
  id: string;
  name: string;
  mentions: number;
  positive: number;
  negative: number;
  reach?: number;
}

interface IndonesiaMapProps {
  data: ProvinceData[];
  metric: "mentions" | "sentiment" | "reach";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onProvinceClick?: (province: any) => void;
  selectedProvinceId?: string;
}

const geoUrl = "/indonesia-provinces.json";

export function IndonesiaMap({
  data,
  metric,
  onProvinceClick,
  selectedProvinceId,
}: IndonesiaMapProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceData | null>(
    null
  );

  // Create a map for quick lookup using hc-key format
  const dataMap = useMemo(() => {
    const map = new Map<string, ProvinceData>();
    data.forEach((d) => map.set(d.id, d));
    return map;
  }, [data]);

  // Calculate max values for scales
  const maxMentions = Math.max(...data.map((d) => d.mentions));
  const maxReach = Math.max(...data.map((d) => d.reach || 0));

  // Color scale for mentions
  const mentionsColorScale = scaleLinear<string>()
    .domain([0, maxMentions])
    .range(isDark ? ["#1E3A5F", "#60A5FA"] : ["#DBEAFE", "#1D4ED8"]);

  // Color scale for reach
  const reachColorScale = scaleLinear<string>()
    .domain([0, maxReach])
    .range(isDark ? ["#1E3A5F", "#60A5FA"] : ["#DBEAFE", "#1D4ED8"]);

  // Sentiment color function
  const getSentimentColor = (positive: number, negative: number) => {
    const score = positive - negative;
    if (score > 20) return isDark ? "#22C55E" : "#16A34A";
    if (score < -10) return isDark ? "#EF4444" : "#DC2626";
    return isDark ? "#64748B" : "#94A3B8";
  };

  const getColor = (province: ProvinceData | undefined) => {
    if (!province) return isDark ? "#1E293B" : "#E2E8F0";

    switch (metric) {
      case "sentiment":
        return getSentimentColor(province.positive, province.negative);
      case "reach":
        return reachColorScale(province.reach || 0);
      case "mentions":
      default:
        return mentionsColorScale(province.mentions);
    }
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1000,
            center: [118, -2],
          }}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: Array<{ rsmKey: string; properties: Record<string, string> }> }) =>
                geographies.map((geo: { rsmKey: string; properties: Record<string, string> }) => {
                  // Get province ID from hc-key property
                  const provinceId = geo.properties["hc-key"];
                  const provinceData = dataMap.get(provinceId);
                  const isSelected = selectedProvinceId === provinceId;

                  return (
                    <Tooltip key={geo.rsmKey}>
                      <TooltipTrigger asChild>
                        <Geography
                          geography={geo}
                          fill={getColor(provinceData)}
                          stroke={
                            isSelected
                              ? "#3B82F6"
                              : isDark
                                ? "#334155"
                                : "#CBD5E1"
                          }
                          strokeWidth={isSelected ? 2 : 0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: "#3B82F6",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={() =>
                            setHoveredProvince(provinceData || null)
                          }
                          onMouseLeave={() => setHoveredProvince(null)}
                          onClick={() =>
                            provinceData && onProvinceClick?.(provinceData)
                          }
                        />
                      </TooltipTrigger>
                      {hoveredProvince && hoveredProvince.id === provinceId && (
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{hoveredProvince.name}</p>
                            <p className="text-sm">
                              {hoveredProvince.mentions.toLocaleString()} mentions
                            </p>
                            <div className="flex gap-2 text-xs">
                              <span className="text-green-600">
                                +{hoveredProvince.positive}%
                              </span>
                              <span className="text-red-600">
                                -{hoveredProvince.negative}%
                              </span>
                            </div>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <p className="text-xs font-medium mb-2">
            {metric === "mentions"
              ? "Mention Volume"
              : metric === "sentiment"
                ? "Sentiment"
                : "Reach"}
          </p>
          {metric === "mentions" || metric === "reach" ? (
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">Low</span>
              <div className="flex">
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity, i) => (
                  <div
                    key={i}
                    className="w-6 h-4"
                    style={{
                      backgroundColor:
                        metric === "mentions"
                          ? mentionsColorScale(maxMentions * opacity)
                          : reachColorScale(maxReach * opacity),
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">High</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-500" /> Positive
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-slate-400" /> Neutral
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-red-500" /> Negative
              </span>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
