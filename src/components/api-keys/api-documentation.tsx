"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Copy } from "lucide-react";

interface Endpoint {
  method: string;
  path: string;
  description: string;
}

interface ApiDocumentationProps {
  baseUrl: string;
  endpoints: Endpoint[];
  onCopyBaseUrl: () => void;
}

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  POST: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  PATCH: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function ApiDocumentation({ baseUrl, endpoints, onCopyBaseUrl }: ApiDocumentationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">API Documentation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Base URL */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Base URL</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">{baseUrl}</code>
            <Button variant="outline" size="icon" onClick={onCopyBaseUrl}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Reference */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Quick Reference</p>
          <div className="space-y-2">
            {endpoints.map((endpoint, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-muted rounded text-sm">
                <Badge className={methodColors[endpoint.method]}>{endpoint.method}</Badge>
                <code className="font-mono flex-1">{endpoint.path}</code>
                <span className="text-muted-foreground text-xs hidden sm:inline">{endpoint.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Full Docs */}
        <Button variant="outline" className="w-full" asChild>
          <a href="https://docs.asha.id/api" target="_blank" rel="noopener">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Documentation
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
