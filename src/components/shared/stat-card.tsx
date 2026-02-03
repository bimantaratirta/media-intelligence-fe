import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCompact, cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  format?: "number" | "percentage" | "compact";
  sparklineData?: { value: number }[];
  loading?: boolean;
}

export function StatCard({ title, value, change, format = "compact", sparklineData, loading = false }: StatCardProps) {
  const formatValue = () => {
    switch (format) {
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "compact":
        return formatCompact(value);
      default:
        return value.toLocaleString();
    }
  };

  const isPositive = change >= 0;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold">{formatValue()}</span>
          <span className={cn("flex items-center text-sm font-medium", isPositive ? "text-green-600" : "text-red-600")}>
            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {Math.abs(change).toFixed(1)}%
          </span>
        </div>
        {sparklineData && (
          <div className="mt-4">
            <Sparkline data={sparklineData} color={isPositive ? "#22C55E" : "#EF4444"} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
