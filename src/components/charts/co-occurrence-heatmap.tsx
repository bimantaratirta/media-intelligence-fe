"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { CoOccurrence } from "@/mocks/data/wordcloud";

interface CoOccurrenceHeatmapProps {
  data: CoOccurrence[];
}

function getHeatColor(percentage: number): string {
  if (percentage >= 70) return "bg-blue-600 text-white";
  if (percentage >= 50) return "bg-blue-400 text-white";
  if (percentage >= 30) return "bg-blue-200 text-blue-800";
  return "bg-blue-50 text-blue-600";
}

export function CoOccurrenceHeatmap({ data }: CoOccurrenceHeatmapProps) {
  // Extract unique words
  const words = useMemo(() => {
    const wordSet = new Set<string>();
    data.forEach((d) => {
      wordSet.add(d.word1);
      wordSet.add(d.word2);
    });
    return Array.from(wordSet).slice(0, 6); // Limit to 6 for display
  }, [data]);

  // Create matrix
  const matrix = useMemo(() => {
    const m: Record<string, Record<string, number>> = {};
    words.forEach((w1) => {
      m[w1] = {};
      words.forEach((w2) => {
        if (w1 === w2) {
          m[w1][w2] = -1; // diagonal
        } else {
          const occurrence = data.find(
            (d) =>
              (d.word1 === w1 && d.word2 === w2) ||
              (d.word1 === w2 && d.word2 === w1)
          );
          m[w1][w2] = occurrence?.percentage || 0;
        }
      });
    });
    return m;
  }, [words, data]);

  // Find top co-occurrence for insight
  const topCoOccurrence = data.reduce((prev, current) =>
    prev.percentage > current.percentage ? prev : current
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Co-Occurrence Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Which words appear together frequently?
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="p-2"></th>
                {words.map((word) => (
                  <th
                    key={word}
                    className="p-2 text-center font-medium truncate max-w-20"
                  >
                    {word}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {words.map((word1) => (
                <tr key={word1}>
                  <td className="p-2 font-medium truncate max-w-24">{word1}</td>
                  {words.map((word2) => (
                    <td key={word2} className="p-1">
                      {matrix[word1][word2] === -1 ? (
                        <div className="w-full h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">
                          -
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-full h-10 rounded flex items-center justify-center font-medium",
                            getHeatColor(matrix[word1][word2])
                          )}
                          title={`${word1} + ${word2}: ${matrix[word1][word2]}%`}
                        >
                          {matrix[word1][word2] > 0
                            ? `${matrix[word1][word2]}%`
                            : ""}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Insight */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <p className="text-sm flex items-start gap-2">
            <span className="text-lg">💡</span>
            <span>
              <strong>{topCoOccurrence.word1}</strong> dan{" "}
              <strong>{topCoOccurrence.word2}</strong> sering muncul bersamaan (
              {topCoOccurrence.percentage}% co-occurrence), menunjukkan relasi
              kuat dalam percakapan
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
