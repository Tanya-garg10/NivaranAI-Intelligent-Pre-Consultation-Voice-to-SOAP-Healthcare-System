import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-semibold tracking-tight">NivaranAI</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{t("footer.desc")}</p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold">{t("footer.product")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="/#features">{t("nav.features")}</a></li>
            <li><a className="hover:text-foreground" href="/#how">{t("nav.howItWorks")}</a></li>
            <li><a className="hover:text-foreground" href="/#security">{t("nav.security")}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold">{t("footer.account")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/login" className="hover:text-foreground">{t("footer.login")}</Link></li>
            <li><Link to="/signup/patient" className="hover:text-foreground">{t("footer.patientSignup")}</Link></li>
            <li><Link to="/signup/doctor" className="hover:text-foreground">{t("footer.doctorSignup")}</Link></li>
            <li><Link to="/signup/hospital" className="hover:text-foreground">{t("footer.registerHospital")}</Link></li>
            <li><Link to="/admin-secret" className="text-xs text-muted-foreground/60 hover:text-foreground">{t("footer.admin")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} NivaranAI. {t("footer.rights")}</p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
