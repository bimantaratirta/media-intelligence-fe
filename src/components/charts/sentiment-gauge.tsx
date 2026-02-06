"use client";

import { useTheme } from "next-themes";

interface SentimentGaugeProps {
  value: number; // -1 to 1
  change: number;
}

export function SentimentGauge({ value, change }: SentimentGaugeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Convert -1 to 1 range to 0 to 180 degrees
  const angle = ((value + 1) / 2) * 180;

  // Determine color based on value (muted colors)
  const getColor = () => {
    if (value > 0.2) return "#16A34A"; // green-600 (muted)
    if (value < -0.2) return "#DC2626"; // red-600 (muted)
    return "#64748B"; // neutral
  };

  const getLabel = () => {
    if (value > 0.2) return "POSITIVE";
    if (value < -0.2) return "NEGATIVE";
    return "NEUTRAL";
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={isDark ? "#334155" : "#E2E8F0"}
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Gradient definitions - muted colors */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>

        {/* Colored arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity={0.3}
        />

        {/* Needle */}
        <g transform={`rotate(${angle - 90}, 100, 100)`}>
          <line x1="100" y1="100" x2="100" y2="35" stroke={getColor()} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="8" fill={getColor()} />
        </g>

        {/* Labels */}
        <text x="20" y="115" fontSize="10" fill={isDark ? "#94A3B8" : "#64748B"}>
          -1.0
        </text>
        <text x="95" y="115" fontSize="10" fill={isDark ? "#94A3B8" : "#64748B"}>
          0
        </text>
        <text x="170" y="115" fontSize="10" fill={isDark ? "#94A3B8" : "#64748B"}>
          +1.0
        </text>
      </svg>

      <div className="text-center -mt-2">
        <p className="text-xs text-slate-500 uppercase tracking-wider">{getLabel()}</p>
        <p className="text-2xl font-bold" style={{ color: getColor() }}>
          {value >= 0 ? "+" : ""}
          {value.toFixed(2)}
        </p>
        <p className={`text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
          {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)} vs last period
        </p>
      </div>
    </div>
  );
}
