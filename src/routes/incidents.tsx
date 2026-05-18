import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { incidents } from "@/lib/mock-data";
import { Sparkles, Lightbulb, Clock, AlertOctagon, ListChecks } from "lucide-react";

export const Route = createFileRoute("/incidents")({ component: IncidentsPage });

function IncidentsPage() {
  return (
    <AppShell>
      <div className="px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          title="Incidents"
          description="Incident details, AI-assisted root cause analysis and recommended remediations."
          actions={<Button size="sm" className="gap-1.5"><Sparkles className="size-3.5"/> Generate post-mortem</Button>}
        />

        <div className="space-y-5">
          {incidents.map(inc => (
            <Card key={inc.id} className="overflow-hidden">
              <div className="absolute" />
              <CardHeader className="border-b border-border bg-muted/20">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <AlertOctagon className="size-3.5"/> {inc.id} · started {inc.started} · owner {inc.owner}
                    </div>
                    <CardTitle className="text-lg mt-1.5">{inc.title}</CardTitle>
                    <CardDescription className="mt-1">{inc.summary}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={inc.severity}/>
                    <StatusBadge status={inc.status}/>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-3 pt-5">
                <div className="lg:col-span-2 space-y-4">
                  <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 to-chart-4/5 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
                      <Sparkles className="size-3.5"/> SAM AI · Root cause analysis
                    </div>
                    <p className="text-sm mt-2 leading-relaxed">{inc.rootCause}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      <Lightbulb className="size-3.5"/> Recommended remediations
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {inc.recommendations.map((r, i) => (
                        <div key={i} className="rounded-lg border border-border p-3 flex items-start gap-2 hover:bg-muted/30 transition-colors">
                          <ListChecks className="size-4 text-primary mt-0.5"/>
                          <div className="text-sm">{r}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    <Clock className="size-3.5"/> Timeline
                  </div>
                  <ol className="relative border-l border-border ml-2 space-y-3">
                    {inc.timeline.map((t, i) => (
                      <li key={i} className="ml-4">
                        <div className="absolute -left-1.5 size-3 rounded-full bg-primary/60 border-2 border-background" />
                        <div className="text-[11px] text-muted-foreground tabular-nums">{t.t} UTC</div>
                        <div className="text-sm">{t.e}</div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Acknowledge</Button>
                    <Button size="sm" className="flex-1">Resolve</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
