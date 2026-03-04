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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  BedDouble,
  Calendar,
  Car,
  CheckCircle,
  Download,
  Droplets,
  FileText,
  Hotel,
  Info,
  Loader2,
  Map as MapIcon,
  MessageCircle,
  Plane,
  Star,
  Ticket,
  Users,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BAKU_PACKAGE_SLUG,
  WHATSAPP_NUMBER,
  bakuPackage,
} from "../data/bakuPackage";
import { BALI_PACKAGE_SLUG, baliPackage } from "../data/baliPackage";
import { DUBAI_PACKAGE_SLUG, dubaiPackage } from "../data/dubaiPackage";
import { KASHMIR_PACKAGE_SLUG, kashmirPackage } from "../data/kashmirPackage";
import { SIKKIM_PACKAGE_SLUG, sikkimPackage } from "../data/sikkimPackage";
import { useSubmitBooking, useSubmitLeadCapture } from "../hooks/useQueries";

// ─── Package registry ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PackageData = any;

const packages: Record<string, PackageData> = {
  [BAKU_PACKAGE_SLUG]: bakuPackage,
  [BALI_PACKAGE_SLUG]: baliPackage,
  [DUBAI_PACKAGE_SLUG]: dubaiPackage,
  [KASHMIR_PACKAGE_SLUG]: kashmirPackage,
  [SIKKIM_PACKAGE_SLUG]: sikkimPackage,
};

// ─── Icon maps ─────────────────────────────────────────────────────────────────
const inclusionIconMap: Record<string, React.ReactNode> = {
  BedDouble: <BedDouble className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Ticket: <Ticket className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Map: <MapIcon className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  Hotel: <Hotel className="w-5 h-5" />,
};

