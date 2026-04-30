# UZG+ UI/UX DESIGN PRINCIPLES CANON v1.0

**Authored:** 2026-04-30 by CLA Lane_01 (Claude Opus 4.7)
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + canon-author NTS approval pending per R-AUTH-01
**Scope:** Top-level UI/UX design philosophy for UZG+ PWA OS — drives all downstream IA + design-system + component decisions
**Status:** PUBLISHED 2026-04-30

---

## §1 PURPOSE

This document defines **WHY** UZG+ feels the way it does. Every interaction, layout, and visual choice in the product must trace back to one or more principles below. Where two principles conflict, **the higher-numbered principle yields to the lower-numbered one** (P1 > P2 > P3...).

Sibling docs:
- IA Spec — defines the structure (where things live)
- Design System Canon — defines the tokens (how things look)
- Component Library Spec — defines the parts (what things are)
- Page Templates Spec — defines the patterns (how parts compose)

---

## §2 CORE PRINCIPLES (ranked)

### P1 — User Sovereignty First

The user is sovereign over their attention, data, time, and value. UZG+ never engineers against the user's interest.

**Implications:**
- No infinite scroll without a clear exit
- No artificial scarcity timers, no FOMO popups
- No hidden costs, no dark patterns, no growth-hack manipulation
- All persuasion is honest persuasion (truthful claims, voluntary action)
- Default settings respect privacy (opt-in, not opt-out, for data sharing)
- Friction added intentionally for high-stakes actions (sending tokens, deleting account, accepting governance proposals) — never to coerce, only to protect

### P2 — Spiritual Aesthetic, Not Crypto-Bro

UZG+ is a wisdom OS for inner-development practitioners. Visual + interaction language reflects calm, clarity, and depth — not hype, not flashing-neon Web3 tropes.

**Implications:**
- Restrained color palette (zen tones, not gradients-on-gradients)
- Organic forms over hard-edged techno geometry
- Sacred-geometry primitives where structure needs visualization (ENTA, QOT, Quantum Social)
- No "🚀 to the moon" iconography, no animated coin spinners, no rocket launches
- Imagery is photographic-real or hand-illustrated; no 3D-rendered metaverse stock art
- Sound (if any): ambient + bell-toned; no notification-spam ding loops

### P3 — PWA-First, Mobile-First

UZG+ ships as a Progressive Web App. The primary surface is mobile (≤ 480px wide). Desktop is a courtesy adaptation, not a parallel design track.

**Implications:**
- Every page MUST work on a 360×640 viewport (smallest-supported phone)
- Touch targets ≥ 44×44px (Apple HIG floor)
- Bottom-tab navigation primary on mobile; sidebar only emerges on ≥ 768px
- Offline-resilient: cached shells render before network (service worker)
- Install-to-home-screen prompted at the right moment (after second meaningful action), not on first visit
- Network-aware: detect slow connection, switch to lower-fi imagery automatically

### P4 — Minimal Cognitive Load

Every screen should be understandable in under 3 seconds by a user who has used the product for at least one week. New users get progressive disclosure (see P5).

