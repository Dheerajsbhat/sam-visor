import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary/15 via-background to-chart-4/10 grid-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.55_0.22_265/0.25),transparent_60%)]"/>
        <div className="relative z-10 p-12 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-gradient-to-br from-primary to-chart-4 grid place-items-center text-primary-foreground font-bold">S</div>
            <div className="text-sm font-semibold tracking-tight">SAM Platform</div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] text-primary mb-4">
              <Sparkles className="size-3"/> Operational AI for enterprise teams
            </div>
            <h1 className="text-4xl font-semibold tracking-tight max-w-md leading-tight">
              Operate every pipeline, alert and incident from one intelligent control plane.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-md text-sm">
              SAM correlates your jobs, logs and metrics in real time and proposes safe remediations — so on-call is calmer and recovery is faster.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">SOC 2 · ISO 27001 · HIPAA-ready</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Sign in to SAM Platform</CardTitle>
            <CardDescription>Use your work email to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="alex@acme.com"/></div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <Input type="password" placeholder="••••••••"/>
            </div>
            <Button className="w-full">Sign in</Button>
            <div className="relative text-center text-[11px] text-muted-foreground">
              <span className="bg-card px-2 relative z-10">or</span>
              <div className="absolute top-1/2 left-0 right-0 border-t border-border -z-0"/>
            </div>
            <Button variant="outline" className="w-full">Continue with SSO</Button>
            <div className="text-xs text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
