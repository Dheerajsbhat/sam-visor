export type JobStatus = "Running" | "Success" | "Failed" | "Pending";

export const kpis = [
  { label: "Active Pipelines", value: "248", delta: "+12%", trend: "up" as const },
  { label: "Jobs Today", value: "14,392", delta: "+4.8%", trend: "up" as const },
  { label: "Success Rate", value: "98.6%", delta: "+0.4%", trend: "up" as const },
  { label: "Open Incidents", value: "7", delta: "-2", trend: "down" as const },
];

export const jobsTimeseries = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  success: 400 + Math.round(Math.sin(i / 3) * 80 + Math.random() * 60),
  failed: Math.max(2, Math.round(20 + Math.cos(i / 2) * 8 + Math.random() * 10)),
  pending: Math.max(0, Math.round(10 + Math.random() * 12)),
}));

export const alertsByDay = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  critical: Math.round(Math.random() * 4),
  high: Math.round(Math.random() * 8 + 2),
  medium: Math.round(Math.random() * 12 + 4),
  low: Math.round(Math.random() * 18 + 6),
}));

export const severityDistribution = [
  { name: "Critical", value: 6, color: "var(--destructive)" },
  { name: "High", value: 14, color: "var(--warning)" },
  { name: "Medium", value: 28, color: "var(--info)" },
  { name: "Low", value: 52, color: "var(--success)" },
];

export const systemHealth = [
  { name: "Ingestion", uptime: 99.98, status: "Healthy" },
  { name: "Transform", uptime: 99.71, status: "Healthy" },
  { name: "Warehouse", uptime: 99.42, status: "Degraded" },
  { name: "API Gateway", uptime: 100, status: "Healthy" },
  { name: "Auth Service", uptime: 99.89, status: "Healthy" },
];

export const jobs: { id: string; name: string; pipeline: string; status: JobStatus; duration: string; updated: string; owner: string }[] = [
  { id: "JOB-10421", name: "salesforce_accounts_sync", pipeline: "CRM Ingest", status: "Success", duration: "2m 12s", updated: "2m ago", owner: "data-platform" },
  { id: "JOB-10422", name: "snowflake_dim_load", pipeline: "Warehouse", status: "Running", duration: "1m 04s", updated: "now", owner: "data-platform" },
  { id: "JOB-10423", name: "stripe_invoices_etl", pipeline: "Finance", status: "Failed", duration: "0m 48s", updated: "6m ago", owner: "finance-eng" },
  { id: "JOB-10424", name: "kafka_events_compact", pipeline: "Streaming", status: "Success", duration: "12m 09s", updated: "10m ago", owner: "platform" },
  { id: "JOB-10425", name: "ml_feature_refresh", pipeline: "ML Ops", status: "Pending", duration: "—", updated: "—", owner: "ml-team" },
  { id: "JOB-10426", name: "hubspot_contacts_sync", pipeline: "CRM Ingest", status: "Success", duration: "3m 41s", updated: "14m ago", owner: "growth" },
  { id: "JOB-10427", name: "billing_anomaly_scan", pipeline: "Finance", status: "Running", duration: "0m 22s", updated: "now", owner: "finance-eng" },
  { id: "JOB-10428", name: "audit_log_archive", pipeline: "Security", status: "Failed", duration: "1m 30s", updated: "32m ago", owner: "secops" },
  { id: "JOB-10429", name: "warehouse_vacuum", pipeline: "Warehouse", status: "Success", duration: "22m 11s", updated: "1h ago", owner: "data-platform" },
  { id: "JOB-10430", name: "search_index_rebuild", pipeline: "Search", status: "Success", duration: "8m 02s", updated: "2h ago", owner: "platform" },
];

export const connectors = [
  { name: "Salesforce", type: "SaaS", status: "Healthy", throughput: "12.4 MB/s", lag: "0s" },
  { name: "Snowflake", type: "Warehouse", status: "Healthy", throughput: "84.1 MB/s", lag: "1s" },
  { name: "Stripe", type: "Finance", status: "Degraded", throughput: "2.1 MB/s", lag: "42s" },
  { name: "Kafka", type: "Streaming", status: "Healthy", throughput: "210 MB/s", lag: "0s" },
  { name: "Postgres-prod", type: "Database", status: "Healthy", throughput: "28.7 MB/s", lag: "0s" },
  { name: "S3 raw-events", type: "Storage", status: "Healthy", throughput: "—", lag: "—" },
];

export const logLines = [
  { t: "12:42:18.221", level: "INFO", svc: "ingest", msg: "Batch 8821 committed (12,402 rows)" },
  { t: "12:42:19.014", level: "WARN", svc: "transform", msg: "Slow query detected on dim_customer (1.8s)" },
  { t: "12:42:19.402", level: "INFO", svc: "ingest", msg: "Connector salesforce: 2,140 events" },
  { t: "12:42:20.118", level: "ERROR", svc: "billing", msg: "Stripe webhook 502 — retry scheduled" },
  { t: "12:42:21.001", level: "INFO", svc: "api", msg: "GET /v1/health 200 (4ms)" },
  { t: "12:42:21.554", level: "INFO", svc: "warehouse", msg: "MERGE dim_account complete (0.42s)" },
  { t: "12:42:22.013", level: "DEBUG", svc: "scheduler", msg: "Tick: 14 jobs queued, 6 running" },
  { t: "12:42:22.610", level: "WARN", svc: "warehouse", msg: "Storage 78% used on cluster wh-prod-1" },
  { t: "12:42:23.220", level: "INFO", svc: "ml", msg: "Feature snapshot v2026.05.18-1 ready" },
  { t: "12:42:23.901", level: "ERROR", svc: "auth", msg: "OIDC refresh failed for tenant acme (timeout)" },
  { t: "12:42:24.402", level: "INFO", svc: "api", msg: "POST /v1/jobs/retry 202" },
  { t: "12:42:24.998", level: "INFO", svc: "ingest", msg: "Connector hubspot: 812 events" },
];

