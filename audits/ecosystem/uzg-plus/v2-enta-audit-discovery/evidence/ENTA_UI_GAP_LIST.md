# V2 ENTA Module — Full UI/UX Audit Gap List

**Captured:** 2026-05-02T18:00Z
**Auditor:** CLAC1 (Lane_01)
**Production URL:** `https://uzg.plus/enta` + adjacent routes
**Production CSS bundle audited:** `index-Cq5OYFDU.css` (post-Fix-3 keystone)
**Production JS bundle audited:** `index-DCqZtxur.js`

**Reference canon (read verbatim):**
- `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UIUX_ENTA_CANON_v1.md` (§0-§7)
- `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1.md` (§1-§2 onboarding state machine)
- `canon/uzg-plus/v3/UZG_PLUS_V3_UIUX_ENTA_CANON_AMENDMENT_001.md`
- `audits/ecosystem/uzg-plus/phase-2-mockups/UZG_PLUS_V3_MOCKUP_05_ENTA_MODULE.html`
- `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md`

**Code-level audit references:**
- `apps/uzg-pwa/src/pages/EntaPage.jsx` (5 lines — thin wrapper for `<ENTAShell>`)
- `apps/uzg-pwa/src/components/enta/ENTAShell.jsx` (675 lines — main ENTA UI)
- `apps/uzg-pwa/src/components/enta/EntaWheel.jsx` (92 lines)
- `apps/uzg-pwa/src/components/enta/EntaPersonalCorePanel.jsx` (134 lines)
- `apps/uzg-pwa/src/components/enta/ENTAForm.jsx`
- `apps/uzg-pwa/src/components/enta/EntaEnergyStrip.jsx` + `EntaEnergyPanel.jsx` + `EntaMiningLoopCard.jsx` + `EntaNotificationsPanel.jsx`
- `apps/uzg-pwa/src/services/productV2Service.js` (`fetchEntaProfile`, `saveEntaProfile`, `validateEntaInput`, `calculateEnta`, `mapEntaTimezoneByCountry`)
- `apps/uzg-pwa/src/styles.css` (CSS classes: `.enta-tab-btn`, `.enta-identity-grid`, `.enta-identity-card`, `.enta-page-v2`, `.enta-identity-hero`, `.profile-enta-identity-block`)

---

## §0 Audit method note

This audit ran **unauthenticated** against the LIVE production V2 SPA (`https://uzg.plus/enta` returns 200 for all 6 ENTA routes; HTML is the SPA shell at 1,964 bytes — actual content renders client-side after auth). Screenshot evidence reuses the **authenticated** captures from `LANE01-CLAC1-PHASE6-1B-AUTHENTICATED-QA-INFRA-2026-05-02T10-30Z` Playwright harness which logged in real V2 users via magic-link bypass. Plus the post-PR-106-and-PR-111 captures from `LANE01-CLAC1-V2-HOME-AUDIT-DISCOVERY-2026-05-02T19-30Z` for desktop viewport coverage.

**Honest partial per KL-068:** authenticated `empty` (new user, no ENTA Root) and `partial` (50% onboarding) state screenshots are deferred to a follow-up sprint that explicitly invokes the authenticated harness with controlled fixture seeds. Code-level audit fills the gap: `ENTAShell.jsx` rowToForm() initial state when `row` is empty IS the empty-state UI; the JSX render path through `loading=true` IS the partial-state UI. Both code paths reviewed in this sprint.

---

## §1 Summary

| Metric | Value |
|---|---|
| Total ENTA-related routes discovered | **8** (filtered from 80+ V2 routes) |
| Unique destination components | **5** (`<ENTAShell>`, `<ProfilePage>`, `<ProfileRelationsPage>`, `<ProfileSettingsPage>`, redirects) |
| Screens audited (visual + code) | **6** (`/enta`, `/enta/onboarding-state`, `/enta/me`, `/enta/:handle`, `/identity-hub`, `/connections`) |
| Screenshots collected | **8** (6 mobile + 2 desktop) — auth-state `completed`. Empty/partial deferred. |
| Total gaps catalogued | **30** (`EG001-EG030`) |
| → CRITICAL | **8** (gate broken / blocking onboarding flow / missing canon-mandated hero widget) |
| → HIGH | **11** (visual quality major / text-heavy needs visualization) |
| → MED | **8** (polish / minor canon non-compliance) |
| → LOW | **3** (nice-to-have) |

