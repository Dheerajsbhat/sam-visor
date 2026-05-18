import { Bell, Moon, Search, Sun, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Topbar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="h-14 border-b border-border bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-card/40 px-4 flex items-center gap-3 sticky top-0 z-30">
      <div className="relative w-full max-w-md">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search jobs, incidents, alerts, pipelines…"
          className="pl-9 h-9 bg-background/60"
        />
        <kbd className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 h-5 items-center gap-1 rounded border border-border bg-muted/40 px-1.5 text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <div className="hidden md:flex items-center gap-2 px-2 mr-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success animate-pulse" />
          All systems nominal
        </div>
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" />
        </Button>
        <div className="ml-2 flex items-center gap-2 pl-2 border-l border-border pr-1">
          <Avatar className="size-7">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">
              AM
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block leading-tight">
            <div className="text-xs font-medium">Alex Morgan</div>
            <div className="text-[10px] text-muted-foreground">acme · admin</div>
          </div>
          <ChevronDown className="size-3 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
