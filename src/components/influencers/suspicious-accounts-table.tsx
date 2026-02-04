"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Download, AlertTriangle } from "lucide-react";
import type { BotAccount } from "@/mocks/data/influencers";

interface SuspiciousAccountsTableProps {
  data: BotAccount[];
}

function getBotScoreBadge(score: number) {
  if (score >= 0.8) {
    return <Badge variant="destructive">🔴 {score.toFixed(2)}</Badge>;
  }
  if (score >= 0.6) {
    return (
      <Badge className="bg-orange-500 hover:bg-orange-600">
        🟠 {score.toFixed(2)}
      </Badge>
    );
  }
  return <Badge variant="secondary">🟡 {score.toFixed(2)}</Badge>;
}

export function SuspiciousAccountsTable({ data }: SuspiciousAccountsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Suspicious Accounts</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Bot Score</TableHead>
              <TableHead>Signals</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((account) => (
              <TableRow key={account.id}>
                <TableCell>
                  <div>
                    <span className="font-medium">{account.username}</span>
                    <p className="text-xs text-muted-foreground">
                      {account.accountAge} days old • {account.postingFrequency}{" "}
                      posts/day
                    </p>
                  </div>
                </TableCell>
                <TableCell>{getBotScoreBadge(account.botScore)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {account.signals.slice(0, 2).map((signal, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {signal}
                      </Badge>
                    ))}
                    {account.signals.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{account.signals.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Detection Criteria */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="flex items-center gap-2 font-medium text-sm mb-2">
            <AlertTriangle className="h-4 w-4" />
            Bot Detection Criteria
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Account age vs activity volume analysis</li>
            <li>• Profile completeness (bio, avatar, etc)</li>
            <li>• Posting pattern (timing, frequency)</li>
            <li>• Content similarity across posts</li>
            <li>• Follower/following ratio anomalies</li>
            <li>• Network clustering patterns</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