export type Severity = "Critical" | "High" | "Medium" | "Low";
export const alerts: { id: string; title: string; severity: Severity; source: string; time: string; status: "Active" | "Acknowledged" | "Resolved" }[] = [
  { id: "ALR-9821", title: "Stripe webhook error rate above 5%", severity: "Critical", source: "billing", time: "3m ago", status: "Active" },
  { id: "ALR-9820", title: "Warehouse cluster storage > 75%", severity: "High", source: "warehouse", time: "12m ago", status: "Active" },
  { id: "ALR-9819", title: "Job ml_feature_refresh delayed", severity: "Medium", source: "ml-ops", time: "28m ago", status: "Acknowledged" },
  { id: "ALR-9818", title: "API latency p95 above 800ms", severity: "High", source: "api-gateway", time: "44m ago", status: "Active" },
  { id: "ALR-9817", title: "Auth OIDC refresh failing (acme)", severity: "Critical", source: "auth", time: "1h ago", status: "Active" },
  { id: "ALR-9816", title: "Kafka consumer lag spike topic:events", severity: "Medium", source: "streaming", time: "2h ago", status: "Resolved" },
  { id: "ALR-9815", title: "Nightly vacuum took 22m (baseline 12m)", severity: "Low", source: "warehouse", time: "5h ago", status: "Resolved" },
  { id: "ALR-9814", title: "Search index rebuild slower than baseline", severity: "Low", source: "search", time: "7h ago", status: "Resolved" },
];

export const incidents = [
  {
    id: "INC-4421",
    title: "Billing pipeline degraded — Stripe webhooks failing",
    status: "Investigating",
    severity: "Critical" as Severity,
    started: "12:18 UTC",
    owner: "finance-eng",
    summary:
      "Elevated 5xx responses from Stripe webhook receiver. Retry queue depth growing. Customer invoice events delayed by ~6 minutes.",
    rootCause:
      "Upstream Stripe API region us-east-1 returning intermittent 502s. Our receiver is not failing over to the secondary region.",
    recommendations: [
      "Enable failover to webhook receiver in us-west-2",
      "Increase retry backoff ceiling to 5m for 5xx",
      "Add circuit breaker on /stripe/webhook to shed load",
    ],
    timeline: [
      { t: "12:18", e: "Alert ALR-9821 triggered" },
      { t: "12:21", e: "Pager dispatched to finance-eng on-call" },
      { t: "12:24", e: "SAM Copilot correlated with Stripe status page" },
      { t: "12:31", e: "Manual replay of 412 webhook events started" },
    ],
  },
  {
    id: "INC-4420",
    title: "Warehouse cluster wh-prod-1 storage pressure",
    status: "Mitigated",
    severity: "High" as Severity,
    started: "11:02 UTC",
    owner: "data-platform",
    summary: "Cluster storage crossed 75% — automated vacuum triggered, reclaimed 1.4TB.",
    rootCause: "Retention policy on raw_events table not applied after last migration.",
    recommendations: [
      "Re-apply retention policy on raw_events (90d)",
      "Add storage forecast widget to Monitoring dashboard",
    ],
    timeline: [
      { t: "11:02", e: "Threshold breached" },
      { t: "11:05", e: "Auto-vacuum job scheduled" },
      { t: "11:38", e: "Storage back to 61%" },
    ],
  },
  {
    id: "INC-4419",
    title: "Auth OIDC refresh failures for tenant acme",
    status: "Resolved",
    severity: "Medium" as Severity,
    started: "08:44 UTC",
    owner: "platform",
    summary: "Tenant acme experienced login refresh failures for ~12 minutes.",
    rootCause: "Expired client secret in tenant config.",
    recommendations: [
      "Rotate secrets via secret-manager workflow",
      "Add 14-day expiry warning to Settings → Tenants",
    ],
    timeline: [
      { t: "08:44", e: "Spike in 401s" },
      { t: "08:51", e: "Secret rotated" },
      { t: "08:56", e: "Recovery confirmed" },
    ],
  },
];

export const suggestedPrompts = [
  "Why did connector jobs fail today?",
  "Summarize active incidents",
  "Show high severity alerts",
  "Recommend remediation steps for INC-4421",
];

export const copilotHistory = [
  { id: "c1", title: "Stripe webhook degradation", time: "Today" },
  { id: "c2", title: "Warehouse storage forecast", time: "Today" },
  { id: "c3", title: "Top 5 failing pipelines this week", time: "Yesterday" },
  { id: "c4", title: "Cost anomaly — Snowflake compute", time: "2d ago" },
  { id: "c5", title: "Onboarding new tenant checklist", time: "1w ago" },
];
