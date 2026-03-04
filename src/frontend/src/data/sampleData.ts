import { TourCategory } from "../backend.d";

export const samplePackages = [
  {
    id: "sample-1",
    title: "Golden Triangle India Tour",
    duration: "7 Days / 6 Nights",
    description:
      "Experience the iconic Golden Triangle — Delhi, Agra, and Jaipur. Witness the majestic Taj Mahal at sunrise, explore the historic Red Fort, and marvel at the Pink City's vibrant culture.",
    highlights: [
      "Taj Mahal sunrise visit",
      "Red Fort & Humayun's Tomb, Delhi",
      "Hawa Mahal & Amber Fort, Jaipur",
      "Traditional Rajasthani folk dinner",
      "Guided heritage walks",
      "Comfortable AC transportation",
    ],
    category: TourCategory.domestic,
    price: BigInt(45000),
    image: "/assets/generated/package-india.dim_800x500.jpg",
  },
  {
    id: "sample-2",
    title: "Kerala Backwaters Paradise",
    duration: "5 Days / 4 Nights",
    description:
      "Glide through Kerala's legendary backwaters on a traditional houseboat. Explore lush spice plantations, pristine beaches, and the serene beauty of God's Own Country.",
    highlights: [
      "Private houseboat stay on Alleppey backwaters",
      "Munnar tea garden visit",
      "Kathakali cultural performance",
      "Periyar wildlife sanctuary",
      "Kovalam beach relaxation",
      "Ayurvedic spa treatment",
    ],
    category: TourCategory.domestic,
    price: BigInt(38000),
    image: "/assets/generated/package-kerala.dim_800x500.jpg",
  },
  {
    id: "sample-3",
    title: "Bali Honeymoon Escape",
    duration: "8 Days / 7 Nights",
    description:
      "The ultimate romantic getaway in magical Bali. Luxurious villa stays, private beach dinners, temple blessings, and unforgettable memories with your beloved.",
    highlights: [
      "Private infinity pool villa",
      "Romantic beach dinner",
      "Tanah Lot temple blessing",
      "Ubud rice terrace walk",
      "Couples spa ritual",
      "Private waterfall excursion",
    ],
    category: TourCategory.honeymoon,
    price: BigInt(125000),
    image: "/assets/generated/package-bali.dim_800x500.jpg",
  },
  {
    id: "sample-4",
    title: "European Grand Tour",
    duration: "14 Days / 13 Nights",
    description:
      "An unforgettable journey through Europe's most iconic cities — Paris, Rome, Barcelona, and Amsterdam. Art, history, cuisine, and culture await you.",
    highlights: [
      "Eiffel Tower & Louvre Museum, Paris",
      "Colosseum & Vatican City, Rome",
      "Sagrada Familia, Barcelona",
      "Anne Frank House, Amsterdam",
      "Rhine Valley cruise",
      "Premium 4-star hotel stays",
    ],
    category: TourCategory.international,
    price: BigInt(220000),
    image: "/assets/generated/package-europe.dim_800x500.jpg",
  },
  {
    id: "sample-5",
    title: "Maldives Honeymoon Bliss",
    duration: "6 Days / 5 Nights",
    description:
      "Paradise found in the crystal-clear waters of the Maldives. Overwater bungalows, pristine coral reefs, and endless romance in the most beautiful archipelago on Earth.",
    highlights: [
      "Overwater bungalow with glass floor",
      "Private sunset cruise",
      "Snorkeling & scuba diving",
      "Couples underwater dining experience",
      "Island hopping tour",
      "Dolphin watching at dusk",
    ],
    category: TourCategory.honeymoon,
    price: BigInt(180000),
    image: "/assets/generated/package-maldives.dim_800x500.jpg",
  },
];

