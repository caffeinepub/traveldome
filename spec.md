# TravelDome

## Current State
The website has a Gallery page (/gallery) that shows photos from the backend. AdminGallery allows admin to upload photos via blob-storage. There is no video support in the gallery.

## Requested Changes (Diff)

### Add
- GalleryVideo type in backend with fields: id, title, description, youtubeUrl
- Backend functions: addGalleryVideo, deleteGalleryVideo, getAllGalleryVideos
- Gallery page: separate "Photos" section (masonry grid) and "Videos" section (YouTube embed grid)
- AdminGallery: tab/toggle to switch between Photos and Videos management; form to add YouTube video link with title and description

### Modify
- Gallery.tsx: split into Photos grid + Videos grid sections, YouTube videos shown as embedded iframes
- AdminGallery.tsx: add Videos tab with YouTube link form and video management

### Remove
- Nothing

## Implementation Plan
1. Update backend main.mo to add GalleryVideo type and CRUD functions
2. Regenerate backend.d.ts
3. Update Gallery.tsx to show photos in masonry grid + YouTube videos in card grid
4. Update AdminGallery.tsx to support both photo upload and YouTube video link addition
5. Update useQueries.ts hooks for gallery videos
