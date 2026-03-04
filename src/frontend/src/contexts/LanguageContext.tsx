import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";

export type Language = "en" | "hi";

export type TranslationKeys =
  | "nav_home"
  | "nav_packages"
  | "nav_gallery"
  | "nav_blog"
  | "nav_contact"
  | "nav_reviews"
  | "nav_admin"
  | "nav_login"
  | "nav_logout"
  | "hero_title"
  | "hero_subtitle"
  | "hero_cta"
  | "hero_explore"
  | "book_now"
  | "view_all"
  | "view_details"
  | "featured_packages"
  | "featured_subtitle"
  | "why_choose_us"
  | "why_subtitle"
  | "why_expert"
  | "why_expert_desc"
  | "why_best_price"
  | "why_best_price_desc"
  | "why_support"
  | "why_support_desc"
  | "why_handpicked"
  | "why_handpicked_desc"
  | "testimonials"
  | "testimonials_subtitle"
  | "latest_blogs"
  | "blogs_subtitle"
  | "read_more"
  | "packages_title"
  | "packages_subtitle"
  | "filter_all"
  | "filter_domestic"
  | "filter_international"
  | "filter_honeymoon"
  | "per_person"
  | "duration"
  | "highlights"
  | "booking_title"
  | "booking_subtitle"
  | "booking_name"
  | "booking_email"
  | "booking_phone"
  | "booking_dates"
  | "booking_travelers"
  | "booking_message"
  | "booking_submit"
  | "booking_success"
  | "booking_error"
  | "gallery_title"
  | "gallery_subtitle"
  | "blog_title"
  | "blog_subtitle"
  | "by_author"
  | "contact_title"
  | "contact_subtitle"
  | "contact_name"
  | "contact_email"
  | "contact_phone"
  | "contact_message"
  | "contact_submit"
  | "contact_success"
  | "contact_address"
  | "contact_phone_label"
  | "contact_email_label"
  | "contact_hours"
  | "reviews_title"
  | "reviews_subtitle"
  | "review_name"
  | "review_rating"
  | "review_text"
  | "review_submit"
  | "review_success"
  | "admin_dashboard"
  | "admin_packages"
  | "admin_bookings"
  | "admin_gallery"
  | "admin_reviews"
  | "admin_blog"
  | "admin_add_package"
  | "admin_add_photo"
  | "admin_add_blog"
  | "admin_approve"
  | "admin_delete"
  | "admin_edit"
  | "admin_publish"
  | "admin_unpublish"
  | "admin_title"
  | "admin_description"
  | "admin_price"
  | "admin_duration_label"
  | "admin_category"
  | "admin_image"
  | "admin_save"
  | "admin_cancel"
  | "admin_total_packages"
  | "admin_total_bookings"
  | "admin_total_reviews"
  | "admin_total_photos"
  | "admin_pending_reviews"
  | "login_title"
  | "login_subtitle"
  | "login_btn"
  | "loading"
  | "no_results"
  | "search_placeholder"
  | "footer_tagline"
  | "footer_quick_links"
  | "footer_contact_info"
  | "footer_follow_us"
  | "footer_rights"
  | "footer_built_with"
  | "back_to_packages"
  | "package_not_found"
  | "blog_not_found"
  | "back_to_blog"
  | "select_travelers"
  | "admin_author"
  | "admin_content"
  | "admin_highlights"
  | "travelers_1"
  | "travelers_2"
  | "travelers_3"
  | "travelers_4"
  | "travelers_5plus"
  | "stats_happy_travelers"
  | "stats_destinations"
  | "stats_years"
  | "stats_packages";

