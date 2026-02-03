"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";

interface EmotionRadarProps {
  data: Record<string, number>;
}

const emotionLabels: Record<string, string> = {
  joy: "😊 Joy",
  anger: "😠 Anger",
  sadness: "😢 Sadness",
  fear: "😨 Fear",
  surprise: "😲 Surprise",
  disgust: "🤢 Disgust",
  neutral: "😐 Neutral",
};

export function EmotionRadar({ data }: EmotionRadarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const chartData = Object.entries(data).map(([emotion, value]) => ({
    emotion: emotionLabels[emotion] || emotion,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={chartData}>
        <PolarGrid stroke={isDark ? "#334155" : "#E2E8F0"} />
        <PolarAngleAxis dataKey="emotion" tick={{ fontSize: 11, fill: isDark ? "#94A3B8" : "#64748B" }} />
        <Radar name="Emotion" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            borderRadius: "8px",
          }}
          formatter={(value) => [`${value}%`, "Share"]}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
