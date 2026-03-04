# TravelDome

## Current State
- 2 packages exist: Baku Unveiled (fixed group dates) and Bali Bliss (flexible)
- Hero section shows a single static Baku background image with CTA buttons
- Home page has a Featured Package card showing Baku
- PDF itinerary download shows text-only "TravelDome" header, no logo or address
- Footer has placeholder address "New Delhi, India" and generic social links (no real Instagram/WhatsApp)
- Reviews page uses internal backend reviews only
- Hotel names mentioned in Bali package data and in Bali inclusions tab
- Emoji used throughout in badges, section headers, and PDF
- No Dubai, Kashmir, or Sikkim-Darjeeling packages

## Requested Changes (Diff)

### Add
- **Dubai Premium package** (5D/4N, INR 29,500/person, flexible dates): Full 5-day itinerary, inclusions, exclusions, pricing table
- **Kashmir Winter Wonders package** (8D/7N, INR 29,800/person, flexible dates): Jammu to Pahalgam full itinerary, MAP meal plan, important notes
- **Sikkim-Darjeeling Escape package** (6D/5N, INR 58,500 total for 2 adults, flexible dates, no specific dates shown): Full 6-day itinerary
- Hero section: Full-screen destination carousel replacing the static background. Each slide = one destination. Slide shows "Explore Dubai", "Explore Bali", "Explore Kashmir", etc. Clicking the label or CTA opens that package detail page. Auto-advances every 5 seconds, manual dot/arrow navigation.
- PDF itinerary: Company logo image + full company address (Saropi Saraswati, CHS LTD, 002, Ghazala Road, Pleasant Park, Mira Road East, Mira Bhayandar, Maharashtra 401107) in header
- WhatsApp link in footer and navbar using wa.me format for real number
- Instagram link in footer pointing to https://www.instagram.com/traveldome._/
- Google Reviews live link section in Reviews page: prominent banner/CTA "See Our Google Reviews" opening the real Google Reviews URL in new tab

### Modify
- **Bali package**: Remove all hotel names from hotelHighlights array and from inclusions tab display. Replace with "Premium 4-star and 5-star hotels" category descriptions only.
- **Footer**: Replace placeholder address with real address. Update Instagram link. Add WhatsApp icon linking to wa.me number.
- **Home hero**: Replace static image with destination carousel (see above)
- **Home "Featured Package" section**: Remove the single Baku featured card. Replace with a compact "Our Destinations" row showing destination tiles that link to /packages
- **Packages page hero banner**: Update to use a generic packages hero image instead of Bali image
- **PDF download header**: Add logo image and company address
- **All emoji removal**: Strip all emoji from badges, section headers, card labels, button text, PDF HTML throughout the entire codebase. Replace with text-only or icon-only alternatives.
- **Kashmir/Sikkim/Dubai on PackageDetail**: Flexible dates section (no fixed departure chips), plain text input for preferred date in booking form
- **CTA section on Home**: Update from "Ready to Explore Baku?" to generic "Start Your Journey" messaging

### Remove
- Hotel names from Bali hotelHighlights (the feature section that lists specific hotel names)
- "More destinations coming soon" teaser section at bottom of Packages page (replace with clean end)
- Static Baku-only hero background on Home page

## Implementation Plan

1. **Data files**: Create dubaiPackage.ts, kashmirPackage.ts, sikkimPackage.ts following existing package data structure. All with empty departureDates (flexible). No hotel names anywhere.
2. **Modify baliPackage.ts**: Remove specific hotel names from hotelHighlights; replace with generic category descriptions.
3. **Hero carousel component**: Create DestinationCarousel component. Uses all 5 packages as slides. Each slide: full-bleed background image, dark overlay, "Explore [Destination]" heading, destination name, CTA button linking to package detail page. Auto-play + dots + prev/next arrows.
4. **Home.tsx**: Replace hero section with DestinationCarousel. Replace "Featured Package" section with compact "Our Destinations" grid (5 tiles, each clickable to respective package).
5. **Packages.tsx**: Add 3 new package cards (Dubai, Kashmir, Sikkim) following same card pattern. Remove "More destinations coming soon" block.
6. **PackageDetail.tsx**: Register 3 new packages in the packages registry. Update printItinerary() to include logo img tag and company address in PDF header. Remove all emoji from PDF HTML.
7. **Footer.tsx**: Update address to real company address. Update Instagram href. Add WhatsApp social icon linking to wa.me.
8. **Reviews.tsx**: Add prominent Google Reviews banner/CTA above review form with real Google Reviews link.
9. **Global emoji sweep**: Remove all emoji characters from all TSX/TS files — badges, labels, section text, PDF HTML. Use lucide icons or plain text instead.
10. **SEO**: Each new package detail page sets its own document.title. Packages page meta description updated.
