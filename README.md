# Drip Room — Project 3, Task 3 started

Initial React/SASS implementation based on the submitted Drip Room proposal and three core screens: Home, My Wardrobe, and Outfit Builder.

## Current milestone

- Responsive SPA routes for the three screens.
- Wardrobe form with required name, category, and colour; category filter and removal.
- Outfit builder selects a top, bottom, and shoes and saves a named combination.
- Local browser storage preserves prototype items/outfits after reload. Starter pieces use colour swatches, not uploaded photos.

This is the lab's **start of Task 3**, not the final Project 3 delivery. No login or cloud account is simulated.

## Run

```sh
cd client
npm ci
PORT=3002 npm start
```

Open http://localhost:3002. Production build: `npm run build`.

## Next milestones required before final submission

1. Express/MongoDB/Mongoose API, per-user ownership, and form validation on the server.
2. Signup, login, logout, password hashing, authorization, sessions, and cookies.
3. Clothing image handling and complete saved-outfit editing.
4. Installable PWA, HTTPS hosting, and live server URL.
5. Full security, accessibility, mobile, and end-to-end checks; publish final repository and site links.

The lab Book List app is a separate project. Project 3 proposal/specifications remain in the parent folder.