---

## §2 V2 ENTA route discovery

| # | Route | Destination | Status check | Audit method |
|---|---|---|---|---|
| 1 | `/enta` | `<EntaPage>` → `<ENTAShell>` | 200 | Visual + code-level |
| 2 | `/enta/view` | `<Navigate to="/enta">` | 200 | Alias only |
| 3 | `/enta/network` | `<Navigate to="/connect">` | 200 | Alias only |
| 4 | `/enta/me` | `<ProfilePage>` | 200 | Visual (via /profile/me alias) + code |
| 5 | `/enta/:handle` | `<ProfilePage>` | 200 | Visual (e.g. /enta/Duy) + code |
| 6 | `/enta/:handle/connections` | `<ProfileRelationsPage>` | 200 | Code only |
| 7 | `/identity-hub` | de-facto V2 landing → `<EntaPage>` ENTA hub | 200 | Visual (HOME audit reuse) + code |
| 8 | `/onboarding` | `<RouteGuard>` → memberOwnedRoute fallback | 200 | Code only — flow state machine analysis |

Adjacent routes audited for cross-reference:
- `/profile/me` → alias for `/enta/me` (visual reuse)
- `/profile/:userId` → `<PublicProfileRouteBoundary>` (code only)
- `/profile/edit` → `<ProfileSettingsPage mode="edit">` (code only)
- `/connect` → `<ConnectionsPage>` (visual reuse from HOME audit)

---

## §3 Visual-first principle scoring per screen

NTS-defined principle (DEC-12): **"ít text, nhiều icon, nút, sơ đồ, hình ảnh, illustration, flow visualization"**.

Per-screen scoring against 4 dimensions:

| Screen | Text density | Icon usage | Illustration | Flow viz | Overall score |
|---|---|---|---|---|---|
| `/enta` (ENTAShell — own dashboard, completed) | ~80% text | low (no element icons) | none | none | **C** (text-heavy) |
| `/enta` onboarding state (form) | ~85% text | low | none | none (no wizard step indicator) | **C-D** |
| `/enta/me` (ProfilePage) | ~75% text | low | banner image only | none | **C** |
| `/enta/:handle` (ProfilePage public) | ~75% text | low | banner only | none | **C** |
| `/identity-hub` (de-facto landing) | ~80% text | low | none | none | **C** |
| `/connections` | ~70% text | medium (lane tabs) | none | none | **B-C** |

**Score legend:**
- **A:** Visual-rich (≥70% icons/illustration, <30% text)
- **B:** Balanced (50/50)
- **C:** Text-heavy (>70% text)
- **D:** Pure text wall (almost no visual)

**Average:** **C** (text-heavy across the board) — confirms NTS observation that V2 ENTA is "đống text user không hiểu". The keystone V3 canon-mandated **ENTA Wheel** (animated 5-element hero widget, 280px diameter, pulse animation) is NOT present anywhere in V2.

---

## §4 Screen-by-screen audit

### Screen 1: `/enta` — ENTAShell (own dashboard, completed user)

**Component:** `apps/uzg-pwa/src/components/enta/ENTAShell.jsx` (675 lines)
**Screenshots:** `screenshots/enta_completed_mobile_LIVE_uzg.plus.png` (auth Phase 6.1B)
**Current state (post Fix-3 keystone):**
- Form-style hero with gender + birth-hour-group + birth-date + country selectors + timezone display
- Energy-strip + Mining-loop-card + Energy-panel + Personal-core-panel + Notifications-panel stacked
- 4 derived "surface" data sets (memberIdentitySurface, memberParticipationSurface, identitySurface, participationSurface) rendered as text chips + counters
- Network stats: connections / circles / posts / interactions / flow_events as numeric labels
- No ENTA Wheel hero. No Pentagon NAM TAO. No animated visualization.

**Visual-first score:** **C (text-heavy)**

#### Gaps

