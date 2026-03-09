/**
 * Baku Package — hardcoded frontend data
 * Do NOT fetch from backend; this is the single featured package.
 */

export const BAKU_PACKAGE_SLUG = "baku-unveiled";

export const bakuPackage = {
  id: BAKU_PACKAGE_SLUG,
  slug: BAKU_PACKAGE_SLUG,
  name: "Baku Unveiled",
  nameHi: "बाकू — एक अद्भुत यात्रा",
  tagline:
    "Azerbaijan's Crown Jewel Awaits — An Unforgettable Indian-Friendly Journey",
  taglineHi: "अज़रबैजान का ताज — एक अविस्मरणीय भारतीय-अनुकूल यात्रा",
  duration: "5 Days / 4 Nights",
  durationHi: "5 दिन / 4 रातें",
  destination: "Baku, Azerbaijan",
  category: "International",
  heroImage: "/assets/generated/baku-hero.dim_1400x700.jpg",
  rating: 4.9,
  startingPrice: 45999,

  pricing: [
    { label: "Single", labelHi: "सिंगल", price: 59999 },
    { label: "Double & Triple", labelHi: "डबल & ट्रिपल", price: 45999 },
    {
      label: "Child with Bed (5–11 yr)",
      labelHi: "बच्चा बिस्तर के साथ (5–11 वर्ष)",
      price: 22500,
    },
  ],

  departureDates: [
    { month: "March", monthHi: "मार्च", dates: [25] },
    { month: "April", monthHi: "अप्रैल", dates: [2, 12, 22] },
    { month: "May", monthHi: "मई", dates: [4, 18] },
    { month: "June", monthHi: "जून", dates: [3] },
  ],

  inclusions: [
    {
      icon: "BedDouble",
      label: "4N Hotel + Breakfast",
      labelHi: "4 रात होटल + नाश्ता",
      desc: "4 Nights Accommodation in Baku hotel with breakfast",
    },
    {
      icon: "UtensilsCrossed",
      label: "9 Indian Meals",
      labelHi: "9 भारतीय भोजन",
      desc: "5 Indian Lunches & 4 Indian Dinners",
    },
    {
      icon: "Car",
      label: "All Transfers",
      labelHi: "सभी ट्रांसफर",
      desc: "All transfers & English-speaking driver guide",
    },
    {
      icon: "Ticket",
      label: "Entry Tickets",
      labelHi: "प्रवेश टिकट",
      desc: "Funicular, Cable Car, Roller Coaster, Fire Temple, Burning Mountain, Gobustan, Mud Volcanoes",
    },
    {
      icon: "Droplets",
      label: "2 Bottles/Day",
      labelHi: "2 बोतल/दिन",
      desc: "2 Bottles of water per person per day (0.5L)",
    },
    {
      icon: "FileText",
      label: "Visa Assistance",
      labelHi: "वीज़ा सहायता",
      desc: "Standard Visa (5 working days processing)",
    },
    {
      icon: "Map",
      label: "4 Sightseeing Tours",
      labelHi: "4 दर्शनीय यात्राएं",
      desc: "Baku, Absheron, Gobustan & Shahdag tours",
    },
  ],

  exclusions: [
    "International Flight",
    "Porter Services",
    "Hard Drinks",
    "Hotel Additional Services & Penalties",
    "Any Additional Person Joining at Destination",
    "GST & TCS",
  ],

  exclusionsHi: [
    "अंतर्राष्ट्रीय उड़ान",
    "पोर्टर सेवाएं",
    "हार्ड ड्रिंक्स",
    "होटल अतिरिक्त सेवाएं और जुर्माना",
    "गंतव्य पर शामिल होने वाला कोई अतिरिक्त व्यक्ति",
    "जीएसटी और टीसीएस",
  ],

  itinerary: [
    {
      day: 1,
      title: "Welcome to Baku | Panoramic Evening Tour",
      titleHi: "बाकू में स्वागत | पैनोरामिक शाम का दौरा",
      highlights: [
        "Highland Park",
        "Alley of Martyrs",
        "Baku Funicular",
        "Flame Towers",
      ],
      activities: [
        {
          time: "Arrival",
          icon: "Plane",
          text: "Arrival at Baku International Airport",
        },
        { time: "Transfer", icon: "Car", text: "Airport Transfer to Hotel" },
        {
          time: "Lunch",
          icon: "UtensilsCrossed",
          text: "Lunch at Indian Restaurant",
        },
        {
          time: "Evening",
          icon: "Sunset",
          text: "Highland Park – Panoramic views of Baku city & Caspian Sea",
        },
        {
          time: "Evening",
          icon: "MapPin",
          text: "Alley of Martyrs – Solemn memorial complex",
        },
        {
          time: "Evening",
          icon: "Ticket",
          text: "Baku Funicular – Ride with cityscape views (Entrance included)",
        },
        {
          time: "Evening",
          icon: "Building",
          text: "Milli Majlis – National Assembly building",
        },
        {
          time: "Evening",
          icon: "Flame",
          text: "Flame Towers – Iconic modern skyscrapers",
        },
        {
          time: "Dinner",
          icon: "UtensilsCrossed",
          text: "Dinner at Indian Restaurant",
        },
        { time: "Night", icon: "Hotel", text: "Return to Hotel" },
      ],
    },
    {
      day: 2,
      title: "Baku City Tour",
      titleHi: "बाकू शहर का दौरा",
      highlights: [
        "Old City (UNESCO)",
        "Palace of Shirvanshahs",
        "Maiden Tower",
        "Baku Boulevard",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "MapPin",
          text: "Icherisheher (Old City) – UNESCO World Heritage Site",
        },
        {
          time: "Morning",
          icon: "Castle",
          text: "Palace of the Shirvanshahs – Ancient historic palace",
        },
        {
          time: "Morning",
          icon: "Tower",
          text: "Maiden Tower – Legendary historic structure",
        },
        {
          time: "Lunch",
          icon: "UtensilsCrossed",
          text: "Lunch at Indian Restaurant",
        },
        {
          time: "Afternoon",
          icon: "Camera",
          text: "Heydar Aliyev Center – Photo stop at architectural masterpiece",
        },
        {
          time: "Afternoon",
          icon: "Heart",
          text: '"I Love Baku" – Iconic photo spot',
        },
        {
          time: "Evening",
          icon: "Waves",
          text: "Baku Boulevard – Evening walk along Caspian Sea promenade",
        },
        {
          time: "Dinner",
          icon: "UtensilsCrossed",
          text: "Dinner at Indian Restaurant",
        },
        { time: "Night", icon: "Hotel", text: "Return to Hotel" },
      ],
    },
    {
      day: 3,
      title: "Shahdag Tour (Gusar Region)",
      titleHi: "शाहदाग दौरा (गुसार क्षेत्र)",
      highlights: [
        "Shahdag Cable Car",
        "Shahdag Roller Coaster",
        "Mountain Resort",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Car",
          text: "Scenic 3-hour drive to Shahdag Mountain Resort",
        },
        {
          time: "Lunch",
          icon: "UtensilsCrossed",
          text: "Lunch at Indian Restaurant",
        },
        {
          time: "Afternoon",
          icon: "MountainSnow",
          text: "Shahdag Cable Car – Breathtaking mountain views (1 line included)",
        },
        {
          time: "Afternoon",
          icon: "Zap",
          text: "Shahdag Roller Coaster – Thrilling mountain scenery ride (included)",
        },
        {
          time: "Afternoon",
          icon: "TreePine",
          text: "Leisure time at resort complex – fresh mountain air",
        },
        { time: "Evening", icon: "Car", text: "Return to Baku" },
        {
          time: "Dinner",
          icon: "UtensilsCrossed",
          text: "Dinner at Indian Restaurant",
        },
        { time: "Night", icon: "Hotel", text: "Overnight at Hotel" },
      ],
    },
    {
      day: 4,
      title: "Absheron & Gobustan Tour",
      titleHi: "अब्शेरोन और गोबुस्तान दौरा",
      highlights: [
        "Fire Temple (Ateshgah)",
        "Burning Mountain",
        "Gobustan UNESCO Site",
        "Mud Volcanoes",
      ],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        {
          time: "Morning",
          icon: "Flame",
          text: "Ateshgah Fire Temple – Ancient Hindu & Zoroastrian site (entrance included)",
        },
        {
          time: "Morning",
          icon: "Flame",
          text: "Yanar Dag – Famous Burning Mountain (entrance included)",
        },
        {
          time: "Lunch",
          icon: "UtensilsCrossed",
          text: "Lunch at Indian Restaurant",
        },
        {
          time: "Afternoon",
          icon: "Map",
          text: "Gobustan Rock Art – UNESCO site with ancient petroglyphs (included)",
        },
        {
          time: "Afternoon",
          icon: "Car",
          text: "Mud Volcanoes Tour – Unique mud volcanoes with Lada taxi adventure",
        },
        {
          time: "Dinner",
          icon: "UtensilsCrossed",
          text: "Dinner at Indian Restaurant",
        },
        { time: "Night", icon: "Hotel", text: "Return to Hotel" },
      ],
    },
    {
      day: 5,
      title: "Departure",
      titleHi: "प्रस्थान",
      highlights: ["Ganjlik Mall Shopping", "Airport Transfer"],
      activities: [
        { time: "Morning", icon: "Coffee", text: "Breakfast at Hotel" },
        { time: "Morning", icon: "LogOut", text: "Hotel Check-out" },
        {
          time: "Morning",
          icon: "ShoppingBag",
          text: "Ganjlik Mall – Largest shopping mall in Baku",
        },
        {
          time: "Lunch",
          icon: "UtensilsCrossed",
          text: "Final Lunch at Indian Restaurant",
        },
        {
          time: "Departure",
          icon: "Plane",
          text: "Transfer to Airport – Bon Voyage!",
        },
      ],
    },
  ],

  importantNotes: [
    "Hotel Check-in: 15:00 | Check-out: 12:00",
    "Meal duration: 1 hour (lunch/dinner)",
    "Outside liquor not allowed (corkage charge USD 20–30 per bottle)",
    "Booking Confirmation: INR 10,000 per person (Non-Refundable)",
    "Vehicle will operate strictly as per schedule",
    "Group must follow reporting time for tours & dinners",
  ],

  importantNotesHi: [
    "होटल चेक-इन: 15:00 | चेक-आउट: 12:00",
    "भोजन की अवधि: 1 घंटा (दोपहर/रात का खाना)",
    "बाहरी शराब की अनुमति नहीं (कॉर्केज शुल्क USD 20–30 प्रति बोतल)",
    "बुकिंग पुष्टि: INR 10,000 प्रति व्यक्ति (वापसी योग्य नहीं)",
    "वाहन कड़ाई से कार्यक्रम के अनुसार चलेगा",
    "समूह को दौरों और डिनर के लिए रिपोर्टिंग समय का पालन करना होगा",
  ],
};

export const WHATSAPP_NUMBER = "918879809915";
export const WHATSAPP_NUMBER_2 = "919922917255";
