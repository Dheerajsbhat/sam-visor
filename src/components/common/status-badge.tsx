import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Running: "bg-info/15 text-info border-info/30",
  Success: "bg-success/15 text-success border-success/30",
  Failed: "bg-destructive/15 text-destructive border-destructive/30",
  Pending: "bg-muted text-muted-foreground border-border",
  Healthy: "bg-success/15 text-success border-success/30",
  Degraded: "bg-warning/15 text-warning border-warning/30",
  Active: "bg-destructive/15 text-destructive border-destructive/30",
  Acknowledged: "bg-warning/15 text-warning border-warning/30",
  Resolved: "bg-success/15 text-success border-success/30",
  Investigating: "bg-warning/15 text-warning border-warning/30",
  Mitigated: "bg-info/15 text-info border-info/30",
  Critical: "bg-destructive/20 text-destructive border-destructive/40",
  High: "bg-warning/20 text-warning border-warning/40",
  Medium: "bg-info/20 text-info border-info/40",
  Low: "bg-success/15 text-success border-success/30",
  INFO: "bg-info/10 text-info border-info/20",
  WARN: "bg-warning/10 text-warning border-warning/20",
  ERROR: "bg-destructive/10 text-destructive border-destructive/20",
  DEBUG: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        map[status] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