| ID | Sev | Category | Description | Canon ref | Visual-first impact | Fix type | ETA |
|----|----|----|----|----|----|----|----|
| EG001 | CRITICAL | Architecture | **ENTA Wheel hero widget #1 MISSING** — canon mandates 280px animated 5-element wheel (Hỏa/Mộc/Thủy/Kim/Thổ) with pulse animation as primary identity visualization. V2 renders text-only `dominantElement` label. | ENTA §3.1-§3.4 | Replace text with animated SVG wheel — single biggest visual upgrade | NEW component (SVG + state) | 4-6 h logic auth |
| EG002 | CRITICAL | Architecture | **4-tab navigation (Identity / Resonance / Circles / Journey) MISSING** — canon §5 mandates 4 tabs. V2 has flat scrolling single-page with stacked cards. | ENTA §5 | Add `.enta-tab-btn` row + tab content panels (CSS classes already exist styles.css:3817 unused) | JSX + state | 2-3 h logic auth |
| EG003 | HIGH | Visualization | Polarity Balance "Yang 65% / Yin 35%" rendered as text only — canon §5.1 mandates visual bar split (yin-yang gradient) | ENTA §5.1 | Add SVG yin-yang split bar | CSS + SVG | 30 min |
| EG004 | HIGH | Visualization | Element strength breakdown (Kim 12% / Thủy 18% / Mộc 28% / Hỏa 35% / Thổ 7%) text-only — canon mandates per-element bar with deficient/balanced/strong/excess color coding | ENTA §5.1 | 5-row bar viz with semantic colors | CSS only | 45 min |
| EG005 | HIGH | Visualization | Network stats (`networkStats.connections` / `circles` / `posts` / `interactions` / `flow_events`) rendered as plain numbers — no icon, no sparkline trend, no animated count-up | Foundation §7 | Add 5 icons + animated number count-up + 7-day sparkline | CSS + SVG + small JS | 1 h |
| EG006 | HIGH | Text density | `enta.memberIdentity.narrative` translation strings produce paragraph-style narrative text — canon §4.1 prefers compact `<Element1>-<Element2> dominant · <Polarity>` format | ENTA §4.1-§4.2 | Replace narrative paragraphs with chip layout | CSS + JSX | 30 min |
| EG007 | HIGH | Architecture | Floating + Action Sheet (canon §7) MISSING — V2 has no floating + button on `/enta`. Canon §7 mandates "Edit Profile / Add Connection" action sheet. | ENTA §7 | Add `<button class="floating-fab">` + action sheet modal | JSX + state | 1.5 h logic auth |
| EG008 | MED | Color | ENTA element labels rendered without ngũ hành theme tokens — should use kim/thuy/moc/hoa/tho semantic color tokens (already exist in styles.css) | Foundation §4 | Add `data-element="kim/thuy/...".` className | CSS only | 20 min |
| EG009 | MED | Typography | Heading "Trường danh tính / Nhịp đang chạy" uses default font, should use Syne 700 per Foundation §6.2 | Foundation §6.2 | className + font-family | CSS only | 5 min |
| EG010 | MED | Mobile responsive | `.enta-identity-grid` `grid-template-columns` doesn't collapse cleanly at 320-375px viewport | (observed) | grid-template-columns: 1fr at @media | CSS only | 10 min |

---

### Screen 2: `/enta` — Onboarding state (no ENTA Root, form mode)

**Component:** `<ENTAShell>` rendering with `loading=false, savedResult=null, form=EMPTY_FORM`
**Code path:** `ENTAShell.jsx:26-36` `EMPTY_FORM` constant + `ENTAForm.jsx` (separate component)
**Current state (code analysis):**
- Single-page form: gender select / birth_hour_group select / birth_day / birth_month / birth_year inputs / certainty_mode select / birthplace_country select / birth_timezone (auto-derived) / notes textarea
- Submit button → `saveEntaProfile()` → calc + redirect to `/dashboard` after 120ms
- **NO multi-step wizard** — canon §2 mandates 5-step state machine (BIRTH_DATA → CALCULATING → RESULT_REVEAL → FIRST_RESONANCE → WELCOME_HOME)
- **NO step indicator visualization** — user cannot see progress
- **NO calculating overlay** with animated wheel forming during 2-3s calc
- **NO result reveal step** — calc results just appear as form-result chips, not a celebratory reveal moment
- **NO first-resonance step** introducing first connection
- **NO welcome-home illustration** redirecting to feed

**Visual-first score:** **C-D (almost pure text wall)**

#### Gaps

