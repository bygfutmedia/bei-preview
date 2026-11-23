# BEI — Source Inventory & Destination Mapping

Authoritative source: https://www.black-entrepreneurs-international.com/
Inventory date: 2026-11-21. Sources: live page fetches + `/wp-sitemap.xml` and `/page-sitemap.xml`.

## 1. Destination state (connected WordPress + Elementor installation)

- Site URL: `https://waltondoggrooming.co.uk/waltondemo` — a **sandbox / demo installation**, not the live BEI domain.
- Stack: WordPress 7.1.5, Hello Elementor 3.5.2, Elementor + Elementor Pro 4.4.1 (license: Advanced, active), Pretty permalinks `/%postname%/`.
- Existing content belongs to a **different business** (Walton Dog Grooming) and consists of published, draft and test pages:

| ID | Title | Status | Type | Treatment in this build |
|----|-------|--------|------|-------------------------|
| 595 | Home | publish | page | Left untouched; new BEI pages created separately |
| 2249 | Register | publish | page | Left untouched |
| 2352 | Thank you | publish | page | Left untouched |
| 2350 | Book an Appointment | draft | page | Not exposed |
| 2351 | My Bookings | draft | page | Not exposed |
| 2353 | Appointment canceled | draft | page | Not exposed |
| 2354 | Cancel Payment | draft | page | Not exposed |
| 2355 | Appointment cancellation confirmation | draft | page | Not exposed |
| 3 | Privacy Policy | draft | page | Not exposed |
| 1974 | Privacy Policy | draft | page | Not exposed |
| 1361 | Contact | draft | page | Not exposed |
| 1037 | About Us | draft | page | Not exposed |
| 67 | My account | draft | page | Not exposed |
| 581 | Blog | draft | page | Not exposed |
| 2318 | Dashboard | publish | section | Unassigned / inactive |

**Rule applied:** no unpublished source or destination content was exposed. Pre-existing drafts/test pages were not published, renamed or reused. New BEI pages are created as their own documents with the source's names and slugs.

## 2. Source navigation (primary)

Home · About BEI · Membership · Business Directory (child: Search Businesses) · Events · Trade Catalogue · Contact. Utility: Login / Register. Primary action: Get Started → `/membership/`.

## 3. Page inventory & mapping

Legend: **P** = public page present in source, **S** = system/utility page, **T** = template/private-ish page (indexed but not a normal customer journey). All are mapped to same-name pages in the destination unless noted.

| # | Source page (slug) | Name | Kind | Destination page | Notes |
|---|--------------------|------|------|------------------|-------|
| 1 | `/` | Home | P | Home | Hero, community, who we are, categories, featured businesses, testimonials, membership, FAQ, latest events |
| 2 | `/about/` | About BEI | P | About BEI | Mission, goals, what we do, why it works, membership purpose, team, FAQ |
| 3 | `/membership/` | Membership | P | Membership | 4 plan blocks + 10 BEI FAQs + checkout links |
| 4 | `/all-businesses/` | All Businesses | P | Business Directory / All Businesses | Filters, 87 businesses, grid/list/map views, pagination 1–11 |
| 5 | `/search-businesses/` | Search Businesses | P | Search Businesses | Child of Business Directory in nav |
| 6 | `/events/` | Events | P | Events | Event feature + 4-step working process |
| 7 | `/trade-catalogue/` | Trade Catalogue | P | Trade Catalogue | 6 edition covers, Nov 2025 → Apr 2026 |
| 8 | `/contact/` | Contact Us | P | Contact | Address, phone, email, message form |
| 9 | `/sign-in/` | Sign In / Register | S | Login / Register | Login, register, recover password |
| 10 | `/faqs/` | FAQs | P | FAQs | 10 BEI accordion items |
| 11 | `/privacy-policy/` | Privacy Policy | P (legal) | Privacy Policy | Last updated 09 September 2025 |
| 12 | `/terms-and-conditions/` | Terms and Conditions | P (legal) | Terms and Conditions | Last updated 09 September 2025 |
| 13 | `/disclaimer/` | Disclaimer | P (legal) | Disclaimer | Last updated 09 September 2025 |
| 14 | `/blog/` | Blog | P | Journal / Blog | Source "Latest Events → View All Blogs" |
| 15 | `/birmingham-black-business-show-2025/` | Birmingham Black Business Show 2025 | P (post) | Journal article | Event article, 4 June 2025 |
| 16 | `/dashboard/` | Dashboard | S/T | Business Dashboard | Logged-in area — build as protected/placeholder only, never expose member data |
| 17 | `/add-business/` | Add Business | S/T | Add Business | Logged-in listing flow |
| 18 | `/checkout/` | Checkout | S/T | Checkout | Payment flow — no payment data invented |
| 19 | `/select-your-plan/`, `/select-your-plan-2/` | Select Your Plan | S/T | Map to Membership | Duplicate/test plan pages — do not expose as separate public routes |
| 20 | `/payment-failure/`, `/payment-receipt/` | Payment Failure / Receipt | S/T | Transaction pages | System pages only |
| 21 | `/single-category/` + `/single-category/{slug}/` | Category archives | P | Category archives | Entertainment, Food & Dining, Education, Legal & Financial, Accounting, Automotive, Business Services, Business Support & Supplies, Charities, Computers & Electronics, Construction & Contractors, Consulting, Health/Well-being, Home and Garden, Hospitality, IT, Manufacturing/Wholesale/Distribution, Personal Care, Property/Real Estate, Retail, Travel/Transportation |
| 22 | `/all-categories/` | All Categories | P | All Categories | Category index |
| 23 | `/all-locations/` | All Locations | P | All Locations | Asia, Caribbean, East Africa, Europe, North Africa, North America, Oceania, South Africa, South America, UK, West Africa |
| 24 | `/single-location/` | Location archive | P | Location archive | — |
| 25 | `/single-tag/`, `/post_tag/` | Tag archive | P | Tag archive | — |
| 26 | `/author-profile/` | Author Profile | P | Author Profile | — |
| 27 | `/search-result/`, `/universal-search-results/`, `/universal-search-form/` | Search system | S | Search | — |
| 28 | `/directory/{slug}/` | Business detail (e.g. rulrr-com, hustle-harder, wolf-of-fitness, shhh-wellness, byfut-media, ultra-building-service, iconi-auto, brands-aid-ltd) | P | Directory detail | Real source listings; kept with real data only |
| 29 | `/bei-trade-catalogue-*/` | Catalogue editions (6) | P | Catalogue edition | Kept as edition entries |
| 30 | `/elementskit_template` sitemap entries | Elementor templates | T | Not mapped | Template artifacts, not customer journeys |

