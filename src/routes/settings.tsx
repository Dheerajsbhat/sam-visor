import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <AppShell>
      <div className="px-6 py-6 max-w-4xl mx-auto">
        <PageHeader title="Settings" description="Workspace, notifications, AI copilot and integrations." />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workspace</CardTitle>
              <CardDescription>Tenant identity and defaults</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Workspace name</Label><Input defaultValue="Acme Operations"/></div>
              <div className="space-y-1.5"><Label>Region</Label><Input defaultValue="us-east-1"/></div>
              <div className="space-y-1.5"><Label>Default timezone</Label><Input defaultValue="UTC"/></div>
              <div className="space-y-1.5"><Label>Retention</Label><Input defaultValue="90 days"/></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>How and when SAM pages you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ["Email — Critical alerts", true],
                ["Slack #ops-alerts", true],
                ["PagerDuty — Critical & High", true],
                ["Weekly operational digest", false],
              ].map(([l, v]) => (
                <div key={l as string} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <div className="text-sm">{l as string}</div>
                  <Switch defaultChecked={v as boolean}/>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">SAM Copilot</CardTitle>
              <CardDescription>AI behavior and guardrails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Allow Copilot to propose remediations</div>
                  <div className="text-xs text-muted-foreground">Auto-suggest fixes inside incidents.</div>
                </div>
                <Switch defaultChecked/>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Require human approval for actions</div>
                  <div className="text-xs text-muted-foreground">Copilot cannot execute changes without approval.</div>
                </div>
                <Switch defaultChecked/>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Reset</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
