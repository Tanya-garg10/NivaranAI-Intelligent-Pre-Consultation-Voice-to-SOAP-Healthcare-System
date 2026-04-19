import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { n: "01", titleKey: "how.s1.title", bodyKey: "how.s1.body" },
    { n: "02", titleKey: "how.s2.title", bodyKey: "how.s2.body" },
    { n: "03", titleKey: "how.s3.title", bodyKey: "how.s3.body" },
    { n: "04", titleKey: "how.s4.title", bodyKey: "how.s4.body" },
    { n: "05", titleKey: "how.s5.title", bodyKey: "how.s5.body" },
  ];

  return (
    <section id="how" className="border-t border-border/60 bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-primary">{t("how.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t("how.title")}</h2>
        </div>
        <ol className="mt-14 space-y-4">
          {steps.map((s, i) => (
            <li key={s.n} className="reveal grid grid-cols-[auto_1fr] items-start gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:p-7" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="font-display text-2xl font-semibold tabular-nums text-primary sm:text-3xl">{s.n}</div>
              <div>
                <h3 className="font-display text-lg font-semibold">{t(s.titleKey)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(s.bodyKey)}</p>
              </div>
              <div className="col-span-2 hidden h-px w-full bg-gradient-to-r from-transparent via-border to-transparent sm:col-span-1 sm:block sm:h-12 sm:w-px sm:bg-gradient-to-b" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
