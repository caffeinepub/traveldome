import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "../data/bakuPackage";
import { useSubmitBooking } from "../hooks/useQueries";

export default function Contact() {
  const submitBooking = useSubmitBooking();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitBooking.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        travelDates: "To be confirmed",
        travelers: BigInt(1),
        message: form.message,
        packageId: "general-inquiry",
      });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try WhatsApp instead.");
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Office",
      text: "Saropi Saraswati CHS LTD, 002 Ghazala Road, Pleasant Park, Mira Road East, Mira Bhayandar, Maharashtra 401107",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone / WhatsApp",
      text: "+91 88798 09915 / +91 99229 17255",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      text: "info@traveldome.in",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Working Hours",
      text: "Mon – Sat: 9:00 AM – 7:00 PM",
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <div className="teal-gradient py-20 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-4xl md:text-5xl mb-3"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/75 text-lg max-w-xl mx-auto px-4"
        >
          Have questions about the Baku package? We'd love to help you plan your
          dream trip.
        </motion.p>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi TravelDome! I would like to know more about your tour packages.")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold border-0 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl mb-6">
                Contact Information
              </h2>

              <div className="space-y-5 mb-10">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 gold-gradient rounded-xl flex items-center justify-center shrink-0">
                      {info.icon}
                    </div>
                    <div className="pt-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-foreground text-sm font-medium">
                        {info.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick WhatsApp card */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6 text-emerald-600" />
                  <h3 className="font-display font-semibold text-emerald-900">
                    Fastest Response: WhatsApp
                  </h3>
                </div>
                <p className="text-sm text-emerald-700 mb-4">
                  Get instant replies on WhatsApp. Our team responds within
                  minutes during business hours.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi TravelDome! I would like to know more about your tour packages.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 font-semibold">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      +91 88798 09915
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/919922917255?text=${encodeURIComponent("Hi TravelDome! I would like to know more about your tour packages.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 font-semibold">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      +91 99229 17255
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card-hover">
                <h2 className="font-display font-bold text-2xl mb-6">
                  Send a Message
                </h2>

                {submitted ? (
                  <div
                    className="text-center py-10"
                    data-ocid="contact.success_state"
                  >
                    <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      We'll get back to you within 24 hours. For faster
                      response, WhatsApp us!
                    </p>
                    <Button
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="c-name"
                          className="text-sm font-medium mb-1.5 block"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="c-name"
                          data-ocid="contact.name_input"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                          placeholder="Your full name"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="c-phone"
                          className="text-sm font-medium mb-1.5 block"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="c-phone"
                          type="tel"
                          data-ocid="contact.phone_input"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="c-email"
                        className="text-sm font-medium mb-1.5 block"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="c-email"
                        type="email"
                        data-ocid="contact.email_input"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="c-msg"
                        className="text-sm font-medium mb-1.5 block"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="c-msg"
                        data-ocid="contact.message_input"
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value }))
                        }
                        required
                        rows={5}
                        placeholder="Tell us about your travel plans, preferred dates, number of travelers..."
                      />
                    </div>

                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={submitBooking.isPending}
                      className="w-full gold-gradient text-foreground font-bold border-0 hover:opacity-90"
                    >
                      {submitBooking.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
