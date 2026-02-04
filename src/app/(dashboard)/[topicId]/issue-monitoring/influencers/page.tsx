"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/shared/date-range-picker";
import { InfluencerLeaderboard } from "@/components/influencers/influencer-leaderboard";
import { InfluencerTypeChart } from "@/components/influencers/influencer-type-chart";
import { InfluencerSentimentChart } from "@/components/influencers/influencer-sentiment-chart";
import { BotScoreDistribution } from "@/components/influencers/bot-score-distribution";
import { SuspiciousAccountsTable } from "@/components/influencers/suspicious-accounts-table";
import { NetworkGraph } from "@/components/influencers/network-graph";
import { Download, Users, Bot, Share2 } from "lucide-react";
import {
  mockInfluencers,
  mockInfluencerTypeDistribution,
  mockBotAccounts,
  mockBotScoreDistribution,
  mockBotRiskSummary,
  mockNetworkNodes,
  mockNetworkLinks,
  mockClusterAnalysis,
} from "@/mocks/data/influencers";

export default function InfluencersPage() {
  const [activeTab, setActiveTab] = useState("influencers");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Influencer & Bot Detection
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Identify key voices and detect coordinated behavior
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker />
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="influencers" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Top Influencers</span>
            <span className="sm:hidden">Influencers</span>
          </TabsTrigger>
          <TabsTrigger value="bots" className="gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Bot Detection</span>
            <span className="sm:hidden">Bots</span>
          </TabsTrigger>
          <TabsTrigger value="network" className="gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Network Graph</span>
            <span className="sm:hidden">Network</span>
          </TabsTrigger>
        </TabsList>

        {/* Influencers Tab */}
        <TabsContent value="influencers" className="space-y-6 mt-6">
          <InfluencerLeaderboard data={mockInfluencers} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InfluencerTypeChart data={mockInfluencerTypeDistribution} />
            <InfluencerSentimentChart data={mockInfluencers} />
          </div>
        </TabsContent>

        {/* Bot Detection Tab */}
        <TabsContent value="bots" className="space-y-6 mt-6">
          <BotScoreDistribution
            distribution={mockBotScoreDistribution}
            summary={mockBotRiskSummary}
          />

          <SuspiciousAccountsTable data={mockBotAccounts} />
        </TabsContent>

        {/* Network Graph Tab */}
        <TabsContent value="network" className="space-y-6 mt-6">
          <NetworkGraph
            nodes={mockNetworkNodes}
            links={mockNetworkLinks}
            clusters={mockClusterAnalysis}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
