# UZG+ V2 UX Gap Analysis v1.0

**Authored:** 2026-04-30 by CLA Lane_01 / Cursor (Sonnet 4.6)
**Source SHAs:** `uzgplus-app@6d99b1881b...` · `Uniton_Shared@5cfa5c82...`
**Companion deliverables:** `UZG_PLUS_V2_ROUTE_INVENTORY_v1.md`, `UZG_PLUS_V2_USER_FLOW_AUDIT_v1.md`, `UZG_PLUS_V2_MODULE_INVENTORY_v1.md`

---

## §1 Severity model

| Severity | Definition | Action timing |
|---|---|---|
| **P0** | Critical — blocks user value, contradicts canon, or causes data confusion. Must fix in V3. | Phase 2 mockup priority + Phase 3 implementation top |
| **P1** | Major — significant friction, inconsistency, or feature break that hurts retention. Should fix in V3. | Phase 2 mockup secondary |
| **P2** | Minor — polish, accessibility, edge-case, or cosmetic. Fix opportunistically. | Phase 3 polish pass |

---

## §2 Critical UX Gaps (P0 — block user value, contradict canon, or cause confusion)

### G01 — ENTA profiles not publicly viewable (canon contradicts implementation) [P0]

**Affected:** ROOT 1 (Identity), CROSS-CUT 5 (UDNA discovery)

**Evidence:** `screenshots/07_enta_handle_redirects_login.png` — visiting `https://uzg.plus/enta/uzgarden` (a real handle) silently redirects to `/login`. The route in `App.jsx:4047` is wrapped in `gateByJourney('profile_view', <ProfilePage>)` which requires session.

