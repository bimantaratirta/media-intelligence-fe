"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Copy, MoreHorizontal, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GeneratedReport } from "@/mocks/data/reports";

interface RecentReportsTableProps {
  reports: GeneratedReport[];
  onDownload: (reportId: string) => void;
  onCopyLink: (reportId: string) => void;
}

const typeLabels: Record<string, string> = {
  executive: "Executive",
  full: "Full",
  sentiment: "Sentiment",
  competitor: "Competitor",
  crisis: "Crisis",
  custom: "Custom",
};

const statusStyles: Record<string, string> = {
  completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  generating: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  scheduled: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
};

export function RecentReportsTable({
  reports,
  onDownload,
  onCopyLink,
}: RecentReportsTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead className="hidden sm:table-cell">Date Range</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Generated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.format.toUpperCase()}
                        {report.fileSize && ` • ${report.fileSize}`}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm hidden sm:table-cell">
                  {formatDate(report.dateRange.start)} -{" "}
                  {formatDate(report.dateRange.end)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{typeLabels[report.type]}</Badge>
                </TableCell>
                <TableCell className="text-sm hidden md:table-cell">
                  <div>
                    <p>{formatDate(report.generatedAt)}</p>
                    <p className="text-xs text-muted-foreground">
                      by {report.generatedBy}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusStyles[report.status])}>
                    {report.status === "generating" && (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    )}
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {report.status === "completed" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDownload(report.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onCopyLink(report.id)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
