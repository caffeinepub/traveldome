/**
 * Bali Package — hardcoded frontend data
 * Bali Bliss — 7 Days / 6 Nights
 */

export const BALI_PACKAGE_SLUG = "bali-bliss";

export const baliPackage = {
  id: BALI_PACKAGE_SLUG,
  slug: BALI_PACKAGE_SLUG,
  name: "Bali Bliss",
  nameHi: "बाली — एक स्वर्गिक यात्रा",
  tagline:
    "Singapore Airlines Special | Private Transfers | Kuta · Ubud · Ungasan",
  taglineHi: "सिंगापुर एयरलाइंस स्पेशल | प्राइवेट ट्रांसफर | कुटा · उबुड · उंगासन",
  duration: "7 Days / 6 Nights",
  durationHi: "7 दिन / 6 रातें",
  destination: "Bali, Indonesia",
  category: "International",
  heroImage: "/assets/generated/bali-hero.dim_1400x700.jpg",
  rating: 4.9,
  startingPrice: 85000,

  hotelHighlights: [
    "2 Nights in Kuta: 4-Star Upscale Hotel (Coastal Area)",
    "2 Nights in Ubud: 4-Star Hotel (Nature and Culture Zone)",
    "2 Nights in Ungasan: 5-Star Luxury Hotel (Cliff Area)",
  ],

  pricing: [
    { label: "Single", labelHi: "सिंगल", price: 110000 },
    { label: "Double & Triple", labelHi: "डबल & ट्रिपल", price: 85000 },
    {
      label: "Child with Bed (2–12 yr)",
      labelHi: "बच्चा बिस्तर के साथ (2–12 वर्ष)",
      price: 69500,
    },
    {
      label: "Child No Bed (2–12 yr)",
      labelHi: "बच्चा बिना बिस्तर (2–12 वर्ष)",
      price: 62500,
    },
  ],

  departureDates: [] as { month: string; monthHi: string; dates: number[] }[],

  inclusions: [
    {
      icon: "Plane",
      label: "Airfare",
      labelHi: "हवाई किराया",
      desc: "Return airfare (Singapore Airlines Special)",
    },
    {
      icon: "BedDouble",
      label: "6N Premium Hotels",
      labelHi: "6 रात प्रीमियम होटल",
      desc: "Twin/DBL sharing – 4-Star and 5-Star hotels across Kuta, Ubud and Ungasan",
    },
    {
      icon: "FileText",
      label: "Visa + Insurance",
      labelHi: "वीज़ा + बीमा",
      desc: "Bali tourist visa & travel insurance (extra charges for age 59+)",
    },
    {
      icon: "UtensilsCrossed",
      label: "6 Breakfasts",
      labelHi: "6 नाश्ते",
      desc: "Daily breakfast at hotel",
    },
    {
      icon: "Car",
      label: "All Transfers",
      labelHi: "सभी ट्रांसफर",
      desc: "All transfers, excursions & sightseeing in AC vehicle",
    },
    {
      icon: "Map",
      label: "English Guide",
      labelHi: "अंग्रेजी गाइड",
      desc: "English speaking guide/assistant throughout the tour",
    },
    {
      icon: "Ticket",
      label: "Monument Entrances",
      labelHi: "स्मारक प्रवेश",
      desc: "Trans Studio, Bali Swing, Rafting, GWK, Water Sports, Uluwatu & more",
    },
    {
      icon: "Droplets",
      label: "Mineral Water",
      labelHi: "मिनरल वाटर",
      desc: "Complimentary mineral water bottles per day",
    },
  ],

  exclusions: [
    "Taxes (GST & TCS — 10%)",
    "Lunch & Dinner",
    "Tips / Gratuity (Driver, Hotel Staff, Guides)",
    "Personal Expenses (Laundry, Telephone, Table Drinks, Porterage)",
    "Any Service Not Mentioned in Inclusions",
  ],

  exclusionsHi: [
    "टैक्स (जीएसटी और टीसीएस — 10%)",
    "दोपहर व रात का खाना",
    "टिप्स/ग्रेच्युटी (ड्राइवर, होटल स्टाफ, गाइड)",
    "व्यक्तिगत खर्च (लॉन्ड्री, फोन, टेबल ड्रिंक, पोर्टेज)",
    "इनक्लूजन में उल्लेखित के अलावा कोई सेवा",
  ],

  itinerary: [
    {
      day: 1,
      title: "Arrival in Bali — Kuta Welcome",
      titleHi: "बाली आगमन — कुटा स्वागत",
      highlights: ["Garland Welcome", "Kuta Beach", "4★ Hotel Check-in"],
      activities: [
        {
          time: "Arrival",
          icon: "Plane",
          text: "Arrival at Bali International Airport — Traditional garland welcome",
        },
        {
          time: "Transfer",
          icon: "Car",
          text: "Private transfer to 4★ upscale hotel in Kuta",
        },
        {
          time: "Afternoon",
          icon: "Waves",
          text: "Free time — Relax at hotel, explore nearby market or stroll along Kuta Beach",
        },
        {
          time: "Evening",
          icon: "UtensilsCrossed",
          text: "Dinner on your own at local restaurant or hotel",
        },
        { time: "Night", icon: "Hotel", text: "Overnight Stay — Kuta" },
      ],
    },
    {
      day: 2,
      title: "Trans Studio Bali + Tanah Lot Temple",
      titleHi: "ट्रांस स्टूडियो बाली + तनाह लोट मंदिर",
      highlights: [
        "Trans Studio Theme Park",
        "Fly Over Indonesia",
        "Tanah Lot Sunset",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Car",
          text: "Private transfer to Trans Studio Bali — Bali's largest indoor theme park",
        },
        {
          time: "Morning",
          icon: "Ticket",
          text: "Trans Studio — All rides & attractions (entrance included)",
        },
        {
          time: "Morning",
          icon: "Ticket",
          text: "Fly Over Indonesia — Aerial cinematic experience (included)",
        },
        {
          time: "Evening",
          icon: "Sunset",
          text: "Drive to Tanah Lot Sea Temple — Iconic seaside temple",
        },
        {
          time: "Evening",
          icon: "Camera",
          text: "Sunset views & photography at Tanah Lot",
        },
        { time: "Night", icon: "Hotel", text: "Overnight Stay — Kuta" },
      ],
    },
    {
      day: 3,
      title:
        "Tegenungan Waterfall + Rice Terrace + Kintamani — Transfer to Ubud",
      titleHi: "तेगेनुंगान झरना + चावल की छत + किंतामणि — उबुड ट्रांसफर",
      highlights: [
        "Tegenungan Waterfall",
        "Tegalalang Rice Terrace",
        "Kintamani Volcano View",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Waves",
          text: "Tegenungan Waterfall — Scenic waterfall, photography & lush greenery",
        },
        {
          time: "Late Morning",
          icon: "TreePine",
          text: "Tegalalang Rice Terrace — Walk through layered terraces, café optional",
        },
        {
          time: "Afternoon",
          icon: "MountainSnow",
          text: "Kintamani (View Only) — Panoramic views of Mount Batur & serene lake",
        },
        {
          time: "Afternoon",
          icon: "Car",
          text: "Arrive in Ubud — Check in to 4★ hotel",
        },
        {
          time: "Evening",
          icon: "Leaf",
          text: "Relax and absorb the peaceful cultural heart of Bali",
        },
        { time: "Night", icon: "Hotel", text: "Overnight Stay — Ubud" },
      ],
    },
    {
      day: 4,
      title: "Bali Swing Experience + White Water Rafting",
      titleHi: "बाली स्विंग अनुभव + वाइट वाटर राफ्टिंग",
      highlights: ["Bali Swing", "White Water Rafting", "Scenic River Route"],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Car",
          text: "Private transfer to Bali Swing",
        },
        {
          time: "Morning",
          icon: "Zap",
          text: "Bali Swing — Adrenaline rush over lush valleys, multiple photo spots",
        },
        {
          time: "Afternoon",
          icon: "Waves",
          text: "White Water Rafting — Professional instructors, safety equipment provided",
        },
        {
          time: "Afternoon",
          icon: "TreePine",
          text: "Scenic river route with beautiful jungle scenery",
        },
        { time: "Evening", icon: "Car", text: "Return to Ubud" },
        { time: "Night", icon: "Hotel", text: "Overnight Stay — Ubud" },
      ],
    },
    {
      day: 5,
      title: "Ubud → Ungasan + GWK Cultural Park",
      titleHi: "उबुड → उंगासन + जीडब्ल्यूके सांस्कृतिक पार्क",
      highlights: [
        "GWK Cultural Park",
        "Garuda Wisnu Kencana Statue",
        "5★ Hotel Check-in",
      ],
      activities: [
        {
          time: "Morning",
          icon: "Coffee",
          text: "Breakfast & Check-out from Ubud hotel",
        },
        {
          time: "Morning",
          icon: "Car",
          text: "Scenic drive to Ungasan, South Bali",
        },
        {
          time: "Afternoon",
          icon: "MapPin",
          text: "GWK Cultural Park — Garuda Wisnu Kencana statue, cultural performances & panoramic views",
        },
        {
          time: "Evening",
          icon: "Hotel",
          text: "Check-in at 5-star luxury hotel in Ungasan",
        },
        {
          time: "Evening",
          icon: "Leaf",
          text: "Relax and enjoy hotel amenities",
        },
        { time: "Night", icon: "Hotel", text: "Overnight Stay — Ungasan" },
      ],
    },
    {
      day: 6,
      title: "Water Sports Adventure + Uluwatu Temple",
      titleHi: "वाटर स्पोर्ट्स + उलुवातू मंदिर",
      highlights: [
        "Jet Ski",
        "Banana Boat",
        "Parasailing",
        "Uluwatu Cliff Temple Sunset",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Car",
          text: "Private transfer to beach for water sports",
        },
        {
          time: "Morning",
          icon: "Waves",
          text: "Jet Ski — Speed across the waves",
        },
        {
          time: "Morning",
          icon: "Waves",
          text: "Banana Boat — Fun ride with family or friends",
        },
        {
          time: "Morning",
          icon: "Zap",
          text: "Parasailing — Breathtaking aerial views of the coastline",
        },
        {
          time: "Afternoon",
          icon: "Leaf",
          text: "Leisure time on the beach",
        },
        {
          time: "Evening",
          icon: "MapPin",
          text: "Uluwatu Cliff Temple — Dramatic cliffside temple, ocean views & photography",
        },
        {
          time: "Evening",
          icon: "Sunset",
          text: "Optional — Watch the mesmerizing sunset over the Indian Ocean",
        },
        { time: "Night", icon: "Hotel", text: "Overnight Stay — Ungasan" },
      ],
    },
    {
      day: 7,
      title: "Departure — Goodbye Bali",
      titleHi: "प्रस्थान — अलविदा बाली",
      highlights: ["Leisure Morning", "Airport Transfer"],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Leaf",
          text: "Free time — Explore, shop or relax until departure",
        },
        {
          time: "Departure",
          icon: "Plane",
          text: "Private transfer to Bali International Airport — End of Services",
        },
      ],
    },
  ],

  importantNotes: [
    "Hotel Check-in: 15:00 | Check-out: 12:00",
    "Meals: Breakfast only included (Lunch & Dinner are on your own)",
    "Guide & Driver Tip: USD 2 per person per day (recommended)",
    "Travel Insurance: Additional charges for travelers aged 59 years and above",
    "Prices are excluding taxes (GST & TCS)",
    "Vehicle operates strictly as per scheduled itinerary",
    "Singapore Airlines fares subject to availability at time of booking",
  ],

  importantNotesHi: [
    "होटल चेक-इन: 15:00 | चेक-आउट: 12:00",
    "भोजन: केवल नाश्ता शामिल (दोपहर और रात का खाना अपने खर्च पर)",
    "गाइड और ड्राइवर टिप: USD 2 प्रति व्यक्ति प्रति दिन (अनुशंसित)",
    "ट्रैवल इंश्योरेंस: 59 वर्ष से अधिक यात्रियों के लिए अतिरिक्त शुल्क",
    "कीमतें टैक्स (जीएसटी और टीसीएस) को छोड़कर हैं",
    "वाहन निर्धारित कार्यक्रम के अनुसार चलेगा",
    "सिंगापुर एयरलाइंस किराया बुकिंग के समय उपलब्धता के अनुसार",
  ],
};