### Preserved URL slugs
`/`, `/about/`, `/membership/`, `/all-businesses/`, `/search-businesses/`, `/events/`, `/trade-catalogue/`, `/contact/`, `/sign-in/`, `/faqs/`, `/privacy-policy/`, `/terms-and-conditions/`, `/disclaimer/`, `/blog/`, `/directory/`, `/single-category/`, `/all-categories/`, `/all-locations/`.

## 4. Customer journeys

1. **List a business** — Home → Get Started → Membership → choose plan → Checkout → Login/Register → Dashboard → Add Business → Directory detail.
2. **Find a business** — Home → Business Directory → filter by Location / Category / Radius → grid/list/map → Directory detail → phone / email / website.
3. **Join community** — Home → About BEI → Membership (Free plan) → Login/Register → community groups.
4. **Discover events** — Home → Events or Latest Events → article → Contact / Membership.
5. **Source products** — Trade Catalogue → edition → Contact / Membership.
6. **Support** — FAQs / Contact → email `letstalk@black-entrepreneurs-international.com`.

## 5. FAQ & accordion content (all tabs read, including hidden panels)

### `/faqs/` and `/membership/` — BEI set (10)
1. **What do I get as a BEI member?** — As a member, you gain access to networking opportunities, business support, training, events, and a community of like-minded entrepreneurs.
2. **How do I find and register for events?** — You can view upcoming workshops, webinars, and networking events on our Events page. Registration links will be provided for each event.
3. **How can I promote my business on BEI?** — You can update your profile, share your products or services, and take part in our member spotlights to increase visibility.
4. **Does BEI offer funding opportunities?** — We share information on grants, loans, and investment opportunities relevant to Black entrepreneurs. Keep an eye on our Funding section for updates.
5. **How can I connect with other members?** — Use our member directory and discussion spaces to reach out, collaborate, and build partnerships with other entrepreneurs.
6. **What training and mentorship is available?** — We offer training programs, mentorship opportunities, and expert-led workshops to help you grow your business.
7. **How do I update my profile or share content?** — Log in to your account, go to your profile, and update your information. You can also share updates, resources, or articles with the community.
8. **Where can I ask questions or get advice?** — Our community forum is the best place to ask for support, share your experiences, and connect with other members.
9. **How does BEI celebrate member achievements?** — We highlight member success stories through newsletters, social media, and spotlights on the platform.
10. **How can I share feedback with BEI?** — We welcome your ideas! You can send feedback directly through the platform or reach out to the BEI team anytime.

### Home / About — legacy set (6; source copy retained verbatim, kept in a separate "General questions" group)
1. **What services do you offer?** — We provide a range of digital marketing services, including SEO, social media marketing, content marketing, email marketing, PPC advertising, and web design.
2. **When will I see results?** — We provide a range of digital marketing services, including SEO, social media marketing, content marketing, email marketing, PPC advertising, and web design.
3. **How do you measure success?** — We provide a range of digital marketing services, including SEO, social media marketing, content marketing, email marketing, PPC advertising, and web design.
4. **Can you create a custom plan?** — Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.
5. **Why is SEO important?** — Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.
6. **Do you provide monthly reports?** — Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.

> Note: the legacy set is template filler inherited from the source theme. It is preserved for fidelity in an explicitly labelled secondary group, not presented as BEI fact. Empty first accordion panels ("No content is added yet.") were ignored.

## 6. Content authenticity notes

- Source placeholder counters (`0 +`, `0 %`, `0 k+`, "Satisfied Clients 0 k+", etc.) are **not** reproduced as facts. In the new build they appear as clearly marked `[NUMBER]` placeholders or are omitted.
- Team entries on `/about/` repeat "Jessica Martinez — Digital Marketing Strategist" seven times with generic social links; replaced by `[TEAM MEMBER]` placeholders.
- Contact page "2715 Ash Dr. San Jose" / "mediaZen@Support.Com" is template filler. The authoritative BEI contact details from the site-wide footer are used instead: `letstalk@black-entrepreneurs-international.com`, `C K R House, 70 East Hill, Dartford, England, DA1 1RZ`. Phone is `[PHONE]`.
- Testimonials mentioning "MediaZen" are template filler and are not used as BEI testimonials. Real source business names (Aerona Custom Clearance, MoJam AfroCaribbean Grocery) are retained without invented claims.
- Directory business data is taken verbatim from the live source; no businesses, reviews, awards, statistics or partnerships were invented.
