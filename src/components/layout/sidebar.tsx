"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { sidebarNavigation } from "@/lib/constants/navigation";
import { useUIStore } from "@/stores/ui-store";
import { useProjectStore } from "@/stores/project-store";
import { useMediaQuery } from "@/hooks/use-media-query";

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const topicId = useProjectStore((state) => state.topicId);

  return (
    <ScrollArea className="h-full py-4">
      <div className="space-y-6 px-3">
        {sidebarNavigation.map((section) => (
          <div key={section.title}>
            {/* Section Title */}
            {!collapsed && (
              <h4 className="mb-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">{section.title}</h4>
            )}

            {/* Navigation Items */}
            <nav className="space-y-1">
              {section.items.map((item) => {
                const href = `/${topicId}${item.href}`;
                const isActive = pathname === href || pathname.startsWith(href + "/");
                const Icon = item.icon;

                const linkContent = (
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );

                if (collapsed) {
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  );
                }

                return <div key={item.href}>{linkContent}</div>;
              })}
            </nav>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Mobile: Use Sheet
  if (!isDesktop) {
    return (
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Fixed sidebar
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-white dark:bg-slate-900 transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent collapsed={sidebarCollapsed} />

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white dark:bg-slate-800 shadow-sm"
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </aside>
    </TooltipProvider>
  );
}