export const sampleBlogPosts = [
  {
    id: "blog-1",
    title: "10 Essential Travel Tips for First-Time India Visitors",
    content: `India is a land of breathtaking contrasts — ancient temples standing beside modern cities, vibrant bazaars next to serene palaces, and flavors that dance between fiery and delicate. If you're planning your first visit, here are 10 essential tips that will transform your experience.

**1. Embrace the chaos with an open mind**
India's cities can feel overwhelming at first. The traffic, the sounds, the smells — it's all intensely alive. Accept that plans will change and go with the flow.

**2. Stay hydrated and eat mindfully**
Stick to bottled water and be cautious with street food initially. Once your stomach acclimatizes, you can explore more boldly.

**3. Dress respectfully at religious sites**
Cover your shoulders and knees when visiting temples, mosques, and historical sites. Many places provide wraps at the entrance.

**4. Learn a few words of Hindi**
"Namaste" (hello), "Shukriya" (thank you), and "Kitna?" (how much?) go a long way in creating warm connections.

**5. Bargain thoughtfully**
Bargaining is expected in markets, but do so with a smile and respect. A fair deal leaves everyone happy.

**6. Book trains in advance**
India's railway network is magnificent but extremely popular. Book your tickets at least 2 weeks ahead using the IRCTC app.

**7. Experience a sunrise at the Taj Mahal**
This is non-negotiable. The pink-gold light on white marble at dawn is one of the most transcendent sights on Earth.

**8. Try regional cuisines**
Don't just eat the dishes you know. Rajasthani dal baati, Kerala fish curry, Bengali sweets — each region is a culinary universe.

**9. Carry small change**
Auto-rickshaw drivers, local vendors, and guides often can't break large bills. Keep small denomination notes handy.

**10. Slow down**
The biggest mistake is trying to see too much. Choose fewer destinations and go deeper. India rewards those who linger.`,
    date: BigInt(1704067200000),
    published: true,
    author: "Rahul Sharma",
    category: "Travel Tips",
    coverImage: "/assets/generated/blog-india-tips.dim_800x450.jpg",
  },
  {
    id: "blog-2",
    title: "Planning the Perfect Honeymoon in the Maldives",
    content: `The Maldives is synonymous with romantic perfection — and for good reason. This Indian Ocean paradise offers overwater bungalows, technicolor coral reefs, and sunsets that seem almost impossible. Here's how to plan the ultimate honeymoon.

**Choosing Your Resort**
The Maldives is organized around atolls, each with multiple private island resorts. Budget and luxury resorts are both available, but even mid-range options here feel extraordinary. Consider North Malé Atoll for shorter transfers, or South Ari Atoll for exceptional diving.

**Best Time to Visit**
November to April is the dry season — sunny skies, calm seas, and excellent visibility for snorkeling. May to October brings some rain but also fewer crowds and better prices.

**What to Book in Advance**
- Overwater villa or water bungalow (book 3-6 months ahead)
- Underwater restaurant dinner (extremely limited seats)
- Sunset dolphin cruise
- Private sandbank picnic

**Must-Have Experiences**
- Bioluminescent beach at night — the plankton creates a magical blue glow in the water
- Reef snorkeling with manta rays and sea turtles
- Couples spa treatment in an overwater pavilion
- Stargazing from your villa deck

**Packing Essentials**
Reef-safe sunscreen is mandatory (regular sunscreen harms coral). Pack light, breathable clothing, water shoes, and a waterproof camera.

**A Word on Budgeting**
The Maldives reputation for expense is well-earned. Factor in the seaplane transfers (often $300-500 per person), all-inclusive packages usually save money compared to à la carte dining.`,
    date: BigInt(1706745600000),
    published: true,
    author: "Priya Nair",
    category: "Honeymoon Guide",
    coverImage: "/assets/generated/blog-honeymoon.dim_800x450.jpg",
  },
  {
    id: "blog-3",
    title: "A Complete Guide to Exploring Europe in Two Weeks",
    content: `Two weeks in Europe sounds ambitious — and it is. But with careful planning, you can experience the best of the continent's crown jewels without feeling rushed. Here's our ultimate 14-day Europe itinerary.

**Days 1-4: Paris, France**
Start in the City of Light. Must-sees: Eiffel Tower (book tickets online!), the Louvre (focus on one wing), Notre-Dame restoration, and the Musée d'Orsay. Spend an evening in Le Marais for dinner and nightlife. Day trip to Versailles on day 3.

**Days 5-7: Barcelona, Spain**
Take the high-speed AVE train from Paris (6.5 hours). Barcelona rewards wanderers — the Gothic Quarter, La Boqueria market, and Gaudí's masterpieces (Sagrada Família, Park Güell). End evenings with tapas in Barceloneta.

**Days 8-11: Rome & Florence, Italy**
Fly to Rome. Three days is barely enough — the Colosseum, Vatican Museums, Sistine Chapel, and Trevi Fountain are all essential. Train to Florence for a day: the Uffizi Gallery and Brunelleschi's Dome.

**Days 12-14: Amsterdam, Netherlands**
Fly to Amsterdam. The Anne Frank House is profoundly moving (book months ahead). Rent bikes to explore like a local. The Rijksmuseum and Van Gogh Museum are world-class.

**Practical Tips**
- Book city passes for free museum entry and public transport
- Validate train tickets before boarding in Italy (fine-worthy if you forget)
- Most restaurants don't open for dinner until 7:30-8 PM in Spain
- In Paris, a simple "bonjour" before any question goes a long way`,
    date: BigInt(1709251200000),
    published: true,
    author: "Amit Verma",
    category: "Destination Guide",
    coverImage: "/assets/generated/blog-europe.dim_800x450.jpg",
  },
];

