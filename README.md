# BEI — Black Entrepreneurs International

Editorial, art-directed front-end for a directory of Black owned businesses.

**Deliverables:** `assets/css/bei.css`, `assets/js/bei.js`, 31 HTML pages, local image assets, a WordPress plugin scaffold, and the source inventory.

---

## 1. What is here

| Path | Purpose |
|------|---------|
| `index.html` | Homepage — hero, community, who we are, featured categories, directory preview, testimonials, membership pricing, trade catalogue, FAQs, latest events, CTA |
| `about.html` | About BEI — mission, goals, what we do, benefits, team, FAQs |
| `membership.html` | Membership plans (pricing concept) + 10 member FAQs |
| `all-businesses.html` | Directory with location/category/radius filters, list/grid/map views, 12 listings, pagination |
| `search-businesses.html` | Search-focused directory view |
| `directory.html` | Business detail (Rulrr.com — real source data) |
| `events.html` | Events + working process |
| `trade-catalogue.html` | BEI AMPLIFIER — 6 editions |
| `catalogue-edition.html` | Edition detail (query-driven) |
| `contact.html` | Contact details + form + imagery |
| `sign-in.html` | Login / Register / Recover |
| `faqs.html` | 10 member FAQs + legacy source questions |
| `privacy-policy.html`, `terms-and-conditions.html`, `disclaimer.html` | Legal pages, source content preserved |
| `blog.html`, `blog/birmingham-black-business-show-2025.html` | Journal + article |
| `single-category.html`, `all-categories.html`, `single-location.html`, `all-locations.html` | Taxonomy hubs |
| `single-tag.html`, `author-profile.html`, `search-result.html`, `universal-search-*.html` | System/archive pages |
| `dashboard.html`, `add-business.html`, `checkout.html`, `payment-failure.html`, `payment-receipt.html` | Protected/transaction screens — clearly marked, no member or payment data |
| `assets/css/bei.css` | Full design system + revision block |
| `assets/js/bei.js` | Masthead/footer shell, hover previews, reveals, grain/parallax, filters, pricing toggle, auth tabs |
| `assets/img/` | Official BEI logo, catalogue cover, user-supplied BEI photography (optimised as `bei-*.jpg/png`), clearly marked placeholder SVGs |
| `docs/source-inventory.md` | Full source page inventory, mapping, journeys, all FAQ content, authenticity notes |
| `responsive-preview.html` | Side-by-side mobile (390px) and tablet (820px) preview windows with a page selector |
| `wp/bei-design-system/bei-design-system.php` | WordPress plugin scaffold |

---

## 2. Design system

- **Type:** Plus Jakarta Sans for display and body. All italic text uses **Cormorant Garamond** (loaded from Google Fonts). Display uses weight 800 with tight tracking (`-0.05em`); FAQ summaries use weight 500.
- **Colour:** primary gold `#B7894F`, dark `#030303`, warm paper `#F3EDE3`, dark gold `#8C6634`. No blue/purple.
- **Imagery:** BEI's own event/exhibition photography from the authoritative source, plus marked placeholders where real images have not been supplied.
- **Signature effect:** lightweight SVG film grain with breathing animation, warm photographic filters, slow cinematic reveals and restrained parallax. Reduced-motion users get static grain and no movement.
- **Navigation:** masthead-style, hover photography preview, `Search Businesses` as a dropdown under `Business Directory`, contrast inversion over light sections.
- **Pricing:** redesigned using the reference concept — centered heading, monthly/annual switch, two plan cards with the featured plan highlighted and checklists.
- **Footer:** cinematic reveal with breathing gold aurora, grid texture, rotated marquee band, and scrolling giant **BLACK ENTREPRENEURS INTERNATIONAL** wordmark with metallic glow. No top border; back-to-top sits at the right on desktop.
- **Dynamic edition:** the homepage and trade catalogue show the latest issue as the previous calendar month, rolling over automatically on the 1st of each month.
- **Masthead account:** desktop shows a user icon with a Login / Register dropdown; on tablet/mobile the icon links straight to the login page.

---

## 3. Deploying to WordPress + Elementor

> **Important:** the connected installation is an unrelated demo (`waltondoggrooming.co.uk/waltondemo`). Nothing in this project modifies it. Deploy to a clean WordPress install with Elementor + Elementor Pro.

### Option A — recommended: plugin + Elementor pages

1. Copy `wp/bei-design-system/` to `wp-content/plugins/bei-design-system/`.
2. Copy this project's `assets/` folder into that plugin folder, so you have:
   - `wp-content/plugins/bei-design-system/assets/css/bei.css`
   - `wp-content/plugins/bei-design-system/assets/js/bei.js`
   - `wp-content/plugins/bei-design-system/assets/img/…`
3. Activate **BEI Editorial Design System** in WordPress.
4. In Elementor → Site Settings → Page Layout, choose **Elementor Canvas** for the BEI pages (no theme header/footer/title).
5. Create pages with the slugs below. In each page, add a **Custom HTML** widget containing `[bei_header]`, build the body with Elementor widgets (or paste the corresponding `<main>` markup from the HTML files into a Custom HTML widget for exact fidelity), then add `[bei_footer]`.
6. Set the front page to `Home` under Settings → Reading.
7. Create a menu matching the source navigation (Home, About BEI, Membership, Business Directory → Search Businesses, Events, Trade Catalogue, Contact, Login / Register, Get Started).

