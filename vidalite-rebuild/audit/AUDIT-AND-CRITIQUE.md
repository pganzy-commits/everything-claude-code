# VidaLite.co — Site Audit & Prioritized Critique

**Date:** February 27, 2026
**Auditor:** Claude Code Agent
**Scope:** Full site audit of vidalite.co (public-facing)
**Method:** Web search crawl, retail channel analysis, brief cross-reference

---

## Phase 1: Current State Audit

### 1.1 Site Overview

| Attribute | Current State |
|-----------|---------------|
| **Platform** | Shopify |
| **Domain** | vidalite.co |
| **Theme** | Unknown (appears to be a stock or lightly customized Shopify theme) |
| **SSL** | Active (HTTPS) |
| **Support Email** | cs@vidalite.co |
| **Phone** | 929-303-7893 |
| **Hours** | Mon-Fri, 09:00-17:30 |

### 1.2 Pages Identified

| Page | URL | Status |
|------|-----|--------|
| Homepage | vidalite.co | Exists |
| All Products | /collections/all | Exists |
| Shura Collection | /collections/shura | Exists |
| Hikari Collection | /collections/hikari | Exists |
| Shura Square Product | /products/shura-sqaure (note: typo in URL) | Exists |
| Ma'or Product | /products/maor | Exists |
| Orbita Product | /products/orbita-pendant-light-beige | Exists |
| Blog (Living Lite) | /blogs/living-lite-lite-up-your-life | Exists |
| Contact | /pages/contact | Exists |
| About | /pages/about | Exists |
| Track Lighting Kits | /collections/all/track-lighting-kits | Exists |

### 1.3 Pages NOT Found (Missing)

| Page | Priority | Notes |
|------|----------|-------|
| **Projects / Gallery** | CRITICAL | No installation photography page. Trade buyers need this. |
| **Trade / Pro Portal** | CRITICAL | No trade application, no gated pricing, no trade CTA |
| **Spec Sheet Downloads** | HIGH | No downloadable PDF spec sheets found |
| **FAQ Page** | MEDIUM | No standalone FAQ |
| **Warranty Page** | MEDIUM | Not found as dedicated page |
| **Return/Refund Policy** | MEDIUM | Not verified |

### 1.4 Collections Mapped

From the brief and web search, the following collections should exist:

| Collection | Found Online | Notes |
|-----------|-------------|-------|
| Shura | Yes | Most visible, featured on HD/Wayfair/Amazon |
| Hikari | Yes | Price range $160-$188 noted |
| Orbita | Yes | Pendant lights, natural wood design |
| Ma'or | Yes | Hanging pendant, 3-light rotatable |
| Gal | Brief only | Not found in search results |
| Nakuv | Brief only | Floor lamp, $163 |
| Amud | Brief only | Not found |
| Sovev | Brief only | Not found |
| Mazal | Brief only | Not found |
| FOS | Brief only | Not found |
| Karpo | Brief only | Not found |
| ZIV | Brief only | $112 |
| Keshet | Brief only | LUCE By Mercer Project sub-brand, $405 |
| Inspira | Brief only | Not found |

**Finding:** Many collections are either hidden, under-marketed, or missing from the site. Only 4-5 collections appear in search results. The remaining 9-10 have essentially zero online visibility.

### 1.5 Product Data Quality

**Shura (Best Seller) — Well Documented:**
- Full specs available: 3000K, 80+ CRI, 7W per head, 36° beam, 50,000hr
- Multiple variants: 2-light through 6-light, Square, Linear, Swivel, Cage
- Finishes: Matte Black, White, Brushed Brass
- Adjustability: 270° horizontal, 90° vertical
- Available at Home Depot (87 results), Wayfair, Amazon
- Good review volume on retail channels

**Other Collections — Poorly Documented:**
- Orbita has basic description (wood grain, frosted glass)
- Ma'or has basic description (3-light rotatable pendant)
- Most other collections have minimal or no searchable product data

### 1.6 Current Brand Voice (from search results)

Quotes found in current copy:
- "Modern, elegant, luxurious lighting company driven by interior design"
- "Created by a luxurious group of elegant friends"
- "How to bring the perfect lighting solution to a modern world looking for relatable luxury?"
- "Fixtures that looked good on Instagram, but looked even better in real life"
- Blog tagline: "Living Lite: Lite Up Your Life"

**Assessment:** The voice is casual, Instagram-influencer-adjacent, and consumer-focused. It does NOT speak to trade professionals, architects, or designers. The phrase "luxurious group of elegant friends" undermines credibility for trade buyers.

### 1.7 URL Issues

- `/products/shura-sqaure` — "sqaure" is misspelled (should be "square")
- Blog URL `/blogs/living-lite-lite-up-your-life` — redundant and SEO-unfriendly
- No evidence of clean URL structure for collections

---

## Phase 2: Prioritized Critique

### CRITICAL — Brand Alignment Gaps

| Issue | Current | Target | Impact |
|-------|---------|--------|--------|
| **No trade presence** | Site is 100% DTC consumer | Trade buyers are PRIMARY audience | Losing the most valuable customer segment entirely |
| **Brand voice too casual** | "Luxurious group of elegant friends" | Architectural, authoritative, sophisticated | Undercuts credibility with design professionals |
| **No project gallery** | None | Curated installation photography by space type | Trade buyers can't envision VidaLite in their projects |
| **No spec sheet downloads** | None | PDF per product | Trade standard; specifiers won't consider without this |
| **Missing collections** | ~5 visible, ~9 invisible | All 14 collections properly showcased | 60%+ of product catalog is effectively hidden |

### HIGH — UX Problems

