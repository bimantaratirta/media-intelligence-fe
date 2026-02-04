"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { InsightPanel, type Insight } from "@/components/shared/insight-panel";
import { IndonesiaMap } from "@/components/maps/indonesia-map";
import { ProvinceList } from "@/components/shared/province-list";
import { ProvinceDetailPanel } from "@/components/shared/province-detail-panel";

interface Province {
  id: string;
  name: string;
  mentions: number;
  positive: number;
  neutral: number;
  negative: number;
  reach: number;
  engagement: number;
  change: number;
  [key: string]: unknown;
}

interface GeoData {
  provinces: Province[];
  insights: Insight[];
  provinceDetail: {
    trend: { date: string; mentions: number }[];
    topKeywords: string[];
    topInfluencers: { username: string; mentions: number; followers: number }[];
  };
}

async function fetchGeoData(topicId: string): Promise<GeoData> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const data = await import("@/mocks/data/geo-distribution.json");
  return data.default as GeoData;
}

export default function GeoDistributionPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const [metric, setMetric] = useState<"mentions" | "sentiment" | "reach">(
    "mentions"
  );
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );

  const { data, isLoading } = useQuery({
    queryKey: ["geo-distribution", topicId],
    queryFn: () => fetchGeoData(topicId),
  });

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Geographic Distribution</h1>
          <p className="text-slate-500">
            Visualize conversation spread across Indonesia
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            value={metric}
            onValueChange={(v) =>
              setMetric(v as "mentions" | "sentiment" | "reach")
            }
          >
            <TabsList>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
              <TabsTrigger value="reach">Reach</TabsTrigger>
            </TabsList>
          </Tabs>
          <DateRangePicker />
        </div>
      </div>

      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle>Indonesia Map</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[500px]" />
          ) : (
            <IndonesiaMap
              data={data?.provinces || []}
              metric={metric}
              onProvinceClick={handleProvinceSelect}
              selectedProvinceId={selectedProvince?.id}
            />
          )}
        </CardContent>
      </Card>

      {/* Province List & Detail */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Province List */}
        {isLoading ? (
          <Skeleton className="h-[500px]" />
        ) : (
          <ProvinceList
            provinces={data?.provinces || []}
            selectedId={selectedProvince?.id}
            onSelect={handleProvinceSelect}
          />
        )}

        {/* Province Detail */}
        <ProvinceDetailPanel
          province={selectedProvince}
          trend={data?.provinceDetail?.trend}
        />
      </div>

      {/* Insights */}
      <InsightPanel insights={data?.insights || []} loading={isLoading} />
    </div>
  );
}