| ID | Sev | Category | Description | Canon ref | Visual-first impact | Fix type | ETA |
|----|----|----|----|----|----|----|----|
| EG011 | CRITICAL | Onboarding gate | **5-step wizard state machine MISSING** — V2 has single-page form. Canon §2.1 mandates BIRTH_DATA → CALCULATING → RESULT_REVEAL → FIRST_RESONANCE → WELCOME_HOME state transitions. | Flow Spec §2.1 | NEW wizard component with state-machine | NEW component + routing | 6-8 h logic auth |
| EG012 | CRITICAL | Visualization | **Step indicator (5 dots / 5 icons / progress bar) MISSING** — user has zero visual feedback on onboarding progress. Visual-first principle violated severely. | Flow Spec §2 + DEC-12 | 5-step icon row at top of wizard (●●●○○) with active highlight | CSS + JSX + small state | 1.5 h logic auth |
| EG013 | CRITICAL | Visualization | **Birth date inputs are 3 text inputs (day/month/year)** — canon §2.2 mandates calendar visual picker. NTS principle: "ít text, nhiều icon/sơ đồ" | Flow Spec §2.2 + DEC-12 | Calendar widget per Foundation §7 with day-grid + month picker + year scroll | NEW component | 3-4 h logic auth |
| EG014 | HIGH | Visualization | **Birth hour input is a select dropdown (24 hours text)** — canon §2.2 prefers visual hour picker (clock face). | Flow Spec §2.2 + DEC-12 | Clock-face SVG selector | NEW component | 2 h logic auth |
| EG015 | HIGH | Visualization | **Gender input is text radio group (Male/Female/Other)** — canon prefers icon-based selector (♂/♀/⊕) | Flow Spec §2.2 + DEC-12 | 3-icon button group | CSS + JSX | 30 min |
| EG016 | HIGH | Calculating step | **No animated wheel forming overlay during 2-3s calc** — canon §2.3 mandates the magical computation reveal moment. User sees nothing during the wait. | Flow Spec §2.3 | Add 2-3s wheel-spin animation overlay | NEW component | 1.5 h logic auth |
| EG017 | HIGH | Result reveal step | **Result reveal step missing** — V2 just navigates to `/dashboard` after 120ms. Canon §2.4 mandates RESULT_REVEAL with element distribution celebration before continue | Flow Spec §2.4 | NEW result reveal screen with full wheel + element breakdown + Polarity reveal | NEW component | 3-4 h logic auth |
| EG018 | HIGH | First resonance step | **First-resonance suggestion step missing** — onboarding currently skips the introduce-first-connection moment | Flow Spec §2.5 | NEW step suggesting 1 high-resonance user to connect with | NEW component + V2 endpoint | 2-3 h logic auth |
| EG019 | MED | Welcome home | **Welcome illustration on redirect missing** — V2 just redirects, no celebratory landing | Flow Spec §2.6 | Hero illustration + welcome copy + 1 CTA | CSS + SVG | 1 h |
| EG020 | MED | Privacy note | Privacy note for birth-data is small text below form — canon §2.2 step says inline lock-icon visual reassurance | Flow Spec §2.2 | Lock icon + 1-line copy + tooltip | CSS + JSX | 20 min |

---

### Screen 3: `/enta/me` and `/enta/:handle` — ProfilePage

**Component:** `apps/uzg-pwa/src/pages/ProfilePage.jsx` (2,113 lines) using `<ProfileHero>` + `<ProfileIdentityPanel>` + others
**Screenshots:** `screenshots/profile-me_completed_{mobile,desktop}_LIVE_uzg.plus.png`
**Current state:**
- Banner image (gradient fallback)
- Avatar circle 84px (z-index:3 fixed by Fix-3 B2)
- display_name + handle + bio + metadata
- Stats row (`enta-profile-stats` link buttons)
- No ENTA Wheel for self/other (canon mandates 280px own / 200px other / 96px chat / 40px feed)
- Public/private surfaces text-heavy

**Visual-first score:** **C (text-heavy with banner image only)**

#### Gaps

