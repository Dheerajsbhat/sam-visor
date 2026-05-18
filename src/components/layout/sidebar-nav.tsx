import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  Bell,
  AlertOctagon,
  Sparkles,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/monitoring", label: "Monitoring", icon: Activity },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/incidents", label: "Incidents", icon: AlertOctagon },
  { to: "/copilot", label: "SAM Copilot", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function SidebarNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="h-14 flex items-center gap-2 px-5 border-b border-sidebar-border">
        <div className="size-7 rounded-md bg-gradient-to-br from-primary to-chart-4 grid place-items-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
          S
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">SAM Platform</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Operational AI</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        <div className="px-2 pb-2 pt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
          Workspace
        </div>
        {items.map((it) => {
          const active = path === it.to || (it.to !== "/" && path.startsWith(it.to));
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className={cn("size-4", active && "text-primary")} />
              <span>{it.label}</span>
              {it.to === "/alerts" && (
                <span className="ml-auto text-[10px] rounded-full bg-destructive/15 text-destructive px-1.5 py-0.5">
                  7
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <div className="rounded-lg p-3 bg-gradient-to-br from-primary/15 to-chart-4/10 border border-primary/20">
          <div className="text-xs font-medium">Pro tip</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Ask SAM Copilot "why did jobs fail today?" for an instant RCA.
          </div>
        </div>
      </div>
    </aside>
  );
}