**Implications:**
- One primary action per screen (the "default-CTA" rule)
- Maximum 7 navigation choices visible at once (Miller's Law)
- No more than 2 simultaneous overlays (modal-on-modal forbidden)
- Information hierarchy: title → primary content → secondary action → metadata
- Progressive labels: icons first for power users, icon + text for new users (toggle in settings)
- No more than 3 typography sizes per page

### P5 — Progressive Disclosure

New users see less. Returning users see more. Power users see everything. The product unfolds with the user's mastery.

**Implications:**
- First-time user journey hides advanced settings (Wallet swap, Governance proposal authoring, ENTA tuning) behind level-gates
- "Show more" always reveals depth — never hides it permanently
- Help text is on-page for first 7 days of feature use, then collapses to a `?` icon
- Onboarding is opt-out, not mandatory — sovereign user can skip
- User levels (per Membership tier + activity history) unlock UI complexity progressively

### P6 — Accessibility First

UZG+ targets WCAG 2.2 AA at minimum. Wisdom is for everyone, not just the able-bodied.

**Implications:**
- Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI components
- All interactive elements keyboard-navigable (Tab, Shift+Tab, Enter, Space, Esc)
- Screen reader compatible (ARIA labels on icon-only buttons, semantic HTML, live regions for dynamic updates)
- Reduce-motion respected (prefers-reduced-motion media query disables non-essential animation)
- No flashing > 3Hz (seizure trigger threshold)
- Form errors announced + clearly tied to input via `aria-describedby`
- Focus rings visible — never `outline: none` without visible alternative
- Bilingual VN/EN at all surfaces (no hardcoded English)

### P7 — Performance Budget

**LCP target ≤ 2.5s on 4G**, **INP target ≤ 200ms**, **CLS target ≤ 0.1** on the median mid-range Android. Every feature passes through a perf budget gate before shipping.

**Implications:**
- Images: AVIF/WebP, responsive `srcset`, lazy-loaded below the fold
- Fonts: 1 family + 1 fallback, `font-display: swap`, subset to Vietnamese diacritics + Latin extended
- JavaScript: route-level code splitting; no synchronous third-party scripts
- Critical CSS inlined; rest deferred
- Animations use `transform` + `opacity` only (compositor layer); never `width`/`height`/`top`/`left`
- Service worker caches shell + critical routes for offline-first feel
- Real-User-Monitoring (RUM) tracks Core Web Vitals in production

---

## §3 ANTI-PATTERNS — what UZG+ must NOT do

| # | Anti-pattern | Why forbidden |
|---|---|---|
| 1 | Infinite scroll without footer/exit | Violates P1 sovereignty (traps attention) |
| 2 | Artificial countdown timers ("offer ends in 03:14:27") | Violates P1 (manufactured urgency) |
| 3 | Pre-checked opt-in checkboxes for marketing | Violates P1 (consent must be active) |
| 4 | Modal popups on first page load | Violates P4 cognitive load + P1 sovereignty |
| 5 | Hidden costs revealed only at checkout | Violates P1 transparency |
| 6 | Confirm-shaming ("No, I don't want to save money") | Violates P1 dignity |
| 7 | "🚀💎🙌" emoji clusters in copy | Violates P2 aesthetic |
| 8 | Auto-playing video with sound | Violates P3 mobile-first + P1 sovereignty |
| 9 | More than 2 simultaneous toasts/notifications | Violates P4 cognitive load |
| 10 | Color as the sole indicator (red = error, green = success) | Violates P6 accessibility (colorblind users) |
| 11 | Settings buried > 3 levels deep | Violates P5 (depth must remain reachable) |
| 12 | Notifications without an "all off" master switch | Violates P1 sovereignty |
| 13 | Disabled buttons with no explanation of how to enable them | Violates P4 + P5 |
| 14 | Mandatory onboarding with no skip option | Violates P5 progressive disclosure |
| 15 | "Sign in with [Web2 platform]" as the primary auth path | Violates P1 user-sovereignty (lock-in) |

---

## §4 VOICE + TONE

### 4.1 Voice (constant)

- **Calm, confident, kind.** Never panicky, never sales-y, never patronising.
- **Bilingual native: Vietnamese + English.** No hardcoded English in user-facing surfaces. Vietnamese is canonical; English is courtesy translation.
- **Wisdom-aware.** UZG+ users are practitioners — copy assumes they are intelligent adults capable of self-direction.
- **Never slang, never internet-meme.** No "literally", no "this hits different", no "no cap", no "vibe check".

### 4.2 Tone (varies by context)

| Context | Tone |
|---|---|
| Welcome / onboarding | Warm, inviting, unhurried |
| Error / blocked action | Honest, precise, suggests recovery |
| Success / reward | Quiet acknowledgement, not celebration spam |
| High-stakes confirmation (send tokens, accept governance) | Clear, neutral, gravity-respecting |
| Empty state | Inviting, suggests one next action |
| Wisdom / spiritual content | Reverent without being preachy |
| Governance / protocol | Neutral, clinical, complete |
| Marketplace | Direct, descriptive, NOT pitchy |

### 4.3 Bilingual rules (R-LANG-01..03 inherited from LAW-NTS-LANE-2)

- Vietnamese first; English as secondary in toggleable surfaces
- Diacritic preservation strict — copy-paste from non-Unicode-safe sources MUST normalise to NFC
- UZG core terminology canon (Đại Đạo, Tu Nhân, Bồ Đề, ENTA, QOT) — Vietnamese / Pali / English mixed allowed where canonical, but each term has a canonical form locked in Lane_02 canon library
- Numbers + dates use locale formatting (Vietnamese: `30/04/2026`; English: `April 30, 2026`)

---

## §5 VISUAL IDENTITY FOUNDATIONS

### 5.1 Aesthetic family

UZG+ visual language sits at the intersection of:

1. **Vietnamese minimalism** — restraint, breathing room, calm
2. **Sacred geometry** — circles, mandalas, golden ratio, organic spirals (NOT crypto-grid hexagons)
3. **Botanical / Zen garden** — natural textures, subtle organic motifs in backgrounds
4. **Modernist clarity** — clean type, generous whitespace, deliberate hierarchy

### 5.2 What UZG+ visual is NOT

- NOT cyberpunk (no neon, no glitch-art, no holographic gradients)
- NOT corporate-Web2 (no stock-photo executives shaking hands)
- NOT crypto-Web3 (no rocket-coins, no skull-NFT-ape collections)
- NOT skeuomorphic (no fake leather, no fake wood, no fake metal)
- NOT brutalist (no intentional visual aggression)
- NOT meme-aware (no Comic Sans irony, no Wojak references)

### 5.3 Foundational motifs

- **The circle** — recurring geometry for ENTA, QOT, Quantum Social, Membership tier badges
- **The lotus / the seed / the sprout** — onboarding + growth + practice progression
- **The trail / the path** — QOT lineage, learning journey, governance history
- **The web / the network** — Quantum Social, Circle Business connections
- **Empty space** — silence is part of the design; not every pixel needs content

---

## §6 HIERARCHY OF NEEDS (user-state pyramid)

When designing any flow or page, the higher need MUST be solvable before the lower one is offered:

1. **Identity** — "Who am I in UZG+? Am I signed in? Whose name is this profile?" → resolved by Identity module + ENTA root
2. **Wallet** — "What value do I hold? Can I see + protect it?" → resolved by Wallet module + Wallet+UZGFi root
3. **Community** — "Where do I belong? Who am I connected to?" → resolved by Community module + Quantum Social root + Circle Business root
4. **Discovery** — "What's available to me? Where do I learn / shop / retreat?" → resolved by Wisdom AI + Marketplace + Retreat modules
5. **Governance** — "How do I shape the system? How do I vote / propose?" → resolved by Governance module + Membership root

A user blocked on level 1 (e.g., signed-out) MUST NOT be shown level 5 actions. The product reveals capability bottom-up.

---

## §7 RESERVED — design system & implementation references

This canon is intentionally **abstract** (principles, not pixels). For concrete tokens, components, layouts, and templates, see:

- [`UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md`](UZG_PLUS_UIUX_INFORMATION_ARCHITECTURE_SPEC_v1.md)
- [`UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md`](UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1.md)
- [`UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md`](UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1.md)
- [`UZG_PLUS_UIUX_PAGE_TEMPLATES_SPEC_v1.md`](UZG_PLUS_UIUX_PAGE_TEMPLATES_SPEC_v1.md)

---

## §8 CHANGES LOG

**v1.0 (2026-04-30):** Initial publish. Authored by CLA Lane_01 per AMD_NTS_FULL_TECH_AUTONOMY. Pending NTS canon-approval gate per R-AUTH-01.

---

## §9 END

When in doubt, return to **P1: User Sovereignty First**. Every other principle bends to it.

LAW-NTS-derived UI/UX canon. End of file.