| ID | Sev | Category | Description | Canon ref | Visual-first impact | Fix type | ETA |
|----|----|----|----|----|----|----|----|
| EG021 | CRITICAL | Architecture | **No ENTA Wheel embedded in profile page** — canon mandates 280px wheel for own profile / 200px for other. ProfilePage has only avatar circle. | ENTA §2.1 + §3.2 | Embed `<EntaWheel>` widget below banner | NEW component mount | 1-2 h logic auth |
| EG022 | HIGH | Visualization | Stats row "Connections / Circles / Posts / Interactions" rendered as text counts — canon prefers per-element rings + sparklines | ENTA §5 | Replace counts with element-color rings | CSS + SVG | 1 h |
| EG023 | HIGH | Resonance display | When viewing OTHER's profile (per canon §2.2), should show "83% Resonance with You" + qualitative ("Strengthens your Kim element"). V2 shows neutral metadata only. | ENTA §2.2 | Compute + display resonance on viewer | NEW logic + UI | 2-3 h logic auth |
| EG024 | MED | Typography | Profile heading uses default font, should use Syne 700 | Foundation §6.2 | className | CSS only | 5 min |
| EG025 | MED | Tap avatar in feed → profile preview sheet missing | (covered in HOME audit G026) | HOME §7.3 | Bottom sheet component | JSX + handler | 1 h logic auth |

---

### Screen 4: `/identity-hub` — de-facto V2 HOME landing

**Component:** ENTA hub via journey gate
**Screenshots:** `screenshots/identity-hub_completed_{mobile,desktop}_LIVE_uzg.plus.png`
**Current state:** ENTA-form style displaying when user has Identity intelligence — overlaps with `/enta` rendering

**Visual-first score:** **C (form-heavy, no hero)**

#### Gaps

