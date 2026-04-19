import { Mic, Brain, LayoutDashboard, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Solution() {
  const { t } = useI18n();
  const nodes = [
    { icon: Mic, titleKey: "solution.voice.title", bodyKey: "solution.voice.body" },
    { icon: Brain, titleKey: "solution.ai.title", bodyKey: "solution.ai.body" },
    { icon: LayoutDashboard, titleKey: "solution.dash.title", bodyKey: "solution.dash.body" },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-primary">{t("solution.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t("solution.title")}</h2>
        </div>
        <div className="reveal mt-14 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {nodes.map((n, idx) => (
            <div key={n.titleKey} className="contents">
              <div className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-mineral text-primary-foreground shadow-glow">
                  <n.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{t(n.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(n.bodyKey)}</p>
              </div>
              {idx < nodes.length - 1 && (
                <div className="hidden items-center justify-center md:flex">
                  <div className="relative h-px w-12 bg-border">
                    <ArrowRight className="absolute -right-1 -top-2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
