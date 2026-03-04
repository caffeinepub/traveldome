import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Loader2, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "../../data/bakuPackage";
import { useSubmitLeadCapture } from "../../hooks/useQueries";

const POPUP_SHOWN_KEY = "traveldome_popup_shown";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const submitLead = useSubmitLeadCapture();

  useEffect(() => {
    const alreadyShown = localStorage.getItem(POPUP_SHOWN_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(POPUP_SHOWN_KEY, "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", phone: "", email: "" });
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        packageId: "general-inquiry",
      });

      setSubmitted(true);

      // Open WhatsApp with lead info
      const waMsg = encodeURIComponent(
        `New Lead: Name: ${form.name}, Phone: ${form.phone}, Email: ${form.email}`,
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        data-ocid="welcome_popup.dialog"
        className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl"
        showCloseButton={false}
      >
        {/* Hero banner */}
        <div className="relative h-36 overflow-hidden">
          <img
            src="/assets/generated/hero-bali.dim_1920x1080.jpg"
            alt="Travel"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <Globe className="w-6 h-6 text-gold mb-2" />
            <p className="text-gold text-xs font-semibold uppercase tracking-widest">
              Exclusive Deals Await
            </p>
          </div>
          {/* Custom close button */}
          <button
            type="button"
            data-ocid="welcome_popup.close_button"
            onClick={handleClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-colors"
            aria-label="Close popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-display text-xl text-foreground">
              Plan Your Dream Trip
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Get exclusive deals and personalised itineraries directly on
              WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-4 gap-3"
              >
                <div
                  data-ocid="welcome_popup.success_state"
                  className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center"
                >
                  <MessageCircle className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-base mb-1">
                    You are all set!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our travel expert will reach out to you on WhatsApp at{" "}
                    <strong>{form.phone}</strong> shortly.
                  </p>
                </div>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="w-full mt-2"
                  data-ocid="welcome_popup.close_button"
                >
                  Start Exploring
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                <div>
                  <Label
                    htmlFor="wp-name"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="wp-name"
                    data-ocid="welcome_popup.name_input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    placeholder="Your full name"
                    autoComplete="name"
                    className="h-10"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="wp-phone"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
                  >
                    WhatsApp Number
                  </Label>
                  <Input
                    id="wp-phone"
                    data-ocid="welcome_popup.phone_input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    pattern="[+0-9\s\-]+"
                    className="h-10"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="wp-email"
                    className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1 block"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="wp-email"
                    data-ocid="welcome_popup.email_input"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="h-10"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    type="submit"
                    data-ocid="welcome_popup.submit_button"
                    disabled={submitLead.isPending}
                    className="flex-1 gold-gradient text-foreground font-bold border-0 hover:opacity-90 h-11"
                  >
                    {submitLead.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Get Free Itinerary"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    className="text-muted-foreground hover:text-foreground h-11 px-3"
                  >
                    Maybe Later
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  No spam. We only send relevant travel deals and itineraries.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
