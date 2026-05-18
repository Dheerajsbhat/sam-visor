import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/status-badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  CircleCheck,
  CircleAlert,
  Sparkles,
} from "lucide-react";
import { jobs, jobsTimeseries, alertsByDay, severityDistribution, systemHealth, kpis, incidents } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function KpiCard({ k }: { k: (typeof kpis)[number] }) {
  const up = k.trend === "up";
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <CardContent className="pt-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-2xl font-semibold tracking-tight">{k.value}</div>
          <span
            className={`text-xs inline-flex items-center gap-0.5 ${up ? "text-success" : "text-destructive"}`}
          >
            {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {k.delta}
          </span>
        </div>
        <div className="mt-3 h-8 grid-bg rounded-md opacity-60" />
      </CardContent>
    </Card>
  );
}

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--popover-foreground)",
};

function Dashboard() {
  return (
    <AppShell>
      <div className="px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          title="Operational Overview"
          description="Real-time health of pipelines, jobs, alerts and incidents across your tenants."
          actions={
            <>
              <Button variant="outline" size="sm">Last 24h</Button>
              <Button size="sm" className="gap-1.5">
                <Sparkles className="size-3.5" /> Ask SAM
              </Button>
            </>
          }
        />

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <KpiCard key={k.label} k={k} />
          ))}
        </div>

        <div className="grid gap-4 mt-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Job throughput · 24h</CardTitle>
                <CardDescription>Success, failed and pending jobs per hour</CardDescription>
              </div>
              <div className="flex gap-1">
                <Badge variant="secondary">Live</Badge>
              </div>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={jobsTimeseries} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gFailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="success" stroke="var(--chart-2)" fill="url(#gSuccess)" strokeWidth={2} />
                  <Area type="monotone" dataKey="failed" stroke="var(--destructive)" fill="url(#gFailed)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Alert severity mix</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="var(--background)"
                  >
                    {severityDistribution.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 mt-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Alerts by day</CardTitle>
              <CardDescription>Stacked by severity, last 14 days</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertsByDay} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)" }} />
                  <Bar dataKey="critical" stackId="a" fill="var(--destructive)" radius={[2,2,0,0]} />
                  <Bar dataKey="high" stackId="a" fill="var(--warning)" />
                  <Bar dataKey="medium" stackId="a" fill="var(--info)" />
                  <Bar dataKey="low" stackId="a" fill="var(--success)" radius={[0,0,2,2]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">System health</CardTitle>
              <CardDescription>Uptime — last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemHealth.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{s.name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{s.uptime}%</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full ${s.status === "Healthy" ? "bg-success" : "bg-warning"}`}
                        style={{ width: `${s.uptime}%` }}
                      />
                    </div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 mt-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Recent jobs</CardTitle>
                <CardDescription>Most recent activity across pipelines</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
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
                      <th className="text-left font-medium px-4 py-2">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 6).map((j) => (
                      <tr key={j.id} className="border-b border-border/60 hover:bg-muted/30">
                        <td className="px-4 py-2">
                          <div className="font-medium">{j.name}</div>
                          <div className="text-[11px] text-muted-foreground">{j.id}</div>
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{j.pipeline}</td>
                        <td className="px-4 py-2"><StatusBadge status={j.status} /></td>
                        <td className="px-4 py-2 tabular-nums text-muted-foreground">{j.duration}</td>
                        <td className="px-4 py-2 text-muted-foreground">{j.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CircleAlert className="size-4 text-destructive" /> Active incidents
              </CardTitle>
              <CardDescription>{incidents.filter(i => i.status !== "Resolved").length} open</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {incidents.slice(0,3).map((i) => (
                <div key={i.id} className="rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-medium leading-tight">{i.title}</div>
                    <StatusBadge status={i.severity} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{i.id}</span>·<span>{i.owner}</span>·
                    <span className="inline-flex items-center gap-1"><Activity className="size-3" />{i.status}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full gap-1.5">
                <CircleCheck className="size-3.5" /> View all incidents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
