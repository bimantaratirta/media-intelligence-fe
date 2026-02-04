"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  ArrowUpDown,
  Image,
  Video,
  FileText,
  Link,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentItem, ContentType, Platform } from "@/mocks/data/content";

interface ContentTableProps {
  data: ContentItem[];
}

const typeIcons: Record<ContentType, React.ReactNode> = {
  image: <Image className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  text: <FileText className="h-4 w-4" />,
  link: <Link className="h-4 w-4" />,
  carousel: <Image className="h-4 w-4" />,
};

const platformEmojis: Record<Platform, string> = {
  twitter: "X",
  instagram: "IG",
  tiktok: "TT",
  facebook: "FB",
  youtube: "YT",
};

const platformLabels: Record<Platform, string> = {
  twitter: "X/Twitter",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  youtube: "YouTube",
};

const sentimentColors = {
  positive: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  negative: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function ContentTable({ data }: ContentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");

  const columns: ColumnDef<ContentItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 max-w-md">
          <div className="p-2 bg-muted rounded">
            {typeIcons[row.original.type]}
          </div>
          <div className="min-w-0">
            <p className="text-sm truncate">{row.original.content}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(row.original.publishedAt).toLocaleDateString("id-ID")}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "platform",
      header: "Platform",
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <Badge variant="outline" className="text-xs">
            {platformEmojis[row.original.platform]}
          </Badge>
          <span className="text-sm">{platformLabels[row.original.platform]}</span>
        </span>
      ),
      filterFn: (row, id, value) => {
        if (value === "all") return true;
        return row.getValue(id) === value;
      },
    },
    {
      accessorKey: "metrics.engagementRate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="gap-1"
        >
          Engagement
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.metrics.engagementRate.toFixed(1)}%
        </span>
      ),
    },
    {
      accessorKey: "metrics.reach",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="gap-1"
        >
          Reach
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => formatNumber(row.original.metrics.reach),
    },
    {
      accessorKey: "sentiment",
      header: "Sentiment",
      cell: ({ row }) => (
        <Badge
          className={cn("capitalize", sentimentColors[row.original.sentiment])}
        >
          {row.original.sentiment}
        </Badge>
      ),
      filterFn: (row, id, value) => {
        if (value === "all") return true;
        return row.getValue(id) === value;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" asChild>
          <a href={row.original.originalUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      ),
    },
  ];

  const filteredData = data.filter((item) => {
    if (platformFilter !== "all" && item.platform !== platformFilter)
      return false;
    if (sentimentFilter !== "all" && item.sentiment !== sentimentFilter)
      return false;
    return true;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Content Performance</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <Input
            placeholder="Search content..."
            value={
              (table.getColumn("content")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("content")?.setFilterValue(e.target.value)
            }
            className="max-w-xs"
          />
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">X/Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiment</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * 10 + 1}-
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * 10,
              filteredData.length
            )}{" "}
            of {filteredData.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
