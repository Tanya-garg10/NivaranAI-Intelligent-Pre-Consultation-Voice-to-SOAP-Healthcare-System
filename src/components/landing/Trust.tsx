import { ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Trust() {
  const { t } = useI18n();
  const items = [
    { icon: Lock, titleKey: "trust.enc.title", bodyKey: "trust.enc.body" },
    { icon: BadgeCheck, titleKey: "trust.verified.title", bodyKey: "trust.verified.body" },
    { icon: ShieldCheck, titleKey: "trust.secure.title", bodyKey: "trust.secure.body" },
  ];

  return (
    <section id="security" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-primary">{t("trust.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t("trust.title")}</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.titleKey} className="reveal rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-success/15 text-success">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{t(item.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(item.bodyKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
