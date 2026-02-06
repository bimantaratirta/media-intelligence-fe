"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Youtube, Facebook } from "lucide-react";
import { BLUE_SEQUENTIAL_SCALE } from "@/lib/utils";

interface PlatformDemo {
  platform: string;
  platformName: string;
  gender: { male: number; female: number };
  ageGroups: Record<string, number>;
  dominantDemo: string;
  totalMentions: number;
}

interface PlatformDemographicsMatrixProps {
  data: PlatformDemo[];
}

// Use blue sequential scale instead of rainbow HSL
const AGE_COLORS = BLUE_SEQUENTIAL_SCALE;

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "twitter":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      );
    case "youtube":
      return <Youtube className="h-4 w-4" />;
    case "facebook":
      return <Facebook className="h-4 w-4" />;
    case "news":
      return <Newspaper className="h-4 w-4" />;
    default:
      return <span className="text-sm font-bold">?</span>;
  }
}

export function PlatformDemographicsMatrix({ data }: PlatformDemographicsMatrixProps) {
  const ageLabels = Object.keys(data[0]?.ageGroups || {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Platform x Demographic Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {data.map((platform) => (
            <div
              key={platform.platform}
              className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={platform.platform} />
                  <span className="font-medium text-slate-900 dark:text-slate-200">{platform.platformName}</span>
                </div>
                <Badge variant="secondary">{platform.totalMentions.toLocaleString()} mentions</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                {/* Gender Bar */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Gender</p>
                  <div className="flex h-5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 flex items-center justify-center"
                      style={{ width: `${platform.gender.male}%` }}
                    >
                      {platform.gender.male >= 20 && (
                        <span className="text-[10px] text-white font-medium">{platform.gender.male}% ♂</span>
                      )}
                    </div>
                    <div
                      className="bg-purple-600 flex items-center justify-center"
                      style={{ width: `${platform.gender.female}%` }}
                    >
                      {platform.gender.female >= 20 && (
                        <span className="text-[10px] text-white font-medium">{platform.gender.female}% ♀</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dominant Demo */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Dominant</p>
                  <Badge variant="outline" className="font-medium">
                    {platform.dominantDemo}
                  </Badge>
                </div>
              </div>

              {/* Age Distribution Mini Bar */}
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Age Distribution</p>
                <div className="flex h-4 rounded overflow-hidden">
                  {Object.entries(platform.ageGroups).map(([age, percentage], idx) => (
                    <div
                      key={age}
                      className="flex items-center justify-center text-[9px] text-white font-medium"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: AGE_COLORS[idx % AGE_COLORS.length],
                      }}
                      title={`${age}: ${percentage}%`}
                    >
                      {percentage >= 15 && `${percentage}%`}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{ageLabels[0]}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{ageLabels[ageLabels.length - 1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