| Issue | Details | Recommendation |
|-------|---------|----------------|
| **Navigation is likely basic** | Standard Shopify nav; no trade vs. consumer path | Implement dual-path navigation: Shop / Projects / Trade / About |
| **No quick-view on collections** | Standard grid, no hover/quick-view | Add quick-view modal with key specs |
| **No filter/sort sophistication** | Basic Shopify filtering | Filter by: collection, type, finish, price, number of heads |
| **Product URL typo** | "shura-sqaure" | Fix to "shura-square" with 301 redirect from old URL |
| **No mobile optimization evidence** | Unknown | Must be mobile-first; trade buyers browse on iPads at job sites |

### HIGH — UI Gaps vs. Helium Lyte Reference

| Element | Current (Inferred) | Helium Lyte Target |
|---------|--------------------|--------------------|
| **Hero** | Likely product-focused, basic | Full-bleed lifestyle photography, bold overlaid headlines |
| **Color palette** | Likely stock Shopify white/grey | Off-white #e7e1d1, black #000, brown #705b48 |
| **Typography** | Stock Shopify fonts | Strong hierarchy — large display type, architectural feel |
| **Backgrounds** | Sterile white | Warm cream/off-white, alternating dark sections |
| **Product photography** | White background cutouts | In-room lifestyle + white background; both needed |
| **Whitespace** | Tight/cluttered | Generous breathing room on all elements |
| **Section rhythm** | Uniform sections | Light/dark alternation for visual drama |

### HIGH — Content Gaps

| Gap | Priority | Notes |
|-----|----------|-------|
| **No downloadable spec sheets** | CRITICAL | Every product needs a PDF with dimensions, lumens, wattage, CRI, color temp, weight, materials, finish options, dimmer compatibility |
| **No installation content** | HIGH | Installation guides, dimmer compatibility lists |
| **Weak About page** | HIGH | Current copy is too casual; needs professional brand story |
| **No project case studies** | HIGH | Need 6-12 installation photos tagged by space type |
| **Blog needs redesign** | MEDIUM | "Living Lite" content exists but template needs new aesthetic |
| **Product descriptions vary** | MEDIUM | Standardize format across all products |
| **"GARAUNTEE" typo** | LOW | Fix to "GUARANTEE" everywhere |

### MEDIUM — Technical / SEO Issues

| Issue | Details | Fix |
|-------|---------|-----|
| **Schema markup** | Likely minimal/default Shopify | Add Product, Organization, BreadcrumbList, FAQPage, Review schema |
| **Meta tags** | Likely auto-generated | Write unique title tags and meta descriptions per page |
| **Open Graph / Twitter Cards** | Unknown | Implement for all pages |
| **Image alt text** | Likely missing or generic | Descriptive alt text on every image |
| **PageSpeed** | Unknown (can't test) | Target 90+ with lazy loading, image compression, minimal JS |
| **Canonical tags** | Likely default Shopify | Verify and optimize |
| **Sitemap** | Likely auto-generated | Optimize XML sitemap |

### MEDIUM — Conversion Gaps

| Gap | Impact | Solution |
|-----|--------|----------|
| **No trade lead capture** | Losing trade buyers | Trade application form, gated pricing, sticky "Request Trade Pricing" CTA |
| **No email capture** | No list building | Exit-intent popup (tasteful), footer newsletter signup |
| **No social proof strategy** | Weak trust signals | Retail partner logos (HD, Wayfair, Target, Lumens, Amazon) prominently displayed |
| **No review integration** | Reviews only on retail sites | Integrate Judge.me or Yotpo |
| **No analytics/tracking** | Unknown | GA4, GSC, Meta Pixel, Pinterest Tag |

---

## Priority Matrix

### Do First (Week 1)
1. Global styles — implement Helium Lyte palette, typography, spacing
2. Homepage redesign — hero, collections, trade CTA, partner logos
3. Navigation restructure — Shop / Projects / Trade / Contact
4. Product page template — specs table, variant selector, review section, spec sheet placeholder

### Do Second (Week 2)
5. Collection page template — filters, quick-view, generous whitespace
6. Projects / Gallery page (new) — masonry grid, space-type tags
7. Trade / Pro Portal (new) — application form, messaging, catalog placeholder
8. About page rewrite — professional brand story

### Do Third (Week 3)
9. Blog template redesign
10. Footer and global elements
11. SEO implementation (schema, meta, alt text, sitemap)
12. Lead capture (exit-intent, newsletter, trade CTAs)

### Do Fourth (Week 4)
13. Mobile optimization pass
14. Cross-browser QA
15. Performance optimization (PageSpeed 90+)
16. Content delivery — spec sheet templates, image placeholders

---

## Content the Founder Must Provide

| Item | Priority | Notes |
|------|----------|-------|
| **Project/installation photography** | CRITICAL | 6-12 images of VidaLite fixtures installed in real spaces (residential, commercial, hospitality) |
| **High-res lifestyle product photos** | CRITICAL | Fixtures shown IN rooms, not just white background |
| **Updated product specs for all collections** | HIGH | Complete specs for: Amud, Sovev, Mazal, FOS, Karpo, Inspira, Gal, Nakuv, ZIV, Keshet |
| **Brand story (reviewed/approved)** | HIGH | Will draft professional copy; founder to review |
| **Trade pricing structure** | HIGH | Needed for trade portal |
| **Dimmer compatibility list** | MEDIUM | Per product model |
| **Press/awards/notable projects** | MEDIUM | If available |
| **VidaLite logo file** | HIGH | SVG preferred, PNG acceptable |
| **Helium Lyte PDF** | HIGH | For precise design reference extraction |

---

*This audit is based on publicly available data. A full audit with Shopify admin access would reveal additional theme-level, app-level, and analytics issues.*
