"use client";

import { useRef, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Pause, Play, Focus } from "lucide-react";
import type { NetworkNode, NetworkLink, ClusterAnalysis } from "@/mocks/data/influencers";

// Dynamic import to avoid SSR issues
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
      Loading graph...
    </div>
  ),
});

interface NetworkGraphProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  clusters: ClusterAnalysis[];
}

const CLUSTER_COLORS: Record<number, string> = {
  0: "#6B7280", // gray (isolated)
  1: "#EF4444", // red (suspicious)
  2: "#22C55E", // green (organic)
  3: "#3B82F6", // blue (media)
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphRefType = any;

export function NetworkGraph({ nodes, links, clusters }: NetworkGraphProps) {
  const graphRef = useRef<GraphRefType>(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const [botScoreFilter, setBotScoreFilter] = useState([0]);
  const [graphReady, setGraphReady] = useState(false);

  // Center graph after it's ready
  const handleEngineStop = useCallback(() => {
    if (graphRef.current && !graphReady) {
      graphRef.current.zoomToFit(400, 50);
      setGraphReady(true);
    }
  }, [graphReady]);

  const filteredNodes = nodes.filter((n) => n.botScore >= botScoreFilter[0]);
  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredLinks = links.filter(
    (l) =>
      filteredNodeIds.has(l.source as string) &&
      filteredNodeIds.has(l.target as string)
  );

  const graphData = {
    nodes: filteredNodes,
    links: filteredLinks,
  };

  const handleZoomIn = useCallback(() => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom * 1.5, 400);
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (graphRef.current) {
      const currentZoom = graphRef.current.zoom();
      graphRef.current.zoom(currentZoom / 1.5, 400);
    }
  }, []);

  const handleTogglePause = useCallback(() => {
    if (graphRef.current) {
      if (isPaused) {
        graphRef.current.resumeAnimation();
      } else {
        graphRef.current.pauseAnimation();
      }
      setIsPaused(!isPaused);
    }
  }, [isPaused]);

  const handleZoomToCluster = useCallback(
    (clusterId: number) => {
      if (graphRef.current) {
        const clusterNodes = nodes.filter((n) => n.group === clusterId);
        if (clusterNodes.length > 0) {
          const centerNode = clusterNodes[0];
          if (centerNode.x !== undefined && centerNode.y !== undefined) {
            graphRef.current.centerAt(centerNode.x, centerNode.y, 1000);
            graphRef.current.zoom(3, 1000);
          }
        }
      }
    },
    [nodes]
  );

  const nodeCanvasObject = useCallback(
    (node: NetworkNode, ctx: CanvasRenderingContext2D) => {
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const size = Math.sqrt(node.followers) / 50 + 4;
      const color = CLUSTER_COLORS[node.group] || CLUSTER_COLORS[0];

      // Draw node circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw border based on bot score
      if (node.botScore > 0.6) {
        ctx.strokeStyle = "#EF4444";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw label for larger nodes
      if (node.followers > 10000) {
        ctx.font = "3px Sans-Serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(node.username, x, y + size + 4);
      }
    },
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Interaction Network</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleTogglePause}>
            {isPaused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filter */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-muted-foreground">Min Bot Score:</span>
          <Slider
            value={botScoreFilter}
            onValueChange={setBotScoreFilter}
            min={0}
            max={0.9}
            step={0.1}
            className="w-48"
          />
          <span className="text-sm font-medium">
            {botScoreFilter[0].toFixed(1)}
          </span>
        </div>

        {/* Graph */}
        <div className="h-[400px] bg-muted rounded-lg overflow-hidden">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeCanvasObject={nodeCanvasObject as (node: object, ctx: CanvasRenderingContext2D, globalScale: number) => void}
            linkColor={() => "#CBD5E1"}
            linkWidth={(link: object) => ((link as NetworkLink).weight || 1) / 10}
            linkDirectionalArrowLength={3}
            linkDirectionalArrowRelPos={1}
            cooldownTicks={100}
            onEngineStop={handleEngineStop}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            onNodeClick={(node: object) => {
              const n = node as NetworkNode;
              window.open(
                `https://twitter.com/${n.username.replace("@", "")}`,
                "_blank"
              );
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Suspicious Cluster</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Organic Community</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Media Network</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span>Isolated</span>
          </div>
        </div>

        {/* Cluster Analysis */}
        <div className="mt-6 space-y-3">
          <h4 className="font-medium">Detected Clusters</h4>
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{cluster.name}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {cluster.accountCount} accounts
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleZoomToCluster(cluster.id)}
                >
                  <Focus className="h-4 w-4 mr-1" />
                  Zoom
                </Button>
              </div>
              <p className="text-sm">
                <strong>Behavior:</strong> {cluster.behavior}
              </p>
              <p className="text-sm">
                <strong>Hub:</strong> {cluster.hubAccount}
              </p>
              <p className="text-sm">
                <strong>Avg Bot Score:</strong> {cluster.avgBotScore.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {cluster.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
