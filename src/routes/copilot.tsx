import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { suggestedPrompts, copilotHistory } from "@/lib/mock-data";
import { Sparkles, Send, Plus, MessageSquare, Lightbulb, TrendingUp, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/copilot")({ component: Copilot });

type Msg = { role: "user" | "ai"; content: string; cards?: { title: string; desc: string }[] };

const seedMessages: Msg[] = [
  { role: "user", content: "Why did connector jobs fail today?" },
  {
    role: "ai",
    content:
      "I analyzed 14,392 jobs from the last 24h. Failures concentrate in 2 connectors and 1 pipeline:",
    cards: [
      { title: "Stripe webhook receiver", desc: "118 failures · 5xx from upstream. See INC-4421." },
      { title: "Auth OIDC refresh (acme)", desc: "32 failures · expired client secret, rotated 08:51." },
      { title: "Warehouse cluster wh-prod-1", desc: "9 slow vacuums · storage pressure resolved at 11:38." },
    ],
  },
];

function Typing() {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
      <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.2s]" />
      <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.1s]" />
      <span className="size-1.5 rounded-full bg-current animate-bounce" />
      <span className="ml-1">SAM is thinking…</span>
    </div>
  );
}

function Copilot() {
  const [messages, setMessages] = useState<Msg[]>(seedMessages);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages(m => [...m, { role: "user", content: t }]);
    setInput("");
    setPending(true);
    setTimeout(() => {
      setMessages(m => [
        ...m,
        {
          role: "ai",
          content: `Here's what I found for "${t}". Based on current telemetry, the most relevant operational signals are:`,
          cards: [
            { title: "Top correlated alert", desc: "ALR-9821 · Stripe webhook error rate above 5%." },
            { title: "Impacted pipelines", desc: "Finance, Billing reconciliation, Invoice sync." },
            { title: "Suggested next step", desc: "Failover Stripe webhook receiver to us-west-2." },
          ],
        },
      ]);
      setPending(false);
    }, 900);
  };

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* History sidebar */}
        <aside className="hidden xl:flex flex-col w-64 border-r border-border bg-card/40">
          <div className="p-3 border-b border-border">
            <Button className="w-full gap-1.5" size="sm"><Plus className="size-3.5"/> New conversation</Button>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-0.5">
            <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Recent</div>
            {copilotHistory.map(c => (
              <button key={c.id} className="w-full text-left rounded-md px-2.5 py-2 hover:bg-muted/60 transition-colors">
                <div className="text-sm truncate flex items-center gap-2">
                  <MessageSquare className="size-3.5 text-muted-foreground shrink-0"/>{c.title}
                </div>
                <div className="text-[10px] text-muted-foreground ml-5.5">{c.time}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-b border-border px-6 py-3 flex items-center gap-3 bg-card/30">
            <div className="size-8 rounded-md bg-gradient-to-br from-primary to-chart-4 grid place-items-center text-primary-foreground">
              <Sparkles className="size-4"/>
            </div>
            <div>
              <div className="text-sm font-semibold">SAM Copilot</div>
              <div className="text-[11px] text-muted-foreground">Operational AI · grounded on your live telemetry</div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success animate-pulse" /> connected
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
              {messages.map((m, i) => (
                <Message key={i} m={m} />
              ))}
              {pending && (
                <div className="flex gap-3">
                  <div className="size-7 rounded-md bg-primary/15 text-primary grid place-items-center"><Sparkles className="size-3.5"/></div>
                  <div className="pt-1"><Typing /></div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Sticky input */}
          <div className="border-t border-border bg-background/80 backdrop-blur p-4">
            <div className="max-w-3xl mx-auto">
              {messages.length <= 2 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {suggestedPrompts.map(p => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="text-xs rounded-full border border-border bg-card hover:bg-muted/60 px-3 py-1.5 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
              <Card className="p-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-end gap-2 p-2">
                    <Textarea
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                      }}
                      placeholder="Ask SAM about pipelines, incidents, alerts, costs…"
                      className="min-h-[44px] max-h-40 resize-none border-0 focus-visible:ring-0 bg-transparent shadow-none p-2"
                    />
                    <Button size="icon" onClick={() => send(input)} disabled={!input.trim()}>
                      <Send className="size-4"/>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="text-[10px] text-muted-foreground mt-2 text-center">
                Responses are AI-generated from your operational telemetry. Verify before acting on production systems.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Message({ m }: { m: Msg }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 max-w-[80%] text-sm shadow-sm">
          {m.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="size-7 rounded-md bg-primary/15 text-primary grid place-items-center shrink-0">
        <Sparkles className="size-3.5"/>
      </div>
      <div className="flex-1 space-y-3">
        <div className="text-sm leading-relaxed">{m.content}</div>
        {m.cards && (
          <div className="grid gap-2 sm:grid-cols-3">
            {m.cards.map((c, i) => {
              const Icon = [Lightbulb, TrendingUp, ShieldAlert][i % 3];
              return (
                <div key={i} className={cn("rounded-lg border border-border bg-card/60 p-3")}>
                  <div className="flex items-center gap-2 text-xs text-primary mb-1">
                    <Icon className="size-3.5"/> Insight
                  </div>
                  <div className="text-sm font-medium leading-tight">{c.title}</div>
                  <div className="text-[12px] text-muted-foreground mt-1">{c.desc}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
