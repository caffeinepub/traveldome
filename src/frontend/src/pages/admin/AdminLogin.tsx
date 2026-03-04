import { Button } from "@/components/ui/button";
import { Loader2, LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function AdminLogin() {
  const { t } = useLanguage();
  const { login, loginStatus } = useInternetIdentity();
  const isLogging = loginStatus === "logging-in";

  return (
    <main className="pt-16 min-h-screen flex items-center justify-center bg-secondary/30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-10 shadow-card-hover w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 teal-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-bold text-2xl mb-2">
            {t("login_title")}
          </h1>
          <p className="text-muted-foreground text-sm">{t("login_subtitle")}</p>
        </div>

        <Button
          size="lg"
          className="w-full gold-gradient text-foreground font-bold border-0 hover:opacity-90"
          onClick={() => login()}
          disabled={isLogging}
        >
          {isLogging ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("loading")}
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              {t("login_btn")}
            </>
          )}
        </Button>
      </motion.div>
    </main>
  );
}
