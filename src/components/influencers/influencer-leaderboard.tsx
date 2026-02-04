"use client";

import { useState, Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ExternalLink,
  BadgeCheck,
  Newspaper,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Influencer, InfluencerType } from "@/mocks/data/influencers";

interface InfluencerLeaderboardProps {
  data: Influencer[];
}

const typeIcons: Record<InfluencerType, React.ReactNode> = {
  verified: <BadgeCheck className="h-4 w-4 text-blue-500" />,
  media: <Newspaper className="h-4 w-4 text-purple-500" />,
  kol: <Users className="h-4 w-4 text-orange-500" />,
  organic: <User className="h-4 w-4 text-green-500" />,
};

const typeLabels: Record<InfluencerType, string> = {
  verified: "Verified",
  media: "Media",
  kol: "KOL",
  organic: "Organic",
};

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function InfluencerLeaderboard({ data }: InfluencerLeaderboardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Influencer Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Followers</TableHead>
              <TableHead className="text-right">Mentions</TableHead>
              <TableHead className="w-32">Impact</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((influencer, index) => (
              <Fragment key={influencer.id}>
                <TableRow className="group">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={influencer.avatarUrl} />
                        <AvatarFallback>
                          {influencer.username.slice(1, 3).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">
                            {influencer.username}
                          </span>
                          {influencer.isVerified && (
                            <BadgeCheck className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {typeIcons[influencer.type]}
                          <span>{typeLabels[influencer.type]}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(influencer.followers)}
                  </TableCell>
                  <TableCell className="text-right">
                    {influencer.mentions}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={influencer.impactScore}
                        className="h-2 flex-1"
                      />
                      <span className="text-sm font-medium w-8">
                        {influencer.impactScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => toggleExpand(influencer.id)}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedId === influencer.id && "rotate-180"
                        )}
                      />
                    </Button>
                  </TableCell>
                </TableRow>

                {expandedId === influencer.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/50">
                      <div className="py-3 space-y-4">
                        {/* Sentiment breakdown */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Sentiment Distribution
                          </h4>
                          <div className="flex h-4 rounded-full overflow-hidden max-w-md">
                            <div
                              className="bg-green-500"
                              style={{
                                width: `${influencer.sentiment.positive}%`,
                              }}
                            />
                            <div
                              className="bg-gray-400"
                              style={{
                                width: `${influencer.sentiment.neutral}%`,
                              }}
                            />
                            <div
                              className="bg-red-500"
                              style={{
                                width: `${influencer.sentiment.negative}%`,
                              }}
                            />
                          </div>
                          <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                            <span>
                              Positive: {influencer.sentiment.positive}%
                            </span>
                            <span>
                              Neutral: {influencer.sentiment.neutral}%
                            </span>
                            <span>
                              Negative: {influencer.sentiment.negative}%
                            </span>
                          </div>
                        </div>

                        {/* Recent posts */}
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Recent Mentions
                          </h4>
                          {influencer.recentPosts.map((post, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-background rounded-lg border mb-2"
                            >
                              <p className="text-sm">{post.content}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                <Badge
                                  variant={
                                    post.sentiment === "positive"
                                      ? "default"
                                      : post.sentiment === "negative"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {post.sentiment}
                                </Badge>
                                <span>
                                  {formatNumber(post.engagement)} engagements
                                </span>
                                <span>{post.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