const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    nav_home: "Home",
    nav_packages: "Tour Packages",
    nav_gallery: "Gallery",
    nav_blog: "Blog",
    nav_contact: "Contact",
    nav_reviews: "Reviews",
    nav_admin: "Admin Panel",
    nav_login: "Login",
    nav_logout: "Logout",
    hero_title: "Explore the World with TravelDome",
    hero_subtitle:
      "Discover breathtaking destinations across India and the globe with our expertly curated tour packages",
    hero_cta: "Explore Packages",
    hero_explore: "Explore Now",
    book_now: "Book Now",
    view_all: "View All",
    view_details: "View Details",
    featured_packages: "Featured Tour Packages",
    featured_subtitle: "Handpicked experiences for every type of traveler",
    why_choose_us: "Why Choose TravelDome?",
    why_subtitle: "We make your dream vacation a reality",
    why_expert: "Expert Guides",
    why_expert_desc:
      "Our experienced local guides ensure you experience the authentic culture of every destination",
    why_best_price: "Best Price Guarantee",
    why_best_price_desc:
      "Get the most value for your money with our competitive pricing and exclusive deals",
    why_support: "24/7 Support",
    why_support_desc:
      "Our dedicated team is available around the clock to assist you on your journey",
    why_handpicked: "Handpicked Destinations",
    why_handpicked_desc:
      "Every destination in our catalog is carefully selected for its unique beauty and experiences",
    testimonials: "What Our Travelers Say",
    testimonials_subtitle: "Real experiences from real travelers",
    latest_blogs: "Travel Stories & Tips",
    blogs_subtitle: "Inspiration and guides for your next adventure",
    read_more: "Read More",
    packages_title: "Our Tour Packages",
    packages_subtitle:
      "Choose from our wide selection of thoughtfully crafted travel experiences",
    filter_all: "All Packages",
    filter_domestic: "Domestic",
    filter_international: "International",
    filter_honeymoon: "Honeymoon",
    per_person: "per person",
    duration: "Duration",
    highlights: "Highlights",
    booking_title: "Book Your Trip",
    booking_subtitle:
      "Fill in the details below and we'll get back to you within 24 hours",
    booking_name: "Full Name",
    booking_email: "Email Address",
    booking_phone: "Phone Number",
    booking_dates: "Travel Dates",
    booking_travelers: "Number of Travelers",
    booking_message: "Special Requirements or Questions",
    booking_submit: "Submit Booking Request",
    booking_success:
      "Booking request submitted successfully! We'll contact you soon.",
    booking_error: "Failed to submit booking. Please try again.",
    gallery_title: "Photo Gallery",
    gallery_subtitle: "Stunning captures from our travel destinations",
    blog_title: "Travel Stories & Guides",
    blog_subtitle: "Expert tips, travel inspiration, and destination guides",
    by_author: "By",
    contact_title: "Get in Touch",
    contact_subtitle:
      "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    contact_name: "Your Name",
    contact_email: "Email Address",
    contact_phone: "Phone Number",
    contact_message: "Your Message",
    contact_submit: "Send Message",
    contact_success: "Message sent successfully! We'll get back to you soon.",
    contact_address: "123 Travel Street, Connaught Place, New Delhi - 110001",
    contact_phone_label: "+91 98765 43210",
    contact_email_label: "info@traveldome.in",
    contact_hours: "Mon - Sat: 9:00 AM - 7:00 PM",
    reviews_title: "Traveler Reviews",
    reviews_subtitle: "Honest reviews from our valued customers",
    review_name: "Your Name",
    review_rating: "Rating",
    review_text: "Share your experience",
    review_submit: "Submit Review",
    review_success: "Review submitted! It will be visible after approval.",
    admin_dashboard: "Dashboard",
    admin_packages: "Tour Packages",
    admin_bookings: "Bookings",
    admin_gallery: "Gallery",
    admin_reviews: "Reviews",
    admin_blog: "Blog Posts",
    admin_add_package: "Add Package",
    admin_add_photo: "Add Photo",
    admin_add_blog: "Add Blog Post",
    admin_approve: "Approve",
    admin_delete: "Delete",
    admin_edit: "Edit",
    admin_publish: "Publish",
    admin_unpublish: "Unpublish",
    admin_title: "Title",
    admin_description: "Description",
    admin_price: "Price (₹)",
    admin_duration_label: "Duration",
    admin_category: "Category",
    admin_image: "Image",
    admin_save: "Save",
    admin_cancel: "Cancel",
    admin_total_packages: "Total Packages",
    admin_total_bookings: "Total Bookings",
    admin_total_reviews: "Total Reviews",
    admin_total_photos: "Gallery Photos",
    admin_pending_reviews: "Pending Reviews",
    login_title: "Admin Login",
    login_subtitle: "Sign in with Internet Identity to access the admin panel",
    login_btn: "Sign in with Internet Identity",
    loading: "Loading...",
    no_results: "No results found",
    search_placeholder: "Search...",
    footer_tagline: "Making dream vacations a reality since 2010",
    footer_quick_links: "Quick Links",
    footer_contact_info: "Contact Info",
    footer_follow_us: "Follow Us",
    footer_rights: "All rights reserved.",
    footer_built_with: "Built with love using",
    back_to_packages: "Back to Packages",
    package_not_found: "Package not found",
    blog_not_found: "Blog post not found",
    back_to_blog: "Back to Blog",
    select_travelers: "Select number of travelers",
    admin_author: "Author",
    admin_content: "Content",
    admin_highlights: "Highlights (one per line)",
    travelers_1: "1 Traveler",
    travelers_2: "2 Travelers",
    travelers_3: "3 Travelers",
    travelers_4: "4 Travelers",
    travelers_5plus: "5+ Travelers",
    stats_happy_travelers: "Happy Travelers",
    stats_destinations: "Destinations",
    stats_years: "Years Experience",
    stats_packages: "Tour Packages",
  },
  hi: {
    nav_home: "होम",
    nav_packages: "टूर पैकेज",
    nav_gallery: "गैलरी",
    nav_blog: "ब्लॉग",
    nav_contact: "संपर्क करें",
    nav_reviews: "समीक्षाएं",
    nav_admin: "एडमिन पैनल",
    nav_login: "लॉगिन",
    nav_logout: "लॉगआउट",
    hero_title: "TravelDome के साथ दुनिया घूमें",
    hero_subtitle:
      "हमारे विशेषज्ञों द्वारा चुने गए टूर पैकेज के साथ भारत और दुनिया की अद्भुत जगहों की खोज करें",
    hero_cta: "पैकेज देखें",
    hero_explore: "अभी खोजें",
    book_now: "अभी बुक करें",
    view_all: "सभी देखें",
    view_details: "विवरण देखें",
    featured_packages: "विशेष टूर पैकेज",
    featured_subtitle: "हर यात्री के लिए हस्तचुनित अनुभव",
    why_choose_us: "TravelDome क्यों चुनें?",
    why_subtitle: "हम आपके सपनों की छुट्टी को हकीकत बनाते हैं",
    why_expert: "विशेषज्ञ गाइड",
    why_expert_desc:
      "हमारे अनुभवी स्थानीय गाइड आपको हर गंतव्य की असली संस्कृति का अनुभव कराते हैं",
    why_best_price: "सर्वोत्तम मूल्य गारंटी",
    why_best_price_desc:
      "हमारी प्रतिस्पर्धी कीमतों और विशेष ऑफर के साथ अपने पैसे का सर्वोत्तम मूल्य पाएं",
    why_support: "24/7 सहायता",
    why_support_desc: "हमारी समर्पित टीम आपकी यात्रा में सहायता के लिए हमेशा उपलब्ध है",
    why_handpicked: "हस्तचुनित गंतव्य",
    why_handpicked_desc:
      "हमारे कैटलॉग में हर गंतव्य को उसकी अनूठी सुंदरता और अनुभवों के लिए सावधानी से चुना गया है",
    testimonials: "यात्रियों की राय",
    testimonials_subtitle: "वास्तविक यात्रियों के वास्तविक अनुभव",
    latest_blogs: "यात्रा कहानियां और टिप्स",
    blogs_subtitle: "आपके अगले साहसिक कार्य के लिए प्रेरणा और मार्गदर्शिका",
    read_more: "और पढ़ें",
    packages_title: "हमारे टूर पैकेज",
    packages_subtitle:
      "हमारे सोच-समझकर तैयार किए गए यात्रा अनुभवों की विस्तृत श्रृंखला से चुनें",
    filter_all: "सभी पैकेज",
    filter_domestic: "घरेलू",
    filter_international: "अंतर्राष्ट्रीय",
    filter_honeymoon: "हनीमून",
    per_person: "प्रति व्यक्ति",
    duration: "अवधि",
    highlights: "मुख्य आकर्षण",
    booking_title: "अपनी यात्रा बुक करें",
    booking_subtitle: "नीचे दिए गए विवरण भरें और हम 24 घंटों के भीतर आपसे संपर्क करेंगे",
    booking_name: "पूरा नाम",
    booking_email: "ईमेल पता",
    booking_phone: "फोन नंबर",
    booking_dates: "यात्रा की तारीखें",
    booking_travelers: "यात्रियों की संख्या",
    booking_message: "विशेष आवश्यकताएं या प्रश्न",
    booking_submit: "बुकिंग अनुरोध जमा करें",
    booking_success: "बुकिंग अनुरोध सफलतापूर्वक जमा! हम जल्द ही आपसे संपर्क करेंगे।",
    booking_error: "बुकिंग जमा करने में विफल। कृपया पुनः प्रयास करें।",
    gallery_title: "फोटो गैलरी",
    gallery_subtitle: "हमारे यात्रा गंतव्यों से आश्चर्यजनक तस्वीरें",
    blog_title: "यात्रा कहानियां और मार्गदर्शिकाएं",
    blog_subtitle: "विशेषज्ञ टिप्स, यात्रा प्रेरणा और गंतव्य मार्गदर्शिकाएं",
    by_author: "लेखक",
    contact_title: "संपर्क करें",
    contact_subtitle: "हम आपसे सुनना पसंद करेंगे। हमें संदेश भेजें और हम जल्द से जल्द जवाब देंगे।",
    contact_name: "आपका नाम",
    contact_email: "ईमेल पता",
    contact_phone: "फोन नंबर",
    contact_message: "आपका संदेश",
    contact_submit: "संदेश भेजें",
    contact_success: "संदेश सफलतापूर्वक भेजा गया! हम जल्द ही वापस आएंगे।",
    contact_address: "123 ट्रैवल स्ट्रीट, कनॉट प्लेस, नई दिल्ली - 110001",
    contact_phone_label: "+91 98765 43210",
    contact_email_label: "info@traveldome.in",
    contact_hours: "सोम - शनि: सुबह 9:00 - शाम 7:00",
    reviews_title: "यात्री समीक्षाएं",
    reviews_subtitle: "हमारे मूल्यवान ग्राहकों की ईमानदार समीक्षाएं",
    review_name: "आपका नाम",
    review_rating: "रेटिंग",
    review_text: "अपना अनुभव साझा करें",
    review_submit: "समीक्षा जमा करें",
    review_success: "समीक्षा जमा! अनुमोदन के बाद दिखाई देगी।",
    admin_dashboard: "डैशबोर्ड",
    admin_packages: "टूर पैकेज",
    admin_bookings: "बुकिंग",
    admin_gallery: "गैलरी",
    admin_reviews: "समीक्षाएं",
    admin_blog: "ब्लॉग पोस्ट",
    admin_add_package: "पैकेज जोड़ें",
    admin_add_photo: "फोटो जोड़ें",
    admin_add_blog: "ब्लॉग पोस्ट जोड़ें",
    admin_approve: "अनुमोदित करें",
    admin_delete: "हटाएं",
    admin_edit: "संपादित करें",
    admin_publish: "प्रकाशित करें",
    admin_unpublish: "अप्रकाशित करें",
    admin_title: "शीर्षक",
    admin_description: "विवरण",
    admin_price: "मूल्य (₹)",
    admin_duration_label: "अवधि",
    admin_category: "श्रेणी",
    admin_image: "छवि",
    admin_save: "सहेजें",
    admin_cancel: "रद्द करें",
    admin_total_packages: "कुल पैकेज",
    admin_total_bookings: "कुल बुकिंग",
    admin_total_reviews: "कुल समीक्षाएं",
    admin_total_photos: "गैलरी फ़ोटो",
    admin_pending_reviews: "लंबित समीक्षाएं",
    login_title: "एडमिन लॉगिन",
    login_subtitle: "एडमिन पैनल तक पहुंचने के लिए Internet Identity से साइन इन करें",
    login_btn: "Internet Identity से साइन इन करें",
    loading: "लोड हो रहा है...",
    no_results: "कोई परिणाम नहीं मिला",
    search_placeholder: "खोजें...",
    footer_tagline: "2010 से सपनों की छुट्टियां हकीकत बना रहे हैं",
    footer_quick_links: "त्वरित लिंक",
    footer_contact_info: "संपर्क जानकारी",
    footer_follow_us: "हमें फॉलो करें",
    footer_rights: "सर्वाधिकार सुरक्षित।",
    footer_built_with: "प्यार से बनाया गया",
    back_to_packages: "पैकेज पर वापस",
    package_not_found: "पैकेज नहीं मिला",
    blog_not_found: "ब्लॉग पोस्ट नहीं मिली",
    back_to_blog: "ब्लॉग पर वापस",
    select_travelers: "यात्रियों की संख्या चुनें",
    admin_author: "लेखक",
    admin_content: "सामग्री",
    admin_highlights: "मुख्य बिंदु (प्रति पंक्ति एक)",
    travelers_1: "1 यात्री",
    travelers_2: "2 यात्री",
    travelers_3: "3 यात्री",
    travelers_4: "4 यात्री",
    travelers_5plus: "5+ यात्री",
    stats_happy_travelers: "खुश यात्री",
    stats_destinations: "गंतव्य",
    stats_years: "वर्षों का अनुभव",
    stats_packages: "टूर पैकेज",
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("traveldome_language");
    return stored === "en" || stored === "hi" ? stored : "en";
  });

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "en" ? "hi" : "en";
      localStorage.setItem("traveldome_language", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKeys) => translations[language][key] || key,
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
