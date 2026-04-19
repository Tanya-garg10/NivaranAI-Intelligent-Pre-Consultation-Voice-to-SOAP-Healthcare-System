import { Mic, Sparkles, FileText, ListChecks, LayoutDashboard, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Features() {
  const { t } = useI18n();
  const features = [
    { icon: Mic, titleKey: "feat.voice.title", bodyKey: "feat.voice.body", span: "md:col-span-2" },
    { icon: Sparkles, titleKey: "feat.ai.title", bodyKey: "feat.ai.body", span: "" },
    { icon: FileText, titleKey: "feat.soap.title", bodyKey: "feat.soap.body", span: "" },
    { icon: ListChecks, titleKey: "feat.triage.title", bodyKey: "feat.triage.body", span: "" },
    { icon: LayoutDashboard, titleKey: "feat.dashboard.title", bodyKey: "feat.dashboard.body", span: "md:col-span-2" },
    { icon: MessageCircle, titleKey: "feat.whatsapp.title", bodyKey: "feat.whatsapp.body", span: "md:col-span-2" },
    { icon: Sparkles, titleKey: "feat.analytics.title", bodyKey: "feat.analytics.body", span: "" },
  ];

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-primary">{t("features.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t("features.title")}</h2>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[200px] md:grid-cols-4">
          {features.map((f, i) => (
            <article key={f.titleKey} className={`reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated ${f.span}`} style={{ transitionDelay: `${i * 40}ms` }}>
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-mineral transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{t(f.titleKey)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(f.bodyKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
