"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function CreateProjectCard() {
  const router = useRouter();

  return (
    <Card
      className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-colors group"
      onClick={() => router.push("/portal/create")}
    >
      <CardContent className="flex flex-col items-center justify-center h-full min-h-[240px] text-slate-400 group-hover:text-blue-500 transition-colors">
        <div className="h-12 w-12 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-4">
          <Plus className="h-6 w-6" />
        </div>
        <p className="font-medium">Create New Project</p>
      </CardContent>
    </Card>
  );
}