export const sampleReviews = [
  {
    id: "review-1",
    name: "Sunita Mehta",
    reviewText:
      "TravelDome made our Maldives honeymoon absolutely magical. Every detail was perfect — from the overwater villa to the private beach dinner. Highly recommend their honeymoon packages!",
    approved: true,
    timestamp: BigInt(1709251200000),
    rating: BigInt(5),
  },
  {
    id: "review-2",
    name: "Rajan Krishnamurthy",
    reviewText:
      "Booked the Golden Triangle tour for my parents' 30th anniversary. The guide was knowledgeable, the hotels were excellent, and the Taj Mahal sunrise experience left everyone in tears. Thank you TravelDome!",
    approved: true,
    timestamp: BigInt(1706745600000),
    rating: BigInt(5),
  },
  {
    id: "review-3",
    name: "Pooja & Vikram Gupta",
    reviewText:
      "Our European tour exceeded every expectation. The itinerary was perfectly balanced between famous sights and hidden gems. The 24/7 support was incredible when our flight got delayed.",
    approved: true,
    timestamp: BigInt(1704153600000),
    rating: BigInt(5),
  },
  {
    id: "review-4",
    name: "Arjun Dasgupta",
    reviewText:
      "Kerala backwaters trip was a dream. The houseboat was spotlessly clean, food was authentic and delicious. TravelDome's attention to detail truly sets them apart. Already planning our next trip!",
    approved: true,
    timestamp: BigInt(1701561600000),
    rating: BigInt(4),
  },
];

export const sampleGallery = [
  {
    id: "gallery-1",
    title: "Taj Mahal at Sunrise",
    description: "The iconic Taj Mahal bathed in golden morning light",
    image: "/assets/generated/package-india.dim_800x500.jpg",
  },
  {
    id: "gallery-2",
    title: "Kerala Backwaters",
    description: "Serene houseboat journey through Kerala's backwaters",
    image: "/assets/generated/package-kerala.dim_800x500.jpg",
  },
  {
    id: "gallery-3",
    title: "Maldives Paradise",
    description: "Crystal clear waters and overwater villas",
    image: "/assets/generated/package-maldives.dim_800x500.jpg",
  },
  {
    id: "gallery-4",
    title: "Bali Rice Terraces",
    description: "Lush green rice terraces of Ubud, Bali",
    image: "/assets/generated/package-bali.dim_800x500.jpg",
  },
  {
    id: "gallery-5",
    title: "European Charm",
    description: "Colorful streets and iconic landmarks of Europe",
    image: "/assets/generated/package-europe.dim_800x500.jpg",
  },
  {
    id: "gallery-6",
    title: "TravelDome Adventures",
    description: "Exploring the world's most beautiful destinations",
    image: "/assets/generated/hero-traveldome.dim_1600x700.jpg",
  },
];
