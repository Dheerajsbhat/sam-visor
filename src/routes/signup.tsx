import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-chart-4/15 via-background to-primary/10 grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,oklch(0.65_0.24_320/0.25),transparent_60%)]"/>
        <div className="relative z-10 p-12 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-gradient-to-br from-primary to-chart-4 grid place-items-center text-primary-foreground font-bold">S</div>
            <div className="text-sm font-semibold tracking-tight">SAM Platform</div>
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight max-w-md leading-tight">
              Bring your team onto the operational AI control plane.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-md text-sm">
              Start with a 30-day enterprise trial — connect your first 5 pipelines in under 10 minutes.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">No credit card required</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Create your workspace</CardTitle>
            <CardDescription>Spin up a SAM tenant for your organization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>First name</Label><Input placeholder="Alex"/></div>
              <div className="space-y-1.5"><Label>Last name</Label><Input placeholder="Morgan"/></div>
            </div>
            <div className="space-y-1.5"><Label>Work email</Label><Input type="email" placeholder="alex@acme.com"/></div>
            <div className="space-y-1.5"><Label>Workspace name</Label><Input placeholder="Acme Operations"/></div>
            <div className="space-y-1.5"><Label>Password</Label><Input type="password" placeholder="At least 12 characters"/></div>
            <Button className="w-full">Create workspace</Button>
            <div className="text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
