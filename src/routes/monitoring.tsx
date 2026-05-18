import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { jobs, connectors, logLines, type JobStatus } from "@/lib/mock-data";
import { Search, RefreshCw, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/monitoring")({ component: Monitoring });

const statusFilters: (JobStatus | "All")[] = ["All", "Running", "Success", "Failed", "Pending"];

function Monitoring() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All");

  const filtered = useMemo(
    () => jobs.filter(j =>
      (status === "All" || j.status === status) &&
      (q === "" || (j.name + j.pipeline + j.id + j.owner).toLowerCase().includes(q.toLowerCase()))
    ),
    [q, status],
  );

  return (
    <AppShell>
      <div className="px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          title="Monitoring"
          description="Pipelines, jobs, connectors and live logs across the platform."
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-1.5"><Download className="size-3.5" /> Export</Button>
              <Button size="sm" className="gap-1.5"><RefreshCw className="size-3.5" /> Refresh</Button>
            </>
          }
        />

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-4">
          {[
            { l: "Running", v: jobs.filter(j => j.status === "Running").length, c: "text-info" },
            { l: "Succeeded · 24h", v: 13892, c: "text-success" },
            { l: "Failed · 24h", v: 184, c: "text-destructive" },
            { l: "Pending", v: jobs.filter(j => j.status === "Pending").length, c: "text-muted-foreground" },
          ].map(m => (
            <Card key={m.l}>
              <CardContent className="pt-5">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.l}</div>
                <div className={cn("mt-2 text-2xl font-semibold tabular-nums", m.c)}>{m.v.toLocaleString()}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="connectors">Connectors</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-4">
            <Card>
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search jobs, pipelines, owners…" className="pl-9 h-9" value={q} onChange={e => setQ(e.target.value)} />
                  </div>
                  <div className="flex items-center gap-1 ml-auto flex-wrap">
                    <Filter className="size-3.5 text-muted-foreground mr-1" />
                    {statusFilters.map(s => (
                      <Button key={s} size="sm" variant={status === s ? "default" : "outline"} onClick={() => setStatus(s)} className="h-7 px-2.5 text-xs">
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-muted-foreground border-y border-border bg-muted/30">
                      <tr>
                        <th className="text-left font-medium px-4 py-2">Job</th>
                        <th className="text-left font-medium px-4 py-2">Pipeline</th>
                        <th className="text-left font-medium px-4 py-2">Status</th>
                        <th className="text-left font-medium px-4 py-2">Duration</th>
                        <th className="text-left font-medium px-4 py-2">Owner</th>
                        <th className="text-left font-medium px-4 py-2">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((j) => (
                        <tr key={j.id} className="border-b border-border/60 hover:bg-muted/30">
                          <td className="px-4 py-2.5">
                            <div className="font-medium">{j.name}</div>
                            <div className="text-[11px] text-muted-foreground">{j.id}</div>
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground">{j.pipeline}</td>
                          <td className="px-4 py-2.5"><StatusBadge status={j.status} /></td>
                          <td className="px-4 py-2.5 tabular-nums text-muted-foreground">{j.duration}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{j.owner}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{j.updated}</td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">No jobs match your filters.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connectors" className="mt-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {connectors.map(c => (
                <Card key={c.name}>
                  <CardHeader className="flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-base">{c.name}</CardTitle>
                      <CardDescription>{c.type}</CardDescription>
                    </div>
                    <StatusBadge status={c.status} />
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Throughput</div>
                      <div className="font-medium tabular-nums">{c.throughput}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Lag</div>
                      <div className="font-medium tabular-nums">{c.lag}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Live logs</CardTitle>
                <CardDescription>Streaming from ingest, transform, api, warehouse, scheduler…</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border bg-background/40 font-mono text-[12px] leading-relaxed max-h-[460px] overflow-auto">
                  {logLines.concat(logLines).map((l, i) => (
                    <div key={i} className="flex gap-3 px-3 py-1.5 border-b border-border/40 hover:bg-muted/20">
                      <span className="text-muted-foreground/80 tabular-nums shrink-0">{l.t}</span>
                      <StatusBadge status={l.level} className="shrink-0" />
                      <span className="text-muted-foreground shrink-0">{l.svc}</span>
                      <span className="truncate">{l.msg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