### Option B — static hosting

Upload all files as-is. The site works from any static host; no build step. Keep the `assets/` folder next to the HTML files.

### Slug map (preserved from source)

`/`, `/about/`, `/membership/`, `/all-businesses/`, `/search-businesses/`, `/directory/`, `/events/`, `/trade-catalogue/`, `/contact/`, `/sign-in/`, `/faqs/`, `/privacy-policy/`, `/terms-and-conditions/`, `/disclaimer/`, `/blog/`, `/single-category/`, `/all-categories/`, `/all-locations/`, `/single-location/`, `/single-tag/`, `/author-profile/`, `/dashboard/`, `/add-business/`, `/checkout/`.

### Dynamic directory (WordPress, no extra plugin)

A data-driven directory is included so listings can be updated without editing pages:

- `data/businesses.json` — the editable data source for the static build. Add a business by appending one object to the `businesses` array.
- `assets/js/bei-directory.js` — renders the data into any container marked `[data-bei-directory]`, with search, location/category filters, list/grid views and pagination.
- `search-businesses.html` — working example: only the advanced search is shown above the results; results appear after searching, with a link to the full directory.
- `wp/bei-design-system/directory.php` — WordPress-native version. It registers a private `Businesses` post type with a meta box, exposes `/wp-json/bei/v1/businesses`, and provides `[bei_directory]` for an Elementor Custom HTML widget. Editors add or update listings in WP Admin; the directory updates from the REST feed. No third-party directory plugin required.

The March 2026 edition page carries the source site's embedded flipbook (`https://publuu.com/flip-book/1021799/2404331/page/1?embed`). Add further edition embed URLs to `embedMap` in `assets/js/bei.js`.

### Elementor notes

- Use global classes for repeated colours/spacing if you want editors to restyle later; the CSS uses plain class names that sit cleanly alongside Elementor's own styles.
- The JS injects the masthead and footer into `#bei-header` / `#bei-footer`, so those two mount points must exist on every page.
- For FAQ accordions, native `<details>` is used — no JS required to open/close.
- For directory filters and the pricing switch, keep `bei.js` enqueued; it only needs the existing markup.
- For the dynamic directory, place `[bei_directory]` inside an Elementor Custom HTML widget. The plugin enqueues both scripts automatically.
- Favicon uses the original BEI logo file directly (`assets/img/bei-logo.webp`) — no generated PNG, border or background.

---

## 4. Content authenticity

- No invented businesses, testimonials, awards, press, statistics or partnerships.
- Real directory data comes from the live source (Rulrr.com, Hustle Harder, Wolf of Fitness, Shhh wellness, Byfut media, ultra building service, Iconi auto styling, Brands Aid ltd).
- Missing data is marked with bracketed placeholders: `[NAME]`, `[EMAIL]`, `[ADDRESS]`, `[PHONE]`, `[PRICE]`, `[BUSINESS NAME 09]`, etc.
- The source site's repeated "Jessica Martinez" team entries and "MediaZen" testimonials were treated as template filler and not presented as BEI facts.
- Source counters (`0 +`, `0 k`) are shown as `[NUMBER]` placeholders, not as claims.
- All FAQ panels were read, including hidden accordion content. See `docs/source-inventory.md`.

---

## 5. Verification checklist

- [x] Heading font is Plus Jakarta Sans; body font unchanged
- [x] Trade catalogue section on homepage (image one column, text + CTA the other)
- [x] Footer word is the full brand name and animates with the reference concept
- [x] Membership section redesigned on homepage and membership page
- [x] Category cards use clearly marked placeholder images
- [x] Stats band redesigned
- [x] `Search Businesses` moved into a dropdown under `Business Directory`
- [x] Directory grid/list shows 12 listings before pagination
- [x] Official BEI logo used in the masthead
- [x] All remaining pages built
- [x] No console errors; no broken images across all pages
- [x] Hero copy, one-line brand text, region icons, single-line metadata
- [x] 9 categories in 3 columns using the BEI logo as placeholder
- [x] Testimonials stacked with an image column; About goals converted to bento
- [x] Uniform 3-column editions grid; dynamic latest edition label
- [x] Testimonial uses the supplied "lady smiling with her fist folded" image (`assets/img/testimonial-lady-original.png`)
- [ ] Replace all placeholders with approved content and imagery before launch
- [ ] Connect forms, authentication, checkout and directory data to live services

**New photography:** the supplied BEI images were resized/compressed for web into `assets/img/bei-*.jpg` / `bei-model.png` (originals kept). Placement: hero and About/Contact use the event discussion shots; Who We Are uses the exhibition and tailor images; Latest Events and Events use the team/exhibition shots; About team uses founders + model; the Birmingham article uses the founders photo.

**Responsive review:** open `http://localhost:3000/responsive-preview.html` for side-by-side mobile (390px) and tablet (820px) preview windows, with a page selector.

**Testimonial image path:** `C:\Users\giddy\OneDrive\Documents\AI Prompts & Projects\ChatGPT\BEI2\assets\img\testimonial-lady-original.png` (copied from `lady smiling with her fist folded.png`)