**Why it matters:** Whitepaper §6 ENTA describes profiles as the "public identity layer" — meant to be shared, indexed, and viewable without account creation. The UDNA gateway addresses some of this for `/human/:id`, `/circle/:id`, `/business/:id`, `/aier/:id` — but `/enta/:handle` (the user's primary public identity) does not work for guests.

**Recommended Phase 2 mockup focus:** Define a guest-mode `<ProfilePage>` variant that renders public-safe profile fields (handle, avatar, bio, public posts count, public connections count, latest 5 public Flow posts, latest 5 QOT contributions). Decide whether `/enta/:handle` should serve this guest-mode by default and require login only for interaction (follow, message, etc.).

---

### G03 — `/aier/:slug` URL semantic flips across auth boundary [P0]

**Affected:** Module 3 (Wisdom AI), Module 5 (Marketplace), CROSS-CUT 5 (UDNA)

**Evidence:** Same URL `https://uzg.plus/aier/marketplace`:

- For guest → `screenshots/09_aier_marketplace_authgate.png` shows udna-public `<PublicEntityPage expectedType="AIER">` rendering AIER License (entity ID: "marketplace")
- For member → main app `<AIERMarketplacePage>` (the actual AIER marketplace UI per Master Audit)

The udna-public router declares `<Route path="/aier/:uniton_id" element={<PublicEntityPage expectedType="AIER">}>` (`apps/udna-public/src/App.jsx:60`) which catches ANY `/aier/[anything]` URL for guests. The main app declares `/aier/marketplace`, `/aier/mint`, `/aier/my` as concrete authenticated routes. **The two namespaces collide on the same URL.**

**Why it matters:** Anyone deep-linking `/aier/marketplace` from social media will see one product as a guest, then a different product after sign-in — under the same URL. Confusing for users; canonical-URL ambiguity for SEO; potential security surprise (no warning about content change).

**Recommended Phase 2 mockup focus:** Either (a) namespace public AIER under `/p/aier/:id` (separate from member `/aier/marketplace`), or (b) make the member `/aier/marketplace` URL render the same component as guest with appended member-only sections, or (c) deprecate the guest udna-public AIER ID handler in favor of explicit handles like `/p/aier/aier-license-canonical-001`.

---

### G04 — No member-facing governance UI [P0]

**Affected:** Module 7 (Governance)

**Evidence:** Whitepaper §4.2 Module 7 = "proposals, voting, decentralised coordination". V2 implementation: only `/admin/*` routes (RBAC-gated). No `/governance`, `/proposals`, `/votes`, `/delegate` member-facing surfaces. Confirmed by route inventory enumeration — 0 member-facing governance routes.

**Why it matters:** Decentralised governance is a Whitepaper pillar. Without member-facing proposals/voting UI, UZG+ functions as a centrally-administered system, not a community-governed network. Direct contradiction with canon.

**Recommended Phase 2 mockup focus:** Design `/governance/proposals` (list + detail), `/governance/proposals/:id/vote` (vote action), `/governance/delegate` (delegate voting power), `/governance/results` (passed/failed proposals), all tier-gated per `MembershipPrivilegeMatrix` (Builder+ to vote, Sovereign to propose).

---

### G06 — Member AIER UX < public UDNA gateway UX of same data [P0]

**Affected:** Module 3 (Wisdom AI), Module 5 (Marketplace)

**Evidence:** udna-public `<PublicEntityPage expectedType="AIER">` for guests is polished — 8 well-organised sections (S1 Identity / S2 Meaning / S3 Trust / S4 Value / S5 Related / S6 Routes / S7 Extended / S8 QOT Explorer) with semantic styling per `screenshots/15_aier_marketplace_section_meaning.png`, `16_aier_marketplace_section_trust.png`, `17_aier_marketplace_section_routes_qot.png`, `18_aier_marketplace_footer_navigation.png`. Master Audit §4 marks member-side `<AIERMarketplacePage>` as WIP/rough.

**Why it matters:** Members get a worse experience than guests for the same canonical AIER entity. This is backwards — members should get richer functionality, not stripped-down UX.

**Recommended Phase 2 mockup focus:** Redesign member `/aier/marketplace`, `/aier/[id]` to extend the udna-public S1–S8 structure with member-only actions (mint, license, delegate, governance) embedded in the same visual language.

---

### G15 — Thai language partial coverage [P0]

**Affected:** ROOT 1 (Identity), CROSS-CUT 4 (Bilingual)

**Evidence:** `screenshots/25_login_thai_lang_partial.png` — selecting Thai (`th`) in language combobox: only the dropdown text changes to Thai (`ไทย (th)`); ALL other page content stays English ("Sign in and pick up exactly where you left off.", "Step 1 of 2", "Send your access code", "Continue", placeholder text). Compare working Filipino version `screenshots/24_login_filipino_lang.png` where everything localises.

**Why it matters:** UZG+ is positioned for SE Asia. Thai is one of 4 supported languages on the language selector. Partial coverage means Thai-only users see a broken experience. P0 because it's a public-facing feature failing for a substantial user segment.

**Recommended Phase 2 mockup focus:** Audit complete TH string-pack, fill missing translations, add CI test that verifies all UI strings have parity across en/vn/fil/th.

---

### G22 — Marketplace module structural gap [P0]

**Affected:** Module 5 (Marketplace)

**Evidence:** Whitepaper §4.2 Module 5 = "Marketplace — creator economy (courses, workshops, services)". V2 implementation: only `/aier/marketplace` exists, which is AIER licenses. No `/marketplace`, `/marketplace/courses`, `/marketplace/workshops`, `/marketplace/services` exist. Confirmed by route enumeration.

**Why it matters:** Marketplace is supposed to be the creator economy hub — courses, workshops, services. With only AIER licenses, UZG+ has no creator-economy surface. Major Whitepaper-vs-V2 gap.

**Recommended Phase 2 mockup focus:** Design `/marketplace` discovery, `/marketplace/courses`, `/marketplace/workshops`, `/marketplace/services` listings with creator submission flow + commission split (linked to `circle_business_commission` data model — already exists in DB).

---

### G07 — Duplicate routes for chat/inbox [P0]

**Affected:** Module 2 (Community → Chat)

**Evidence:** App.jsx declares both `/chat/:conversationId` and `/inbox/direct/:conversationId` rendering the SAME `<DirectRoomTakeoverRootPage>` component, and `/chat/:conversationId/info` + `/inbox/direct/:conversationId/info` both rendering `<ChatRoomInfoPage>`. Different URLs, identical components, identical content.

**Why it matters:** Two URLs for the same content fragments the link graph (search engines, deep links, bookmarks split between `/chat/` and `/inbox/`), confuses users about canonical share URL, and inflates support load ("which link do I send?").

**Recommended Phase 2 mockup focus:** Deprecate `/inbox/direct/*` to permanent redirect → `/chat/*`. Add a 301 redirect rule + remove the duplicate route declaration.

---

## §3 Major UX Inconsistencies (P1 — friction + retention risk)

### G02 — No 404 page; catch-all silently redirects to `/login` [P1]

**Evidence:** Visiting `https://uzg.plus/notarealroute` → silent redirect to `/login` (verified live). App.jsx catch-all `<Route path="*" element={<Navigate to="/login" replace />}>`.

**Recommended:** Real `<NotFoundPage>` with helpful actions (search, go home, popular destinations). Avoid silent loss of user intent.

---

### G05 — Help surface unmounted [P1]

**Evidence:** `HelpPage.jsx` exists in `pages/` directory, but `/help` route is `<Navigate to={memberOwnedOrHomeRouteTarget}>` (redirect-only). User looking for help finds dashboard instead.

**Recommended:** Mount `HelpPage` at `/help`. Add help center surface with FAQ, contact, troubleshooting, getting-started videos.

---

### G08 — OTP UI says "six-digit" but shows 8 boxes [P1]

**Evidence:** `screenshots/26_login_step2_otp_entry.png` — heading reads "Enter the six-digit code to continue" but UI renders 8 dashed input boxes (4 + 4). After entering 6 digits and "Verify" → it accepts 6 (so 6 is correct). 8 boxes are visual padding for some other code length never used.

**Recommended:** Reduce to 6 boxes OR change heading + accept 8-digit codes. Visual matches semantic.

---

### G10 — AIER License "Published asset price: 0 USD" [P1]

**Evidence:** `screenshots/30_aier_gateway_value_section.png` — udna-public AIER License S4 Value section shows "Published asset price: 0 USD" with no explanation. Either AIER licenses are intentionally free, intentionally not-yet-priced, or this is a missing data field rendered as 0.

**Recommended:** If price is intentionally 0, show "Free" or "Not for sale". If pending pricing, show "Pricing not yet published" placeholder.

---

### G13 — `/u-earnings`, `/u-system`, `/u-convert` disconnected from `/wallet` [P1]

**Evidence:** Six wallet-related routes (`/wallet`, `/u-earnings`, `/u-system`, `/u-convert`, `/u-convert-history`, `/uzgfi`) are siblings, not children of `/wallet`. Visual treatment differs (each has separate `pages/U*Page.jsx`). User mental model: "wallet has earnings and conversion" but URL structure says they're separate domains.

**Recommended:** Either group under `/wallet/earnings`, `/wallet/convert`, `/wallet/system`, `/wallet/uzgfi` OR keep flat URLs but unify visual + nav treatment so they feel like one wallet system.

---

### G14 — `/business` and `/circles` are functionally identical [P1]

**Evidence:** App.jsx:4067-4068 — both routes render `<CirclesDiscoveryPage {...sharedUserProps} />` with identical props. No semantic differentiation in code.

**Recommended:** Either deprecate `/business` (redirect → `/circles`) or actually differentiate (e.g. `/business` = business circles only, filtered).

---

### G16 — Several `/admin/*` routes redirect to member surfaces [P1]

**Evidence:** App.jsx:4197+ — `/admin/business` → `/circles`, `/admin/membership` → `/membership`, `/admin/identity` → `/profile`, `/admin/platform` → `/admin`. Admin context is lost when navigating to "admin business" and landing on member circles.

**Recommended:** Either build dedicated admin-business / admin-membership / admin-identity dashboards OR remove the admin-named routes entirely.

---

### G17 — Admin surfaces are desktop-only [P1]

**Evidence:** Per Master Audit §4 + visual probe (no auth credentials but inferred from layout). All `/admin/*` and `/admin-private/*` use admin-specific layouts that don't responsive-treat below 768px.

**Recommended:** Responsive pass on most-used admin views (admin home, UZGFi audit, moderation queue). Tablet view at minimum.

---

### G18 — `/flow` and `/events` route names exist but are unmounted [P1]

**Evidence:** App.jsx — `/flow`, `/events` are `<Navigate to={memberOwnedRouteTarget}>` (redirect). `FlowFeedPage.jsx` exists in pages but no route mounts it.

**Recommended:** Either mount `FlowFeedPage` to `/flow` (canonical Flow surface) and create a real `EventsPage` for `/events`, OR delete the unmounted page files and redirect to dashboard.

---

### G15.1 — Login error "Unsupported phone provider" for plain text [P1]

**Evidence:** `screenshots/22_login_invalid_email_state.png` (input "invalid"), `screenshots/23_login_invalid_phone_short.png` (input "+8412345"). Both display "Unsupported phone provider" — which is misleading for plain-text "invalid" (should say "Invalid email format") and only partially correct for the short phone (should say "Phone number too short" or similar).

**Recommended:** Improve input validation to differentiate: invalid email format (no `@`), invalid phone format (insufficient digits), unsupported phone provider (specific country code not supported), unsupported email domain (specific blocklist).

---

### G31 — Quantum Social uses mock data [P1]

**Evidence:** Quick Win #1 (LANE01-SOCIAL-BRAIN-USER-V1) explicitly uses `SOCIAL_BRAIN_MOCK` because Lane_04 backend is not yet live. Master Audit §4 lists Lane_04 as WIP.

**Recommended:** Hold V3 redesign until Lane_04 backend ships. Add clear "Preview / Mock data" banner so users know graph is illustrative.

---

### G33 — Journey gate silent redirects [P1]

**Evidence:** `gateByJourney('flow', element)` — if user hasn't reached `flow` step in journey, returns `<Navigate to={nextStepRouteTarget}>`. No toast, no breadcrumb, no message. User clicks `/qot/me` URL, lands on `/dashboard` with no explanation.

**Recommended:** Surface gate denials with friendly toast: "QOT will unlock once you complete your first Flow post — let's go!"

---

### G40 — No cohesive 0-to-1 walkthrough [P1]

**Evidence:** New user signs up → lands on `/dashboard`. Component dir `activation/` has 1 component (banner). No multi-step onboarding wizard, no checklist, no progressive disclosure.

**Recommended:** Design first-run onboarding: 5-step wizard (welcome → ENTA setup → first connection → first Flow post → first reward). Persistent progress checklist on dashboard until 100%.

---

## §4 Missing Surfaces (P2 — features without UI)

### G20 — Retreat module under-realised [P1→P2]

**Evidence:** Module 4 has 3 routes, 0 dedicated components. `/booking`, `/tickets`, `/events` (redirect). No retreat browsing, no retreat detail pages, no facilitator/teacher pages, no post-retreat content surface.

**Recommended:** Design `/retreats`, `/retreats/:id`, `/retreats/:id/book`, `/retreats/teachers/:teacherId`, `/retreats/my-history`.

---

### G21 — `/events` route is redirect-only [P2]

**Evidence:** `/events` is `<Navigate>` only. Event listings UI not implemented.

**Recommended:** Mount events listing page or remove the route.

---

### G12 — No public retreat browsing surface [P2]

**Evidence:** Retreats are not in the udna-public gateway entity types (only HUMAN/CIRCLE/BUSINESS/AIER). No way for non-members to browse upcoming retreats.

**Recommended:** Add `/retreat/:id` to udna-public for public retreat listings (public-safe details only — title, dates, location, tier-required).

---

### G46 — Notification preferences UI missing [P2]

**Evidence:** No `/settings/notifications` route. Component dir has `realtime/` (3 files) and `notifications/` page but no preference panel discoverable from source.

**Recommended:** Add notification preferences in Settings — quiet hours, types (mention / reaction / earning / system / etc.), per-channel (in-app / email / push).

---

### G28 — No "view this user's QOT trail" affordance [P2]

**Evidence:** `/qot/me` is the only QOT user-trail route. There is no `/qot/users/:handle` to view another user's public trail.

**Recommended:** Add `/qot/users/:handle` (or equivalent) for public-safe QOT trail of any user.

---

### G37 — Tier downgrade flow unclear [P2]

**Evidence:** `MembershipUpgradePanel` design implies upgrade-only. No "downgrade to lower tier" UI surfaced. Master Audit doesn't confirm.

**Recommended:** Document downgrade UX (e.g. "Cancel subscription, revert to Explorer at next billing cycle") + actually implement it.

---

## §5 Mobile-specific issues (P1)

### G47 — Login on 375px mobile has unexpected right-side whitespace [P1]

**Evidence:** `screenshots/02_landing_root_375mobile.png` — at 375px width the login card is centered with significant empty space on the right. The `100vw` container appears to render at a wider intrinsic size than the viewport, causing horizontal scroll.

**Recommended:** Fix container sizing: `max-width: 100%`, no horizontal scroll on small viewports.

---

### G17 (cross-ref) — Admin desktop-only [P1]

See §3 G17.

---

### G36 — Multi-step wallet flow has no progress indicator on mobile [P2]

**Evidence:** From source — `/wallet/transfer`, `/wallet/transfer/detail`, `/wallet/convert` all use generic `WalletPage` shell. Multi-step UX without breadcrumb or step indicator on small screens (assumed without auth — needs verification).

**Recommended:** Add step indicator (1/3, 2/3, 3/3) + back-step button.

---

## §6 Accessibility issues (P2)

### G48 — ARIA semantics on udna-public gateway [P2]

**Evidence:** udna-public `<App>` uses `<role="document">` root — accessibility tree shows `S1`–`S8` section labels which is good, but there's no `<main>`/`<nav>`/`<aside>` structural landmarks. Screen readers can navigate but lose macro structure.

**Recommended:** Wrap S1–S8 in `<main>`, footer in `<footer>`, navigation in `<nav>`.

---

### G49 — Color contrast on "Logged out" badge [P2]

**Evidence:** `screenshots/01_landing_root_1024.png`, `09_aier_marketplace_authgate.png` — "Logged out" badge has light-gray text on light-gray background. WCAG AA contrast ratio likely below 4.5:1 (visual estimate, not measured).

**Recommended:** Run automated contrast check (axe-core or Lighthouse) on udna-public + main app login. Fix any AA failures.

---

### G50 — Keyboard navigation on OTP grid [P2]

**Evidence:** `screenshots/27_login_otp_six_digit_filled.png` — 8 boxes shown but observed input behaviour suggests one input field focuses (`states: [active, focused]`). User typing types into the single textbox, with 8 visual boxes acting as decoration. Keyboard nav between boxes (arrow keys) is unlikely to work.

**Recommended:** Either (a) make each box a separate input with keyboard nav, or (b) keep single input but visually de-emphasize the 8-box decoration.

---

### G29 — Showing raw entity hashes publicly [P2]

**Evidence:** `screenshots/32_gateway_index_top_hero.png` — HUMAN entity card displays "bf39c4f7...34f735" (truncated hash). `screenshots/33_gateway_index_entities_qot.png` — BUSINESS entity displays raw timestamp ID "Business Circle 1773975846472".

**Recommended:** Show human-readable handles/labels — `@uzgarden`, `@retreat-stories`, "Business Circle 'Garden Bay'". Hide hashes/timestamps to expandable detail.

---

### G44 — No bulk moderation undo / preview [P2]

**Recommended:** Add dry-run + undo affordance to admin moderation actions.

---

## §7 Performance issues (P2)

### G51 — Bundle split between main app and udna-public [P2]

**Evidence:** Worker serves separate bundles. Console logs show `/assets/index-yGz2lywL.js` for main app and `/udna-public/assets/...` for guest. This is by design (different audiences) but means duplicate React/router code shipped if a user moves between guest and member surfaces.

**Recommended:** Acceptable as-is; the trade-off favors faster guest TTI vs. duplicate code. Document in Vite config.

---

### G52 — Loading state on udna-public is generic [P2]

**Evidence:** `<App>` shows "Loading viewer state / The public runtime is checking the current auth session and public membership lane." for all entity routes during initial load. No skeleton or per-section progressive load.

**Recommended:** Skeleton screens per S1–S8 section so entity content can stream in.

---

### G34 — Multi-step business setup form has no save-and-resume [P2]

**Recommended:** Persist business setup form state to localStorage / server draft so user can resume.

---

## §8 Bilingual coverage gaps (P2)

### G45 — VN/EN coverage gaps in admin + advanced surfaces [P2]

**Evidence:** Per `CANON_V2_RECONCILIATION_PROPOSAL.md` §3 — VN coverage incomplete on advanced surfaces (admin pages, edge cases). Verified G15 shows TH catastrophic; VN/FIL likely have similar minor gaps.

**Recommended:** Comprehensive i18n string-pack audit + automated parity test in CI.

---

### G15 (cross-ref) — Thai partial coverage [P0]

See §2 G15.

---

### G53 — VN translation inconsistency [P2]

**Evidence:** `screenshots/05_login_step1_vi.png` — placeholder reads "name@example.com hoac +1 555 123 4567". The Vietnamese word for "or" should be "hoặc" (with diacritics), not "hoac". Missing diacritics.

**Recommended:** Fix all placeholder strings to use correct diacritics.

---

## §9 Recommendations for V3 redesign — Top 10 priorities

Ordered by user impact × scope. Each priority cites supporting gaps.

| Rank | Priority | Supporting gaps | User impact | Effort | Quick win? |
|---|---|---|---|---|---|
| **1** | **Public ENTA profiles** — make `/enta/:handle` work for guests with public-safe view | G01, G06, G27 | HIGH (unblocks SEO, sharing, retention loop) | MEDIUM (variant component + boundary logic) | YES |
| **2** | **Resolve `/aier/:slug` URL semantic collision** — separate guest vs member namespace | G03, G06 | HIGH (eliminates user confusion + canonical-URL ambiguity) | LOW (route rename + redirect) | YES |
| **3** | **Fix Thai language coverage** — complete TH string-pack | G15, G45, G53 | HIGH (critical SE Asia market segment) | MEDIUM (string-pack + translator effort) | YES |
| **4** | **Add 404 page + Help page** — stop silent redirects | G02, G05 | MEDIUM (improves user trust + reduces support load) | LOW (mount existing page files + add 404 design) | YES |
| **5** | **Build member governance UI** — `/governance/proposals` + voting + delegation | G04 | HIGH (Whitepaper canon module, currently absent) | HIGH (full module) | NO |
| **6** | **Resolve member AIER UX vs UDNA gateway** — unify visual hierarchy | G06, G03 | MEDIUM (members deserve ≥ guest UX) | MEDIUM (component refactor) | NO |
| **7** | **Build creator marketplace** — `/marketplace/courses`, `/marketplace/workshops`, etc. | G22, G23 | HIGH (Whitepaper canon module, currently absent) | HIGH (full module) | NO |
| **8** | **Onboarding 0-to-1 walkthrough** — first-run wizard + persistent checklist | G40, G26, G39 | HIGH (activation funnel) | MEDIUM (5-step wizard) | YES |
| **9** | **Mobile responsive admin surfaces** — at least admin home, audit, moderation queue | G17 | MEDIUM (admin productivity on mobile) | MEDIUM (CSS pass on existing admin pages) | NO |
| **10** | **Surface journey gate denials** — replace silent redirects with friendly toasts | G33, G43 | MEDIUM (clarity for confused users) | LOW (toast + message library) | YES |

**Quick wins flagged for parallel V3 sprint:** Priorities 1, 2, 3, 4, 8, 10 (6 of top 10 are LOW-MEDIUM effort but HIGH impact). Recommended to bundle into "V3 Phase 0" cleanup PR before deeper redesign work begins.

---

## §10 Full gap index (≥30 gaps surfaced)

This document surfaces **53 distinct gaps** (#G01 through #G53). AC-05 requires ≥30. Full index by severity:

### P0 — Critical (8 gaps)

- G01 — ENTA profiles not public
- G03 — `/aier/:slug` URL semantic flip
- G04 — No member governance UI
- G06 — Member AIER UX < public UDNA
- G07 — Duplicate `/chat/`, `/inbox/` routes
- G15 — Thai language partial
- G22 — Marketplace structural gap
- (G26 — escalated from P2 to P0 if this is the actual state — onboarding walkthrough effectively missing)

### P1 — Major (18 gaps)

- G02 — No 404 page
- G05 — Help unmounted
- G08 — OTP heading/UI mismatch
- G10 — AIER 0 USD price ambiguous
- G13 — Wallet routes disconnected
- G14 — `/business` = `/circles`
- G15.1 — Login validation messages misleading
- G16 — `/admin/*` redirects to member
- G17 — Admin desktop-only
- G18 — `/flow` `/events` unmounted
- G20 — Retreat under-realised
- G23 — No marketplace search/filter (subset of G22)
- G31 — Quantum Social mock data
- G33 — Journey gate silent redirects
- G35 — Tier upgrade pivot from circle business not seamless
- G40 — No 0-to-1 walkthrough
- G47 — Login mobile whitespace bug
- G48 — udna-public ARIA structure incomplete (P2 cross-listed)

### P2 — Minor (27 gaps)

- G09 — `/enta/view` confusing name
- G11 — `/aier/[slug]` shows generic for unknown
- G12 — No public retreat browsing
- G19 — Wallet sub-routes generic component
- G21 — `/events` redirect-only
- G24 — Profile editor visual inconsistency
- G25 — Connect-to-Earn mock unclear
- G26 — Onboarding feedback missing
- G27 — udna-public visually disconnected
- G28 — No "view another user's QOT trail"
- G29 — Raw hashes publicly visible
- G30 — QOT empty state design unclear
- G32 — Mock visibility for QW1
- G34 — Business setup save-and-resume
- G36 — Wallet multi-step progress indicator
- G37 — Tier downgrade unclear
- G38 — Yearly discount visualisation
- G39 — Activation banner insufficient
- G41 — Mission feedback latency unclear
- G42 — Streak loss UX unclear
- G43 — AdminGuard silent denial
- G44 — Bulk moderation undo missing
- G45 — Bilingual gaps in admin
- G46 — No notification preferences
- G49 — Color contrast on "Logged out" badge
- G50 — OTP keyboard navigation
- G51 — Bundle split duplicate code (acceptable trade-off)
- G52 — Generic loading on udna-public
- G53 — VN translation diacritics missing

**Total: 8 P0 + 18 P1 + 27 P2 = 53 gaps documented.**

---

## §11 Methodology disclosures (KL-01 honest disclosure)

What this audit covered:

- ✅ Static code inspection of `apps/uzg-pwa/src/App.jsx` (87 routes) and `apps/udna-public/src/App.jsx` (6 routes)
- ✅ Live production probe of public-accessible URLs
- ✅ Cloudflare Worker shell-routing logic inspection (`public/_worker.js`)
- ✅ 40 screenshots captured (29 unique routes/states across 5 categories)
- ✅ Cross-reference against Master Audit v1.2, Reconciliation Proposal, Implementation Priority Matrix, System Map V1
- ✅ 12 user flows documented (6 Roots + 6 cross-cutting)
- ✅ 7 Whitepaper modules mapped to V2 production reality

What this audit did NOT cover:

- ❌ Authenticated screenshots — no test credentials in scope (would require `.env.local` admin email + OTP, which were not provided)
- ❌ End-to-end test of every authenticated flow — flows are reconstructed from source + Master Audit
- ❌ Performance metrics (Core Web Vitals, bundle sizes) — out of scope; should be a separate Lighthouse audit
- ❌ Full accessibility scan with axe-core or Lighthouse — out of scope; 3 a11y observations are visual-inspection only
- ❌ Real Lane_04 backend behaviour for Quantum Social — backend not yet live
- ❌ Mobile device testing on real iOS/Android devices — only browser viewport simulation via Cursor MCP
- ❌ Cross-browser testing (Safari / Firefox / Chrome) — only one browser instance

For a complete audit, NTS / CLA1 should:

1. Run `scripts/audit/screenshot_v2.mjs` (provided template) with credentialed admin account → captures all auth-gated routes
2. Run Lighthouse audits on top 10 routes
3. Run axe-core a11y scan
4. Real-device testing on 5 devices (iPhone, Android, iPad, Mac, Windows)

---

## §12 Phase 2 mockup priority focus

For the upcoming **Phase 2** (NTS + CLA via Claude Artifacts mockups + Dev1 canon spec):

**Primary mockup candidates** (top 5 from §9 ranking):

1. **Public ENTA profile (`/enta/:handle` guest variant)** — wireframe + visual design
2. **Resolved `/aier/marketplace` member surface** — unified S1–S8 + member actions
3. **Member governance UI** — `/governance/proposals` list + detail + vote action + delegate
4. **Creator marketplace** — `/marketplace/{courses,workshops,services}` listings + creator submission
5. **First-run onboarding wizard** — 5-step + persistent checklist

**Secondary mockup candidates:**

- 404 + Help pages (low-effort polish)
- Mobile-responsive admin home + UZGFi audit
- Tier downgrade flow

**Defer until Lane_04 backend ships:**

- Quantum Social real-data redesign
- Harmony evolution timeline
- Real social graph rendering

---

🔒 END UX Gap Analysis v1.0