// ─── Print itinerary ───────────────────────────────────────────────────────────
function printItinerary(guestName: string, pkg: PackageData) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const datesSection =
    pkg.departureDates.length > 0
      ? `<div class="section">
    <div class="section-title">Group Departure Dates 2025</div>
    <div class="dates-grid">
      ${pkg.departureDates
        .flatMap((g: { month: string; dates: number[] }) =>
          g.dates.map(
            (d: number) => `<span class="date-chip">${g.month} ${d}</span>`,
          ),
        )
        .join("")}
    </div>
  </div>`
      : `<div class="section">
    <div class="section-title">Travel Dates</div>
    <p style="font-size:13px;color:#555;">Flexible dates — On request. Please contact us for availability.</p>
  </div>`;

  // hotel highlights section (only for packages that have it)
  const hotelHighlights =
    "hotelHighlights" in pkg && pkg.hotelHighlights.length > 0
      ? `<div class="section">
    <div class="section-title">Premium Hotel Line-Up</div>
    <ul class="notes-list">
      ${pkg.hotelHighlights.map((h: string) => `<li>${h}</li>`).join("")}
    </ul>
  </div>`
      : "";

  const logoUrl = `${window.location.origin}/assets/uploads/TravelDome-logo-3--1.png`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${pkg.name} - ${pkg.duration} Itinerary | TravelDome</title>
  <meta charset="UTF-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Georgia', serif; color: #1a1a2e; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 3px solid #b45309; padding-bottom: 24px; margin-bottom: 32px; }
    .header-logo { height: 60px; width: auto; margin-bottom: 12px; }
    .logo { font-size: 28px; font-weight: bold; color: #1e3a5f; letter-spacing: 1px; }
    .logo span { color: #b45309; }
    .tagline { color: #666; font-size: 13px; margin-top: 6px; }
    .address { font-size: 11px; color: #888; margin-top: 6px; }
    h1 { font-size: 26px; color: #1e3a5f; margin: 16px 0 8px; }
    .subtitle { color: #555; font-size: 14px; margin-bottom: 6px; }
    .meta { display: flex; gap: 24px; justify-content: center; margin: 16px 0; flex-wrap: wrap; }
    .meta-item { background: #f5f0e8; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; color: #1e3a5f; }
    .section { margin: 28px 0; }
    .section-title { font-size: 18px; font-weight: bold; color: #1e3a5f; border-left: 4px solid #b45309; padding-left: 12px; margin-bottom: 16px; }
    .day { margin-bottom: 24px; page-break-inside: avoid; }
    .day-header { background: #1e3a5f; color: white; padding: 10px 16px; border-radius: 8px 8px 0 0; font-weight: bold; font-size: 15px; }
    .day-body { border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; padding: 16px; }
    .activity { padding: 4px 0; font-size: 13px; color: #333; padding-left: 16px; position: relative; }
    .activity::before { content: '->'; position: absolute; left: 0; color: #b45309; font-weight: bold; }
    .inclusions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .inc-item { display: flex; gap: 8px; align-items: flex-start; background: #f9f7f3; padding: 10px; border-radius: 6px; }
    .inc-text strong { display: block; font-size: 13px; color: #1e3a5f; }
    .inc-text span { font-size: 12px; color: #666; }
    .pricing-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .pricing-table th { background: #1e3a5f; color: white; padding: 10px 16px; text-align: left; font-size: 13px; }
    .pricing-table td { padding: 10px 16px; border-bottom: 1px solid #eee; font-size: 13px; }
    .pricing-table tr:nth-child(even) td { background: #f9f7f3; }
    .price-highlight td:last-child { font-weight: bold; color: #b45309; font-size: 16px; }
    .dates-grid { display: flex; flex-wrap: wrap; gap: 8px; }
    .date-chip { background: #e8f0fe; color: #1e3a5f; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; }
    .notes-list { list-style: none; }
    .notes-list li { padding: 6px 0; font-size: 13px; padding-left: 20px; position: relative; color: #444; }
    .notes-list li::before { content: '!'; position: absolute; left: 0; font-size: 12px; color: #b45309; font-weight: bold; }
    .exclusions { color: #c0392b; }
    .excl-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .excl-item { background: #fff0f0; color: #c0392b; border: 1px solid #f8d7d7; padding: 5px 12px; border-radius: 20px; font-size: 12px; }
    .footer { margin-top: 32px; text-align: center; border-top: 2px solid #eee; padding-top: 16px; }
    .footer p { color: #888; font-size: 12px; margin-bottom: 4px; }
    .guest-name { background: #fffbf0; border: 1px solid #b45309; padding: 8px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 24px; }
    @media print { body { padding: 20px; } .day { page-break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="header">
    <img src="${logoUrl}" alt="TravelDome" class="header-logo" onerror="this.style.display='none'" />
    <div class="logo">Travel<span>Dome</span></div>
    <div class="tagline">From Tickets to Memories — We Handle All</div>
    <div class="address">Saropi Saraswati, CHS LTD, 002, Ghazala Road, Pleasant Park, Mira Road East, Mira Bhayandar, Maharashtra 401107</div>
    <h1>${pkg.name} — ${pkg.duration}</h1>
    <div class="subtitle">${pkg.tagline}</div>
    <div class="meta">
      <span class="meta-item">${pkg.destination}</span>
      <span class="meta-item">${pkg.duration}</span>
      <span class="meta-item">From Rs.${pkg.startingPrice.toLocaleString("en-IN")}/person</span>
      <span class="meta-item">${pkg.category}</span>
    </div>
  </div>

  <div class="guest-name">Prepared for: <strong>${guestName}</strong></div>

  <div class="section">
    <div class="section-title">Day-wise Itinerary</div>
    ${pkg.itinerary
      .map(
        (day: {
          day: number;
          title: string;
          activities: { text: string }[];
        }) => `
      <div class="day">
        <div class="day-header">Day ${day.day}: ${day.title}</div>
        <div class="day-body">
          ${day.activities.map((a) => `<div class="activity">${a.text}</div>`).join("")}
        </div>
      </div>
    `,
      )
      .join("")}
  </div>

  ${hotelHighlights}

  <div class="section">
    <div class="section-title">Package Inclusions</div>
    <div class="inclusions-grid">
      ${pkg.inclusions
        .map(
          (inc: { label: string; desc: string }) => `
        <div class="inc-item">
          <div class="inc-text"><strong>${inc.label}</strong><span>${inc.desc}</span></div>
        </div>
      `,
        )
        .join("")}
    </div>
  </div>

  <div class="section">
    <div class="section-title exclusions">Exclusions</div>
    <div class="excl-list">
      ${pkg.exclusions.map((e: string) => `<span class="excl-item">Not Included: ${e}</span>`).join("")}
    </div>
  </div>

  <div class="section">
    <div class="section-title">Package Pricing</div>
    <table class="pricing-table">
      <thead><tr><th>Occupancy</th><th>Price per Person (INR)</th></tr></thead>
      <tbody>
        ${pkg.pricing
          .map(
            (p: { label: string; price: number }, i: number) => `
          <tr class="${i === 1 ? "price-highlight" : ""}">
            <td>${p.label}</td>
            <td>Rs.${p.price.toLocaleString("en-IN")}/-</td>
          </tr>
        `,
          )
          .join("")}
        <tr><td colspan="2" style="font-size:11px;color:#888;padding-top:4px">*Prices excluding taxes (GST and TCS)</td></tr>
      </tbody>
    </table>
  </div>

  ${datesSection}

  <div class="section">
    <div class="section-title">Important Notes</div>
    <ul class="notes-list">
      ${pkg.importantNotes.map((n: string) => `<li>${n}</li>`).join("")}
    </ul>
  </div>

  <div class="footer">
    <p>TravelDome | traveldome.in | WhatsApp: +91 70426 36363 | @traveldome._</p>
    <p>Saropi Saraswati, CHS LTD, 002, Ghazala Road, Pleasant Park, Mira Road East, Mira Bhayandar, Maharashtra 401107</p>
    <p>This is a digital itinerary. Prices and dates are subject to availability.</p>
  </div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 500);
}

// ─── Lead Capture Modal ────────────────────────────────────────────────────────
function LeadCaptureModal({
  open,
  onClose,
  packageId,
  packageName,
  pkg,
}: {
  open: boolean;
  onClose: () => void;
  packageId: string;
  packageName: string;
  pkg: PackageData;
}) {
  const submitLead = useSubmitLeadCapture();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        packageId,
      });

      setSubmitted(true);

      // Print itinerary
      setTimeout(() => printItinerary(form.name, pkg), 300);

      // Open WhatsApp with lead info
      const waMsg = encodeURIComponent(
        `New Lead: ${form.name}, ${form.phone}, ${form.email} - ${packageName} Package`,
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setForm({ name: "", phone: "", email: "" });
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent data-ocid="lead_capture.dialog" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {submitted ? "Itinerary Ready!" : "Download Itinerary"}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? "Your itinerary is printing. Our team will reach out to you on WhatsApp shortly."
              : `Enter your details to download the full itinerary PDF for ${packageName}.`}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-6 gap-4"
            >
              <div
                data-ocid="lead_capture.success_state"
                className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center"
              >
                <Download className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Download started!</p>
                <p className="text-sm text-muted-foreground">
                  The itinerary PDF has been sent to your browser's print
                  dialog. Our team will also reach you on WhatsApp at{" "}
                  <strong>{form.phone}</strong>.
                </p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi TravelDome! I just downloaded the ${packageName} itinerary. I'm ${form.name} (${form.phone}). Please share more details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={handleClose}
                data-ocid="lead_capture.close_button"
                className="w-full"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-2"
            >
              <div>
                <Label
                  htmlFor="lead-name"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="lead-name"
                  data-ocid="lead_capture.name_input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  placeholder="e.g. Rahul Sharma"
                  autoComplete="name"
                />
              </div>

              <div>
                <Label
                  htmlFor="lead-phone"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Phone Number (WhatsApp) *
                </Label>
                <Input
                  id="lead-phone"
                  data-ocid="lead_capture.phone_input"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  required
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  pattern="[+0-9\s\-]+"
                />
              </div>

              <div>
                <Label
                  htmlFor="lead-email"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Email Address *
                </Label>
                <Input
                  id="lead-email"
                  data-ocid="lead_capture.email_input"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                By submitting, you agree to receive travel updates from
                TravelDome via WhatsApp.
              </p>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  data-ocid="lead_capture.submit_button"
                  disabled={submitLead.isPending}
                  className="flex-1 gold-gradient text-foreground font-bold border-0 hover:opacity-90"
                >
                  {submitLead.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Free Itinerary
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  data-ocid="lead_capture.cancel_button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// ─── Package Detail Page ───────────────────────────────────────────────────────
export default function PackageDetail() {
  const { packageId } = useParams({ from: "/packages/$packageId" });
  const submitBooking = useSubmitBooking();
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  const pkg = packages[packageId];

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelDates: "",
    travelers: "2",
    message: "",
  });

  // Dynamic document title for SEO
  useEffect(() => {
    if (pkg) {
      document.title = `${pkg.name} — ${pkg.duration} | ${pkg.destination} | TravelDome`;
    } else {
      document.title = "Package Not Found | TravelDome";
    }
    return () => {
      document.title = "TravelDome — From Tickets to Memories";
    };
  }, [pkg]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitBooking.mutateAsync({
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        travelDates: bookingForm.travelDates,
        travelers: BigInt(bookingForm.travelers),
        message: bookingForm.message,
        packageId,
      });
      toast.success(
        "Booking request submitted! We'll contact you within 24 hours.",
      );
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        travelDates: "",
        travelers: "2",
        message: "",
      });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  // 404 — package not found
  if (!pkg) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl mb-4">Package not found</h2>
          <Link to="/packages">
            <Button>Back to Packages</Button>
          </Link>
        </div>
      </main>
    );
  }

  const isBali = packageId === BALI_PACKAGE_SLUG;
  const hasFixedDates = pkg.departureDates.length > 0;
  const isInternational = pkg.category === "International";

  // Highlights bar content
  const highlightsBar = isBali
    ? [
        {
          icon: <Calendar className="w-4 h-4 text-gold" />,
          text: pkg.duration,
        },
        {
          icon: <UtensilsCrossed className="w-4 h-4 text-gold" />,
          text: "6 Breakfasts Included",
        },
        {
          icon: <Car className="w-4 h-4 text-gold" />,
          text: "All Private Transfers",
        },
        {
          icon: <FileText className="w-4 h-4 text-gold" />,
          text: "Visa + Insurance",
        },
        {
          icon: <Star className="w-4 h-4 text-gold fill-gold" />,
          text: `${pkg.rating} Rating`,
        },
      ]
    : [
        {
          icon: <Calendar className="w-4 h-4 text-gold" />,
          text: pkg.duration,
        },
        {
          icon: <Car className="w-4 h-4 text-gold" />,
          text: isInternational ? "Guided Tours Included" : "Private Transport",
        },
        {
          icon: <UtensilsCrossed className="w-4 h-4 text-gold" />,
          text: isInternational ? "Meals Included" : "Breakfast and Dinner",
        },
        {
          icon: <MapIcon className="w-4 h-4 text-gold" />,
          text: "All Sightseeing",
        },
        {
          icon: <Star className="w-4 h-4 text-gold fill-gold" />,
          text: `${pkg.rating} Rating`,
        },
      ];

  return (
    <main className="pt-16 pb-24">
      <LeadCaptureModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        packageId={packageId}
        packageName={pkg.name}
        pkg={pkg}
      />

      {/* Hero */}
      <div className="relative h-72 md:h-[500px] overflow-hidden">
        <img
          src={pkg.heroImage}
          alt={`${pkg.name} - ${pkg.destination} Tour Package`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <Link
            to="/packages"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Packages
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`text-white text-xs font-bold px-3 py-1 rounded-full ${
                isInternational ? "bg-sky-500" : "bg-emerald-700"
              }`}
            >
              {pkg.category}
            </span>
            {isBali ? (
              <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Luxury
              </span>
            ) : (
              <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                New Launch
              </span>
            )}
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-white mb-2">
            {pkg.name}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">
            {pkg.tagline}
          </p>
        </div>
      </div>

      {/* Highlights bar */}
      <div className="teal-gradient text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium">
            {highlightsBar.map((item) => (
              <span key={item.text} className="flex items-center gap-2">
                {item.icon}
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="itinerary">
              <div className="overflow-x-auto -mx-1 px-1 mb-8">
                <TabsList className="w-full h-auto p-1 bg-secondary rounded-xl grid grid-cols-4 min-w-[340px]">
                  <TabsTrigger
                    value="itinerary"
                    data-ocid="package_detail.itinerary_tab"
                    className="rounded-lg data-[state=active]:teal-gradient data-[state=active]:text-white text-xs md:text-sm py-2.5"
                  >
                    Itinerary
                  </TabsTrigger>
                  <TabsTrigger
                    value="inclusions"
                    data-ocid="package_detail.inclusions_tab"
                    className="rounded-lg data-[state=active]:teal-gradient data-[state=active]:text-white text-xs md:text-sm py-2.5"
                  >
                    Inclusions
                  </TabsTrigger>
                  <TabsTrigger
                    value="pricing"
                    data-ocid="package_detail.pricing_tab"
                    className="rounded-lg data-[state=active]:teal-gradient data-[state=active]:text-white text-xs md:text-sm py-2.5"
                  >
                    Pricing
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    data-ocid="package_detail.notes_tab"
                    className="rounded-lg data-[state=active]:teal-gradient data-[state=active]:text-white text-xs md:text-sm py-2.5"
                  >
                    Notes
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* ITINERARY TAB */}
              <TabsContent value="itinerary" className="space-y-6">
                {pkg.itinerary.map(
                  (
                    day: {
                      day: number;
                      title: string;
                      highlights: string[];
                      activities: { time: string; text: string }[];
                    },
                    idx: number,
                  ) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative"
                    >
                      {/* Timeline connector */}
                      {idx < pkg.itinerary.length - 1 && (
                        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-border" />
                      )}

                      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                        {/* Day header */}
                        <div className="teal-gradient px-6 py-4 flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center shrink-0">
                            <span className="font-display font-bold text-white text-sm">
                              D{day.day}
                            </span>
                          </div>
                          <div>
                            <p className="text-gold text-xs font-semibold uppercase tracking-wider">
                              Day {day.day}
                            </p>
                            <h3 className="font-display font-bold text-white text-lg">
                              {day.title}
                            </h3>
                          </div>
                        </div>

                        {/* Highlights chips */}
                        {day.highlights.length > 0 && (
                          <div className="px-6 pt-4 flex flex-wrap gap-2">
                            {day.highlights.map((h: string) => (
                              <span
                                key={h}
                                className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-medium"
                              >
                                * {h}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Activities */}
                        <div className="px-6 py-4 space-y-2">
                          {day.activities.map(
                            (
                              activity: { time: string; text: string },
                              ai: number,
                            ) => (
                              <div
                                key={`${activity.time}-${ai}`}
                                className="flex items-start gap-3 text-sm"
                              >
                                <span className="text-xs font-semibold text-muted-foreground w-16 shrink-0 pt-0.5">
                                  {activity.time}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                                <span className="text-foreground leading-relaxed">
                                  {activity.text}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </TabsContent>

              {/* INCLUSIONS TAB */}
              <TabsContent value="inclusions">
                {/* Hotel highlights callout (Bali only) */}
                {"hotelHighlights" in pkg && pkg.hotelHighlights.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-violet-50 border border-violet-200 rounded-2xl p-5"
                  >
                    <h3 className="font-display font-bold text-violet-900 text-base mb-3 flex items-center gap-2">
                      <Hotel className="w-5 h-5 text-violet-600" />
                      Premium Hotel Line-Up
                    </h3>
                    <div className="space-y-2">
                      {pkg.hotelHighlights.map((hotel: string) => (
                        <div
                          key={hotel}
                          className="flex items-start gap-2 text-sm text-violet-800"
                        >
                          <Star className="w-3.5 h-3.5 mt-0.5 shrink-0 fill-violet-400 text-violet-400" />
                          <span>{hotel}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      Inclusions
                    </h3>
                    <div className="space-y-3">
                      {pkg.inclusions.map(
                        (inc: {
                          icon: string;
                          label: string;
                          desc: string;
                        }) => (
                          <motion.div
                            key={inc.icon + inc.label}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4"
                          >
                            <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center shrink-0">
                              {inclusionIconMap[inc.icon]}
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-emerald-900">
                                {inc.label}
                              </p>
                              <p className="text-xs text-emerald-700 mt-0.5">
                                {inc.desc}
                              </p>
                            </div>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Exclusions
                    </h3>
                    <div className="space-y-2">
                      {pkg.exclusions.map((exc: string) => (
                        <div
                          key={exc}
                          className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                        >
                          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <p className="text-sm text-red-800">{exc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* PRICING TAB */}
              <TabsContent value="pricing">
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border">
                    <div className="teal-gradient px-6 py-4">
                      <h3 className="font-display font-bold text-white text-lg">
                        Price Per Person
                      </h3>
                      <p className="text-white/70 text-sm">
                        Excluding taxes (GST and TCS)
                      </p>
                    </div>
                    <div className="divide-y divide-border">
                      {pkg.pricing.map(
                        (p: { label: string; price: number }, i: number) => (
                          <div
                            key={p.label}
                            className={`flex justify-between items-center px-6 py-4 ${i === 1 ? "bg-gold/5" : ""}`}
                          >
                            <div>
                              <p className="font-semibold">{p.label}</p>
                              {i === 1 && (
                                <p className="text-xs text-muted-foreground">
                                  Most popular
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <span
                                className={`font-display font-bold ${i === 1 ? "text-2xl text-primary" : "text-xl text-foreground"}`}
                              >
                                ₹{p.price.toLocaleString("en-IN")}
                              </span>
                              <span className="text-muted-foreground text-sm">
                                /-
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <p className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-600" />
                      Booking Terms
                    </p>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>
                        • Confirmation deposit: ₹10,000 per person
                        (Non-Refundable)
                      </li>
                      <li>• Balance payment: 15 days before departure</li>
                      <li>• Prices subject to change without prior notice</li>
                    </ul>
                  </div>

                  {hasFixedDates ? (
                    <div>
                      <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Group Departure Dates 2025
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {pkg.departureDates.map(
                          (group: { month: string; dates: number[] }) =>
                            group.dates.map((d: number) => (
                              <span
                                key={`${group.month}-${d}`}
                                className="bg-primary/10 text-primary border border-primary/20 text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                              >
                                <Calendar className="w-3.5 h-3.5 inline mr-1.5" />
                                {group.month} {d}
                              </span>
                            )),
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
                      <p className="font-semibold text-sky-900 mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-sky-600" />
                        Flexible Departure Dates
                      </p>
                      <p className="text-sm text-sky-800">
                        This package operates on request — dates are flexible.
                        Contact us to check your preferred travel window and
                        availability.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* IMPORTANT NOTES TAB */}
              <TabsContent value="notes">
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h3 className="font-display font-bold text-amber-900 text-lg mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      Important Notes
                    </h3>
                    <ul className="space-y-3">
                      {pkg.importantNotes.map((note: string) => (
                        <li key={note} className="flex items-start gap-3">
                          <span className="text-amber-600 mt-0.5 shrink-0 text-base">
                            •
                          </span>
                          <p className="text-sm text-amber-800">{note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
                    <h3 className="font-display font-bold text-sky-900 text-lg mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-sky-600" />
                      Visa Information
                    </h3>
                    <ul className="space-y-2 text-sm text-sky-800">
                      {isBali ? (
                        <>
                          <li>• Bali tourist visa included in the package</li>
                          <li>
                            • Travel insurance included (extra charges for age
                            59+)
                          </li>
                          <li>
                            • Valid passport required (min. 6 months validity
                            from travel date)
                          </li>
                          <li>
                            • Documents required: Passport copy, photo, bank
                            statement
                          </li>
                        </>
                      ) : packageId === BAKU_PACKAGE_SLUG ? (
                        <>
                          <li>• Standard Visa processing: 5 working days</li>
                          <li>• Visa fees included in the package price</li>
                          <li>
                            • Valid passport required (min. 6 months validity
                            from travel date)
                          </li>
                          <li>
                            • Documents required: Passport copy, photo, bank
                            statement
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            • Valid passport required for international packages
                            (min. 6 months validity from travel date)
                          </li>
                          <li>
                            • Visa assistance available — contact us for current
                            requirements
                          </li>
                          <li>
                            • Documents required: Passport copy, photo, bank
                            statement
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {packageId === BAKU_PACKAGE_SLUG && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                      <h3 className="font-display font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                        Indian Food Guarantee
                      </h3>
                      <p className="text-sm text-emerald-800">
                        All meals are served at dedicated Indian restaurants in
                        Baku. You can enjoy authentic Indian cuisine throughout
                        your trip — no need to worry about food.
                      </p>
                    </div>
                  )}

                  {isBali && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                      <h3 className="font-display font-bold text-emerald-900 text-lg mb-4 flex items-center gap-2">
                        <Plane className="w-4 h-4 text-emerald-600" />
                        Singapore Airlines Special
                      </h3>
                      <p className="text-sm text-emerald-800">
                        This package is operated with Singapore Airlines fares.
                        Availability and pricing are subject to airline seat
                        inventory at the time of booking. We recommend booking
                        early to secure the best rates.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Booking form */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-card-hover p-6 sticky top-24">
              <h2 className="font-display font-bold text-xl mb-1">
                Book This Package
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Fill in the details and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="b-name"
                    className="text-sm font-medium mb-1 block"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="b-name"
                    data-ocid="contact.name_input"
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="b-phone"
                    className="text-sm font-medium mb-1 block"
                  >
                    Phone *
                  </Label>
                  <Input
                    id="b-phone"
                    type="tel"
                    data-ocid="contact.phone_input"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="b-email"
                    className="text-sm font-medium mb-1 block"
                  >
                    Email *
                  </Label>
                  <Input
                    id="b-email"
                    type="email"
                    data-ocid="contact.email_input"
                    value={bookingForm.email}
                    onChange={(e) =>
                      setBookingForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="b-dates"
                    className="text-sm font-medium mb-1 block"
                  >
                    Preferred Date *
                  </Label>
                  {hasFixedDates ? (
                    <Select
                      value={bookingForm.travelDates}
                      onValueChange={(v) =>
                        setBookingForm((p) => ({ ...p, travelDates: v }))
                      }
                    >
                      <SelectTrigger id="b-dates" data-ocid="contact.select">
                        <SelectValue placeholder="Select departure date" />
                      </SelectTrigger>
                      <SelectContent>
                        {pkg.departureDates.map(
                          (group: { month: string; dates: number[] }) =>
                            group.dates.map((d: number) => (
                              <SelectItem
                                key={`${group.month}-${d}`}
                                value={`${group.month} ${d}, 2025`}
                              >
                                {group.month} {d}, 2025
                              </SelectItem>
                            )),
                        )}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="b-dates"
                      data-ocid="contact.input"
                      value={bookingForm.travelDates}
                      onChange={(e) =>
                        setBookingForm((p) => ({
                          ...p,
                          travelDates: e.target.value,
                        }))
                      }
                      placeholder="e.g. June 2025 or Flexible"
                    />
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="b-travelers"
                    className="text-sm font-medium mb-1 block"
                  >
                    Travelers
                  </Label>
                  <Select
                    value={bookingForm.travelers}
                    onValueChange={(v) =>
                      setBookingForm((p) => ({ ...p, travelers: v }))
                    }
                  >
                    <SelectTrigger id="b-travelers">
                      <Users className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n} {n === 1 ? "Traveler" : "Travelers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="b-msg"
                    className="text-sm font-medium mb-1 block"
                  >
                    Special Requirements
                  </Label>
                  <Textarea
                    id="b-msg"
                    data-ocid="contact.message_input"
                    value={bookingForm.message}
                    onChange={(e) =>
                      setBookingForm((p) => ({
                        ...p,
                        message: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Dietary preferences, special requests..."
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
                      Submitting...
                    </>
                  ) : (
                    "Submit Booking Request"
                  )}
                </Button>
              </form>

              <div className="mt-4 pt-4 border-t border-border">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi TravelDome! I'm interested in the ${pkg.name} package. Please share more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10 py-3 px-4">
        <div className="container mx-auto flex items-center justify-between gap-3 max-w-5xl">
          <div className="min-w-0 flex-1 sm:flex-none">
            <p className="text-white font-display font-bold text-sm sm:text-lg truncate">
              {pkg.name}
            </p>
            <p className="text-gold text-xs sm:text-sm font-semibold">
              From Rs.{pkg.startingPrice.toLocaleString("en-IN")}/person
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 shrink-0">
            <Button
              onClick={() => setLeadModalOpen(true)}
              data-ocid="package_detail.download_button"
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 font-semibold text-xs sm:text-sm px-3 sm:px-4"
            >
              <Download className="w-3.5 h-3.5 sm:mr-2" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button
              data-ocid="package_detail.book_button"
              size="sm"
              onClick={() => {
                const form = document.getElementById("b-name");
                form?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="gold-gradient text-foreground font-bold border-0 hover:opacity-90 text-xs sm:text-sm px-4 sm:px-6"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
