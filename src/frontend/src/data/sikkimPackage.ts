export const SIKKIM_PACKAGE_SLUG = "sikkim-darjeeling-escape";

export const sikkimPackage = {
  id: SIKKIM_PACKAGE_SLUG,
  slug: SIKKIM_PACKAGE_SLUG,
  name: "Sikkim-Darjeeling Escape",
  nameHi: "सिक्किम-दार्जीलिंग एस्केप",
  tagline:
    "6 Days Through the Himalayan Kingdom — Gangtok, Tsomgo Lake, Tiger Hill",
  taglineHi: "6 दिन हिमालयी राज्य में — गैंगटोक, त्सोमगो झील, टाइगर हिल",
  duration: "6 Days / 5 Nights",
  durationHi: "6 दिन / 5 रातें",
  destination: "Sikkim and Darjeeling, India",
  category: "Domestic",
  heroImage: "/assets/generated/sikkim-hero.dim_1400x700.jpg",
  rating: 4.8,
  startingPrice: 29250,
  departureDates: [] as { month: string; monthHi: string; dates: number[] }[],
  pricing: [
    {
      label: "Per Person (Double Sharing)",
      labelHi: "प्रति व्यक्ति (डबल शेयरिंग)",
      price: 29250,
    },
  ],
  inclusions: [
    {
      icon: "BedDouble",
      label: "5N Accommodation",
      labelHi: "5 रात आवास",
      desc: "Premium hotels in Gangtok and Darjeeling on twin/double sharing basis",
    },
    {
      icon: "UtensilsCrossed",
      label: "Dinner and Breakfast",
      labelHi: "रात का खाना और नाश्ता",
      desc: "Daily dinner and breakfast throughout the trip",
    },
    {
      icon: "Car",
      label: "Exclusive Vehicle",
      labelHi: "एक्सक्लूसिव व्हीकल",
      desc: "Wagon R or similar for all transfers and sightseeing (point-to-point)",
    },
    {
      icon: "Map",
      label: "All Sightseeing",
      labelHi: "सभी दर्शनीय यात्राएं",
      desc: "Gangtok city tour, Tsomgo Lake, Baba Mandir, Darjeeling city tour, Tiger Hill",
    },
    {
      icon: "FileText",
      label: "Permits and Taxes",
      labelHi: "परमिट और टैक्स",
      desc: "All permit fees and hotel taxes included",
    },
    {
      icon: "Ticket",
      label: "Indian Nationals Only",
      labelHi: "केवल भारतीय नागरिकों के लिए",
      desc: "Package rates applicable for Indian nationals only",
    },
  ],
  exclusions: [
    "Airfare and train fare",
    "Personal expenses (laundry, tips, drinks)",
    "Additional sightseeing or vehicle usage beyond itinerary",
    "Entrance fees and guide charges",
    "Costs due to natural calamities or political disturbances",
    "Increase in taxes or fuel prices",
    "Room heater and insurance",
    "GST (extra as applicable)",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival — Transfer to Gangtok",
      titleHi: "आगमन — गैंगटोक ट्रांसफर",
      highlights: [
        "IXB Airport / NJP Station Pickup",
        "Gangtok Hotel Check-in",
      ],
      activities: [
        {
          time: "Arrival",
          icon: "Car",
          text: "Pickup from IXB Airport or NJP Railway Station — Meet your representative",
        },
        {
          time: "Transfer",
          icon: "Car",
          text: "Transfer to Gangtok — Approx 125 km, 5 hours scenic drive",
        },
        {
          time: "Afternoon",
          icon: "Hotel",
          text: "Check-in to hotel in Gangtok",
        },
        { time: "Dinner", icon: "UtensilsCrossed", text: "Dinner at hotel" },
        { time: "Night", icon: "Hotel", text: "Overnight stay — Gangtok" },
      ],
    },
    {
      day: 2,
      title: "Full-Day Gangtok Sightseeing",
      titleHi: "गैंगटोक का पूर्ण दिवस दर्शन",
      highlights: [
        "Tashi Viewpoint",
        "Ganesh Tok",
        "Hanuman Tok",
        "Enchey Monastery",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at hotel" },
        {
          time: "Morning",
          icon: "MapPin",
          text: "Tashi Viewpoint — Panoramic views of the Himalayas and Kanchenjunga",
        },
        {
          time: "Morning",
          icon: "MapPin",
          text: "Ganesh Tok and Hanuman Tok — Sacred hilltop temples",
        },
        {
          time: "Afternoon",
          icon: "MapPin",
          text: "Enchey Monastery, Namgyal Institute of Tibetology and Flower Show",
        },
        {
          time: "Evening",
          icon: "MapPin",
          text: "MG Road — Explore Gangtok's vibrant heart",
        },
        { time: "Dinner", icon: "UtensilsCrossed", text: "Dinner at hotel" },
        { time: "Night", icon: "Hotel", text: "Overnight stay — Gangtok" },
      ],
    },
    {
      day: 3,
      title: "Tsomgo Lake and Baba Mandir Excursion",
      titleHi: "त्सोमगो झील और बाबा मंदिर भ्रमण",
      highlights: [
        "Tsomgo Lake",
        "Baba Harbhajan Singh Mandir",
        "Optional Nathu La Pass",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at hotel" },
        {
          time: "Morning",
          icon: "Car",
          text: "Drive to Tsomgo Lake — Sacred glacial lake at high altitude",
        },
        {
          time: "Afternoon",
          icon: "MapPin",
          text: "Baba Harbhajan Singh Mandir — Revered memorial shrine",
        },
        {
          time: "Afternoon",
          icon: "MountainSnow",
          text: "Optional: Nathu La Pass visit (extra charges apply)",
        },
        { time: "Evening", icon: "Car", text: "Return to Gangtok" },
        { time: "Dinner", icon: "UtensilsCrossed", text: "Dinner at hotel" },
        { time: "Night", icon: "Hotel", text: "Overnight stay — Gangtok" },
      ],
    },
    {
      day: 4,
      title: "Gangtok to Darjeeling Transfer",
      titleHi: "गैंगटोक से दार्जीलिंग ट्रांसफर",
      highlights: [
        "Scenic Mountain Drive",
        "Darjeeling Arrival",
        "Leisure Evening",
      ],
      activities: [
        {
          time: "Morning",
          icon: "Coffee",
          text: "Breakfast and check-out from Gangtok hotel",
        },
        {
          time: "Morning",
          icon: "Car",
          text: "Transfer to Darjeeling — Approx 110 km, 4 hours scenic drive through tea gardens",
        },
        {
          time: "Afternoon",
          icon: "Hotel",
          text: "Check-in to hotel in Darjeeling",
        },
        {
          time: "Afternoon",
          icon: "Leaf",
          text: "Rest of the day at leisure — Explore Mall Road or relax",
        },
        { time: "Dinner", icon: "UtensilsCrossed", text: "Dinner at hotel" },
        { time: "Night", icon: "Hotel", text: "Overnight stay — Darjeeling" },
      ],
    },
    {
      day: 5,
      title: "Full-Day Darjeeling Sightseeing",
      titleHi: "दार्जीलिंग का पूर्ण दिवस दर्शन",
      highlights: [
        "Tiger Hill Sunrise",
        "Ghoom Monastery",
        "Batasia Loop",
        "Tea Garden",
      ],
      activities: [
        {
          time: "Early Morning",
          icon: "Car",
          text: "Early morning drive to Tiger Hill — Famous sunrise viewing point",
        },
        {
          time: "Morning",
          icon: "MapPin",
          text: "Ghoom Monastery — One of the highest railway stations in the world",
        },
        {
          time: "Morning",
          icon: "MapPin",
          text: "Batasia Loop — Beautiful curved railway track with war memorial",
        },
        {
          time: "Afternoon",
          icon: "MapPin",
          text: "Himalayan Mountaineering Institute and Padmaja Naidu Zoo",
        },
        {
          time: "Afternoon",
          icon: "TreePine",
          text: "Tea Garden visit — Experience the famous Darjeeling tea estates",
        },
        { time: "Dinner", icon: "UtensilsCrossed", text: "Dinner at hotel" },
        { time: "Night", icon: "Hotel", text: "Overnight stay — Darjeeling" },
      ],
    },
    {
      day: 6,
      title: "Departure from Darjeeling",
      titleHi: "दार्जीलिंग से प्रस्थान",
      highlights: ["Final Breakfast", "Return Transfer"],
      activities: [
        {
          time: "Morning",
          icon: "Coffee",
          text: "Breakfast at hotel and check-out",
        },
        {
          time: "Morning",
          icon: "Car",
          text: "Transfer to IXB Airport or NJP Railway Station — Approx 70 km, 3 hours",
        },
        {
          time: "Departure",
          icon: "Plane",
          text: "Tour concludes — Carry cherished memories of the Himalayas",
        },
      ],
    },
  ],
  importantNotes: [
    "Package rates are for Indian nationals only",
    "Nathu La Pass visit requires special permit and is not included — payable separately",
    "Weather conditions may affect sightseeing, especially at high-altitude locations",
    "Tiger Hill visit is subject to weather — visibility not guaranteed",
    "All meals at the hotel are as specified in the itinerary",
    "Vehicle operates on a point-to-point basis per the itinerary",
    "Prices are per person on double sharing basis excluding GST",
  ],
  importantNotesHi: [
    "पैकेज दरें केवल भारतीय नागरिकों के लिए हैं",
    "नाथु ला पास के लिए विशेष परमिट की आवश्यकता है — अतिरिक्त शुल्क पर",
    "मौसम की स्थिति दर्शनीय स्थलों को प्रभावित कर सकती है",
    "टाइगर हिल दर्शन मौसम के अधीन है",
    "सभी भोजन होटल में निर्दिष्ट अनुसार",
    "वाहन इटिनरेरी के अनुसार पॉइंट-टू-पॉइंट आधार पर चलेगा",
    "कीमतें डबल शेयरिंग आधार पर जीएसटी को छोड़कर प्रति व्यक्ति हैं",
  ],
};
