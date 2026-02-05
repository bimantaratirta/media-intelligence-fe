"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart3, Bell, ChevronDown, Home, LogOut, Menu, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useAuthStore } from "@/stores/auth-store";
import { useProjectStore } from "@/stores/project-store";
import { useUIStore } from "@/stores/ui-store";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { topicName } = useProjectStore();
  const { setMobileMenuOpen } = useUIStore();

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    // Remove topicId from paths
    const relevantPaths = paths.slice(1);

    return relevantPaths.map((path, index) => {
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        label,
        isLast: index === relevantPaths.length - 1,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white dark:bg-slate-900">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left: Logo & Breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/portal/projects" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg hidden md:inline-block">Asha</span>
          </Link>

          {/* Project Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 hidden sm:flex">
                <span className="max-w-[150px] truncate">{topicName || "Select Project"}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/portal/projects")}>
                <Home className="mr-2 h-4 w-4" />
                All Projects
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Breadcrumbs */}
          <nav className="hidden lg:flex items-center text-sm text-slate-500">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                <span className="mx-2">/</span>
                <span className={crumb.isLast ? "text-slate-900 dark:text-white font-medium" : ""}>{crumb.label}</span>
              </span>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block max-w-[100px] truncate">{user?.name || "User"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
