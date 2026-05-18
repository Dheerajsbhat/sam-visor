import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { alerts, type Severity } from "@/lib/mock-data";
import { Bell, BellOff, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/alerts")({ component: AlertsPage });

const severities: (Severity | "All")[] = ["All", "Critical", "High", "Medium", "Low"];

function AlertsPage() {
  const [sev, setSev] = useState<(typeof severities)[number]>("All");
  const filtered = alerts.filter(a => sev === "All" || a.severity === sev);
  const active = filtered.filter(a => a.status !== "Resolved");
  const history = filtered.filter(a => a.status === "Resolved");

  return (
    <AppShell>
      <div className="px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          title="Alerts"
          description="Active alerts and alert history across all monitored systems."
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-1.5"><BellOff className="size-3.5"/> Snooze all</Button>
              <Button size="sm" className="gap-1.5"><CheckCircle2 className="size-3.5"/> Acknowledge selected</Button>
            </>
          }
        />

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-4">
          {(["Critical","High","Medium","Low"] as Severity[]).map(s => {
            const n = alerts.filter(a => a.severity === s && a.status !== "Resolved").length;
            return (
              <Card key={s}>
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s}</div>
                    <StatusBadge status={s} />
                  </div>
                  <div className="mt-2 text-2xl font-semibold tabular-nums">{n}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">open alerts</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex items-center gap-1 mb-4 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Severity:</span>
          {severities.map(s => (
            <Button key={s} size="sm" variant={sev === s ? "default" : "outline"} onClick={() => setSev(s)} className="h-7 px-2.5 text-xs">
              {s}
            </Button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Bell className="size-4 text-destructive"/> Active</CardTitle>
              <CardDescription>{active.length} alerts requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {active.map(a => (
                <div key={a.id} className="rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <StatusBadge status={a.severity} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{a.title}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 flex flex-wrap gap-x-2">
                        <span>{a.id}</span>·<span>{a.source}</span>·<span>{a.time}</span>
                      </div>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                </div>
              ))}
              {active.length === 0 && (
                <div className="text-sm text-muted-foreground text-center py-8">All clear — no active alerts.</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
              <CardDescription>Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-border ml-2 space-y-4">
                {filtered.slice(0, 8).map(a => (
                  <li key={a.id} className="ml-4">
                    <div className={`absolute -left-1.5 size-3 rounded-full border-2 border-background ${
                      a.severity === "Critical" ? "bg-destructive" :
                      a.severity === "High" ? "bg-warning" :
                      a.severity === "Medium" ? "bg-info" : "bg-success"
                    }`} />
                    <div className="text-[11px] text-muted-foreground">{a.time}</div>
                    <div className="text-sm">{a.title}</div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base">History</CardTitle>
            <CardDescription>Resolved alerts</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-y border-border bg-muted/30">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Alert</th>
                  <th className="text-left font-medium px-4 py-2">Severity</th>
                  <th className="text-left font-medium px-4 py-2">Source</th>
                  <th className="text-left font-medium px-4 py-2">Resolved</th>
                </tr>
              </thead>
              <tbody>
                {history.map(a => (
                  <tr key={a.id} className="border-b border-border/60 hover:bg-muted/30">
                    <td className="px-4 py-2.5">
                      <div className="font-medium">{a.title}</div>
                      <div className="text-[11px] text-muted-foreground">{a.id}</div>
                    </td>
                    <td className="px-4 py-2.5"><StatusBadge status={a.severity}/></td>
                    <td className="px-4 py-2.5 text-muted-foreground">{a.source}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