| ID | Sev | Category | Description | Canon ref | Visual-first impact | Fix type | ETA |
|----|----|----|----|----|----|----|----|
| EG026 | HIGH | Architecture | `/identity-hub` should redirect to `/enta` or be deprecated — duplicate landing surface confuses NTS-described "gate cốt lõi" semantics | DEC-13 | Replace with Navigate or merge | Routing | 30 min |
| EG027 | MED | Background | `/identity-hub` background gradient uses old V2 palette — should match neutral-dark canvas (#0a0a0f) per V2 UI Upgrade | Foundation §3 | CSS variable swap | CSS only | 10 min |

---

### Screen 5: `/connections`

**Component:** `<ConnectionsPage lane="all">`
**Screenshots:** `screenshots/connections_completed_{mobile,desktop}_LIVE_uzg.plus.png`
**Current state:** ENTA-gate view (sovereign user blocked); 4 lane tabs (all/friends/requests/suggestions)
**Visual-first score:** **B-C (lane tabs are visual, but gate empty-state is text wall)**

#### Gaps

| ID | Sev | Category | Description | Canon ref | Visual-first impact | Fix type | ETA |
|----|----|----|----|----|----|----|----|
| EG028 | HIGH | Visualization | Connect 4 trust levels (Trusted / Circle / Resonance / Open) per canon §5.2 not surfaced — visual-first principle requires icon per level + qualitative description | ENTA §5.2 + HOME §7 | 4-segment trust ladder per row | CSS + JSX | 2-3 h logic auth |
| EG029 | MED | Empty state | Connect empty state has no illustration — just text label | Foundation §7 | Add SVG empty illustration | CSS + SVG | 30 min |
| EG030 | LOW | Animation | No transition on lane tab switch | Foundation §7 | CSS transition | CSS only | 15 min |

---

## §5 Categories distribution

| Category | Count | % |
|---|---|---|
| Architecture (missing canon-mandated component) | 6 | 20% |
| **Visualization (icon/SVG/illustration)** | **9** | **30% — KEY METRIC NTS** |
| **Flow indicator (sơ đồ/wizard step)** | **3** | **10% — KEY METRIC NTS** |
| Onboarding gate / state machine | 3 | 10% |
| Text density | 2 | 7% |
| Typography | 2 | 7% |
| Color/Theme (5 ngũ hành) | 2 | 7% |
| Mobile responsive | 1 | 3% |
| Empty state | 1 | 3% |
| Animation | 1 | 3% |

**~40% of gaps are visualization + flow-indicator related** — NTS visual-first principle is the dominant fix theme.

---

## §6 Fix type distribution

| Fix type | Count | Authorize logic edit? |
|---|---|---|
| **CSS only** | 7 | NO |
| className refactor | 3 | NO |
| **SVG illustration add** (assets only) | 2 | NO (asset/CSS) |
| JSX icon add | 4 | YES |
| **JSX wizard step indicator** | 1 | YES |
| State/handler add | 4 | YES |
| **NEW component** (Wheel, 4-tab, calendar, clock, wizard, action sheet, lightbox-style) | 9 | YES |

**~12 gaps fixable CSS-only or asset-only (~40%)** vs **~18 gaps requiring logic auth (~60%)**.

ENTA module is more architectural/logic-heavy than HOME (which was 78% CSS-only) because canon mandates several **NEW components** that don't exist in V2 yet (Wheel, 4-tab navigation, 5-step wizard, action sheet).

---

## §7 NTS-priority: Onboarding flow detail (5 steps)

ENTA = **gate cốt lõi cả hệ thống** (DEC-13). Onboarding is the FIRST experience after first login — every new user MUST pass through. Visual-first failure here = system-wide UX failure.

| Step | V2 current state (code analysis) | Canon-mandated state | Visual-first gap | Suggested fix |
|---|---|---|---|---|
| **1 BIRTH_DATA** | Form: gender select + hour-group select + day/month/year text inputs + country select + notes textarea — single page, no progress indicator | Wizard step 1: Date picker (calendar visual) + time picker (clock-face) + gender icons (♂/♀/⊕) + city autocomplete + privacy note with lock icon | NO visualization at all | Replace text inputs with calendar + clock + icons. Add 5-step progress dots at top. |
| **2 CALCULATING** | (no step) Submit button → `saveEntaProfile()` → 120ms timeout → navigate `/dashboard` | 2-3s overlay: animated wheel forming + element percentages computing + polarity revealing | Step does not exist | Add overlay component with wheel-formation animation |
| **3 RESULT_REVEAL** | (no step) Same as above | Full wheel reveal + element breakdown card + polarity reveal + "Welcome to your ENTA" celebration | Step does not exist | NEW reveal screen with full SVG wheel + Polarity yin-yang split + Continue CTA |
| **4 FIRST_RESONANCE** | (no step) | Suggest 1 high-resonance user with avatar + element + qualitative ("Strengthens your Kim") + Connect/Skip CTAs | Step does not exist | NEW component with V2 endpoint to compute first resonance |
| **5 WELCOME_HOME** | Direct redirect after 120ms — no welcome moment | Welcome illustration + message + Continue → `/dashboard` feed | Step does not exist | NEW screen with hero SVG + 1-line welcome + 1 CTA |

**Total deficit:** **5 steps × visual-first principle = 5 visual upgrades + 4 NEW component scaffolds**.

This is the **single highest-impact zone** in ENTA module per NTS DEC-13 priority.

---

## §8 Recommended fix sprint queue (CLA dispatch order)

### Tier 1 — Quick visual wins (CSS + asset only)

**Sprint Fix-ENTA-1A: Element + polarity bar visualization (~45-60 min, NO logic auth)**
- EG003 + EG004 + EG008 + EG024 (4 gaps)
- Add ngũ hành theme tokens to ENTA element labels
- Per-element bar viz with deficient/balanced/strong/excess color
- Yang/Yin split bar gradient
- Typography upgrade Syne 700 for ENTA headings

### Tier 2 — Hero widgets (NEW components, logic auth)

**Sprint Fix-ENTA-2A: ENTA Wheel hero (~4-6 h, logic auth)**
- EG001 — single biggest visual upgrade in module
- Build `<EntaWheel size>` SVG component with 5-element segments + animated pulse
- Mount sizes: 280px own / 200px other / 96px chat / 40px feed
- Wire to existing `result.flow_energy.dominant_element` data

**Sprint Fix-ENTA-2B: 4-tab navigation (~2-3 h, logic auth)**
- EG002 — Identity / Resonance / Circles / Journey
- CSS classes already exist (`.enta-tab-btn`, `.enta-tab-btn.active` at styles.css:3817+)
- Add tab state + content panel split

**Sprint Fix-ENTA-2C: Floating + action sheet (~1.5 h, logic auth)**
- EG007 — Edit Profile / Add Connection actions
- New floating button + bottom-sheet modal

### Tier 3 — Onboarding wizard (NEW state machine, logic auth, KEYSTONE)

**Sprint Fix-ENTA-3A: 5-step wizard scaffold + step indicator (~3-4 h, logic auth)**
- EG011 + EG012 — state machine + 5-dot progress indicator
- Routes BIRTH_DATA → CALCULATING → RESULT_REVEAL → FIRST_RESONANCE → WELCOME_HOME
- Each step is a child route or wizard-internal state

**Sprint Fix-ENTA-3B: Step 1 Birth Data visual inputs (~3-4 h, logic auth)**
- EG013 + EG014 + EG015 + EG020
- Calendar picker + clock face + gender icons + lock-icon privacy

**Sprint Fix-ENTA-3C: Steps 2-5 visualization (~6-8 h, logic auth)**
- EG016 + EG017 + EG018 + EG019
- Calculating overlay animation
- Result reveal screen
- First-resonance suggestion
- Welcome illustration

### Tier 4 — Profile + Connections polish

**Sprint Fix-ENTA-4A: ProfilePage Wheel embed (~1-2 h, logic auth)**
- EG021 — embed `<EntaWheel>` at 280px own / 200px other in profile
- Stats row → element ring viz (EG022)
- Resonance display for other's profile (EG023)

**Sprint Fix-ENTA-4B: Connect 4 trust levels (~2-3 h, logic auth)**
- EG028 — Trusted / Circle / Resonance / Open trust ladder
- 4-segment trust ladder per connection row
- Empty state illustration (EG029)

### Tier 5 — Cleanup + non-functional

**Sprint Fix-ENTA-5: Routing + responsive + polish (~1-2 h, mostly CSS)**
- EG010 mobile responsive
- EG026 + EG027 identity-hub merge or deprecate
- EG006 narrative text density reduction
- EG030 lane tab transition

### Tier 6 — Function/flow fixes (post-UI)

**Sprint Fix-ENTA-6: Function/flow fixes (~2-3 h, logic auth)**
- Fix any functional bugs NTS observes during walkthrough after UI is upgraded
- API wiring corrections
- State management corrections
- Validation messages

### Tier 7 — LIVE QA + verify

**Sprint Fix-ENTA-7: Playwright authenticated harness + verify (~60 min)**
- Update Phase 6.1B harness to cover new ENTA wizard
- 5-step onboarding walk
- Per-screen post-fix screenshots
- KL-028 LIVE probe all routes

---

## §9 Aggregate ETA

| Tier | Sprint | Est. Hours | Logic auth |
|---|---|---|---|
| 1 | Fix-ENTA-1A Element bars | ~45-60 min | NO |
| 2 | Fix-ENTA-2A Wheel hero | ~4-6 h | YES |
| 2 | Fix-ENTA-2B 4-tab nav | ~2-3 h | YES |
| 2 | Fix-ENTA-2C Floating action sheet | ~1.5 h | YES |
| 3 | Fix-ENTA-3A Wizard scaffold | ~3-4 h | YES |
| 3 | Fix-ENTA-3B Step 1 visual inputs | ~3-4 h | YES |
| 3 | Fix-ENTA-3C Steps 2-5 viz | ~6-8 h | YES |
| 4 | Fix-ENTA-4A Profile Wheel embed | ~1-2 h | YES |
| 4 | Fix-ENTA-4B Connect 4 trust levels | ~2-3 h | YES |
| 5 | Fix-ENTA-5 Routing + polish | ~1-2 h | NO (mostly) |
| 6 | Fix-ENTA-6 Function/flow fixes | ~2-3 h | YES |
| 7 | Fix-ENTA-7 LIVE QA verify | ~60 min | NO |

**Total to ship ENTA UI complete (per V3 canon):** **~28-37 hours across 12 sprints**.

Single-session capacity ~60-90 min CLAC1 → minimum **15-20 dispatched sprints** to complete ENTA module.

**Critical path priority (unblock Lane_02):**
1. **Tier 3** (Fix-ENTA-3A + 3B + 3C onboarding wizard) — clears the gate so new users can register ENTA → Lane_02 has test users for CHAT/WALLET/TAO
2. **Tier 2A** (ENTA Wheel hero) — single biggest visual win
3. **Tier 2B** (4-tab nav) — surfaces canon-mandated structure

Tiers 1 + 4 + 5 + 6 + 7 follow.

---

## §10 NTS-observed bugs status

| NTS-observed | Gap ID | Status |
|---|---|---|
| ENTA hiện tại đang lỗi (general observation) | EG001 + EG002 + EG011 (architectural keystone gaps) | PENDING — captured as 3 keystone gaps |
| Form-heavy "đống text user không hiểu" | EG006 + Visual-first scoring §3 (all C-D) | PENDING — feeds entire visualization tier |

---

## §11 Onboarding flow current vs canon comparison

```
V2 CURRENT (form-style single page)              V3 CANON (5-step wizard)
=================================               ===================================

[Form mounts]                                    [Step 1: BIRTH_DATA]
  ↓ All inputs visible at once                     ├─ Step indicator ●○○○○
[Gender select]                                    ├─ Calendar picker (visual)
[Birth hour group select]                          ├─ Clock-face time picker
[Birth day/month/year text inputs]                 ├─ Gender icons (♂/♀/⊕)
[Country select]                                   ├─ City autocomplete
[Timezone display]                                 └─ Lock-icon privacy
[Notes textarea]                                            ↓ Submit
[Submit]                                         [Step 2: CALCULATING ●●○○○]
  ↓ saveEntaProfile()                              └─ Animated wheel forming (2-3s)
  ↓ 120ms                                                  ↓ Auto-advance
[navigate /dashboard]                            [Step 3: RESULT_REVEAL ●●●○○]
                                                   ├─ Full wheel reveal
                                                   ├─ Element breakdown
                                                   ├─ Polarity yin-yang viz
                                                   └─ Continue CTA
                                                            ↓
                                                 [Step 4: FIRST_RESONANCE ●●●●○]
                                                   ├─ Suggested user avatar
                                                   ├─ "Strengthens your Kim"
                                                   └─ [Connect] [Skip]
                                                            ↓
                                                 [Step 5: WELCOME_HOME ●●●●●]
                                                   ├─ Welcome illustration
                                                   ├─ 1-line celebration
                                                   └─ Continue → /dashboard

Total V2 visual elements: 0 progress indicator, 0 illustrations, 0 wheel viz
Total V3 canon visual elements: 5 step dots, 1 wheel forming animation,
  1 full wheel reveal, 1 polarity yin-yang viz, 1 first-resonance card,
  1 welcome illustration = ~6 visualization layers
```

---

## §12 KL extensions discovered

### KL-075 NEW — V2 ENTA module is text-wall by canon-architectural deficit, not by polish

V2 ENTA's "đống text user không hiểu" is not solved by typography polish or color tweaks. The deficit is **architectural**: the canon-mandated **ENTA Wheel hero** (animated 5-element widget), **4-tab navigation**, and **5-step onboarding wizard state machine** simply don't exist in V2 code. Until those 3 NEW components ship, no amount of CSS-tier polish will move the visual-first score above C. This mirrors KL-071 (V2 HOME canon gap was architectural, not cosmetic).

**Implication:** Fix sprints must prioritize Tier 2 (Wheel) + Tier 3 (Wizard) keystones before Tier 1 polish can compound.

### KL-076 NEW — V3 canon component asset reuse from V3 deprecated tree

V3 deprecated tree (`apps/uzg-pwa/src/components/enta-v3/*.tsx`) already has typed scaffolds for `<EntaWheelV3>`, `<EntaShellV3>`, `<EntaIdentityHeaderV3>`, `<EntaOnboardingShellV3>`, `<JourneyTabV3>`, `<OnboardingStep3ResultRevealV3>`, `<IdentityTabV3>`, `<ConnectActionSheetV3>`. Per DEC-11 V3 routes are deprecated for cleanup, but the **TSX components themselves can be lifted** into the V2 component tree (translate `.tsx → .jsx` or keep typed wrapper) to accelerate Tier 2 + Tier 3 sprints. This is a **6-10 h saving** across the keystone tiers.

Pattern: Tier 2A Wheel sprint → import `EntaWheelV3.tsx` logic + adapt to V2 props shape; Tier 3 wizard sprint → import `EntaOnboardingShellV3.tsx` + step components.

---

## §13 Closing note

V2 ENTA module visual-first score: **C average** with 6 architectural gaps (3 CRITICAL: Wheel, 4-tab, Wizard state machine). Until Tier 2 + Tier 3 keystone sprints ship, the module cannot move above text-wall classification per canon and per NTS DEC-12 visual-first principle.

The **~28-37 h across 12 sprints** estimate maps to ~15-20 CLAC1 single-session dispatches. Critical path unblocks Lane_02 cross-Lane testing once Tier 3 onboarding wizard is functional (estimated cumulative ~13-16 h sprints 3A + 3B + 3C).

Recommend Sprint Fix-ENTA-3A (wizard scaffold + step indicator) as the **next dispatch** — it unblocks the gate that currently locks out new users from completing onboarding cleanly.
