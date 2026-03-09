# TravelDome

## Current State
- Multi-page tourism website with Home, Packages, Gallery, Blog, Reviews, Contact, Admin Panel
- Reviews page shows all reviews in a 2-column grid
- index.html has no favicon set
- 5 real Google reviews already in sampleData.ts
- TravelDome logo available at /assets/uploads/TravelDome-logo-3--1.png

## Requested Changes (Diff)

### Add
- Favicon link in index.html pointing to TravelDome logo (so Google search results show logo icon in circle)
- Reviews carousel/slider with prev/next navigation arrows and dot indicators

### Modify
- Reviews.tsx: replace static 2-column grid with an auto-playing carousel showing 1 review card at a time (mobile) and 2 at a time (desktop), with left/right arrow buttons and dot pagination
- index.html: add <link rel="icon"> and <link rel="apple-touch-icon"> tags pointing to TravelDome logo

### Remove
- Static grid layout for reviews cards

## Implementation Plan
1. Update index.html to add favicon tags pointing to /assets/uploads/TravelDome-logo-3--1.png
2. Update Reviews.tsx to replace the reviews grid with a carousel:
   - Show 1 card on mobile, 2 cards on desktop
   - Auto-advance every 5 seconds
   - Left/right arrow navigation buttons
   - Dot indicators at bottom
   - Smooth slide animation
   - All 5 reviews shown, no truncation
