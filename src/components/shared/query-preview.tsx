"use client";

import { useState } from "react";
import { Play, Copy, Check, Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QueryPreviewProps {
  primary: string[];
  mustContain: string[];
  exclude: string[];
}

export function QueryPreview({ primary, mustContain, exclude }: QueryPreviewProps) {
  const [copied, setCopied] = useState(false);

  const generateQuery = () => {
    let query = "";

    if (primary.length > 0) {
      query += `(${primary.map((k) => `"${k}"`).join(" OR ")})`;
    }

    if (mustContain.length > 0) {
      query += `\nAND (${mustContain.map((k) => `"${k}"`).join(" OR ")})`;
    }

    if (exclude.length > 0) {
      query += `\nNOT (${exclude.map((k) => `"${k}"`).join(" OR ")})`;
    }

    return query;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateQuery());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (primary.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center text-slate-500">
          <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Add primary keywords to see query preview</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Code className="h-4 w-4" />
            Query Preview
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Play className="h-4 w-4 mr-1" />
              Test Query
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-sm overflow-x-auto">
          <code>
            {primary.length > 0 && (
              <span>
                <span className="text-slate-400">(</span>
                {primary.map((k, i) => (
                  <span key={k}>
                    <span className="text-green-400">&quot;{k}&quot;</span>
                    {i < primary.length - 1 && <span className="text-blue-400"> OR </span>}
                  </span>
                ))}
                <span className="text-slate-400">)</span>
              </span>
            )}
            {mustContain.length > 0 && (
              <>
                {"\n"}
                <span className="text-yellow-400">AND </span>
                <span className="text-slate-400">(</span>
                {mustContain.map((k, i) => (
                  <span key={k}>
                    <span className="text-green-400">&quot;{k}&quot;</span>
                    {i < mustContain.length - 1 && <span className="text-blue-400"> OR </span>}
                  </span>
                ))}
                <span className="text-slate-400">)</span>
              </>
            )}
            {exclude.length > 0 && (
              <>
                {"\n"}
                <span className="text-red-400">NOT </span>
                <span className="text-slate-400">(</span>
                {exclude.map((k, i) => (
                  <span key={k}>
                    <span className="text-green-400">&quot;{k}&quot;</span>
                    {i < exclude.length - 1 && <span className="text-blue-400"> OR </span>}
                  </span>
                ))}
                <span className="text-slate-400">)</span>
              </>
            )}
          </code>
        </pre>
      </CardContent>
    </Card>
  );
}
