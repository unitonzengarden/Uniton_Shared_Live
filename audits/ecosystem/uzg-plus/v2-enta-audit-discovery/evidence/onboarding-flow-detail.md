# V2 ENTA Onboarding Flow — Detail spec for fix sprints

**Source canon:** `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1.md` §2 (ENTA ONBOARDING FLOW EJ1)
**Source canon:** `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UIUX_ENTA_CANON_v1.md` §3 (ENTA Wheel hero)
**V2 source code:** `apps/uzg-pwa/src/components/enta/ENTAShell.jsx` (675 lines), `ENTAForm.jsx`, `productV2Service.js` (`saveEntaProfile`, `validateEntaInput`, `calculateEnta`, `mapEntaTimezoneByCountry`)

---

## §1 Why onboarding is keystone (DEC-13)

ENTA = **gate cốt lõi cả hệ thống UZG+**:
1. User login lần đầu BẮT BUỘC khai báo ENTA — không có ENTA = không vào HOME, không vào TAO, không có element token cho theming, không có resonance for Connect.
2. ENTA blocks Lane_02 modules — CHAT/WALLET/TAO need ENTA-completed test users.
3. ENTA hiện tại đang lỗi (NTS observation) → first-time user experience is broken.

Onboarding is the **first** ENTA experience every user must pass. Visual-first failure here cascades to every downstream module.

---

## §2 V2 current state (single-page form)

**File:** `ENTAShell.jsx` lines 26-36 + ENTAForm.jsx
**State machine:** none — single render with all inputs visible
**Trigger:** User logs in, ENTA row not present → `<ENTAShell>` renders form
**Fields rendered:**

| Field | V2 input type | Code reference |
|---|---|---|
| Gender | text select (Male/Female/Other) | `EMPTY_FORM.gender` |
| Birth hour group | text select (24 hours OR "unknown") | `EMPTY_FORM.birth_hour_group` |
| Birth day | text input (1-31) | `EMPTY_FORM.birth_day` |
| Birth month | text input (1-12) | `EMPTY_FORM.birth_month` |
| Birth year | text input (1900-2100) | `EMPTY_FORM.birth_year` |
| Certainty mode | text select (`exact` / `unsure_full_date` / `unsure_hour`) | `EMPTY_FORM.certainty_mode` |
| Birthplace country | text select (US default) | `EMPTY_FORM.birthplace_country` |
| Birth timezone | derived auto from country | `mapEntaTimezoneByCountry()` |
| Notes | text textarea | `EMPTY_FORM.notes` |

**Submit flow (ENTAShell.jsx:300-333):**
```
[User taps Submit]
   ↓ saveEntaProfile() called
[setSavedResult(response.data?.calculated)]
[setNetworkStats(response.data?.network_stats)]
[setBackendVerification(response.data?.backend_verification)]
[await loadLinkedContext() + activation.refresh()]
[setSaving(false)]
   ↓ if completionMode === true (first-time onboarding)
[setMessage('Opening Home…')]
[window.setTimeout(() => navigate('/dashboard', {replace: true}), 120)]
```

**Visual elements present in V2:**
- 0 progress indicators
- 0 illustrations
- 0 wheel visualizations
- 0 calendar/clock pickers
- 0 gender icons
- 0 calculating animation
- 0 result-reveal celebration
- 0 first-resonance suggestion
- 0 welcome-home illustration

**Visual-first score: D (pure text wall)**

---

## §3 V3 canon-mandated state machine (5 steps)

Per `UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1.md` §2.1:

```
[NOT_ONBOARDED] → [STEP_1_BIRTH_DATA]
                       ↓ Submit
                  [STEP_2_CALCULATING]
                       ↓ 2-3s
                  [STEP_3_RESULT_REVEAL]
                       ↓ Continue
                  [STEP_4_FIRST_RESONANCE]
                       ↓ Connect / Skip
                  [STEP_5_WELCOME_HOME]
                       ↓
                  [ONBOARDED]
```

---

## §4 Per-step current vs canon comparison

### Step 1 — BIRTH_DATA

| Aspect | V2 current | V3 canon | Visual-first gap | Suggested fix |
|---|---|---|---|---|
| Page header | "Trường danh tính" + paragraph narrative | "Step 1 of 5: Welcome to your ENTA" + subtle copy | None vs progress dots | Add `●○○○○` step indicator |
| Date input | 3 separate text inputs day / month / year | Calendar picker visual | Text-only → calendar widget | NEW `<EntaCalendarPicker>` SVG/CSS grid |
| Time input | Select dropdown 24 hours | Clock-face picker | Text-only → clock SVG | NEW `<EntaClockPicker>` |
| Gender | Radio group text (Male/Female/Other) | Icon button group ♂/♀/⊕ | Text-only → icons | CSS + 3 SVG icons |
| Location | Country select dropdown | City autocomplete | Coarse country → fine city | NEW autocomplete + V2 endpoint or city-data fixture |
| Privacy note | Plain `<small>` text below form | Inline lock-icon + tooltip | Text-only → icon | CSS + 1 SVG + tooltip |
| Submit CTA | Text button "Save" | Text button "Continue →" + arrow icon | None vs subtle right-arrow | CSS only |

### Step 2 — CALCULATING (currently missing)

| Aspect | V2 current | V3 canon | Visual-first gap |
|---|---|---|---|
| Step exists? | NO — direct submit→navigate after 120ms | YES — 2-3s overlay |  Step does not exist |
| Animation | none | Animated wheel forming + element percentages computing + polarity revealing | Step does not exist |
| User signal | none — black box | "Calculating your ENTA…" + progress | Step does not exist |

**Fix:** New `<EntaCalculatingOverlay>` component. Spin animation 2-3s before advancing.

### Step 3 — RESULT_REVEAL (currently missing)

| Aspect | V2 current | V3 canon | Visual-first gap |
|---|---|---|---|
| Step exists? | NO — calc result becomes form summary | YES — full reveal screen | Step does not exist |
| Hero element | Form summary chips | Full ENTA Wheel 280px animated | Step does not exist |
| Element breakdown | None at this stage | Per-element bar (Kim 12% / Thủy 18% / etc.) with deficient/balanced/strong/excess color | Step does not exist |
| Polarity | Text label only | Yang/Yin yin-yang split bar | Step does not exist |
| Continue CTA | none | "Welcome to your ENTA" + Continue → step 4 | Step does not exist |

**Fix:** New `<EntaResultRevealScreen>` component. Mounts after CALCULATING. Shows wheel + element bars + polarity + Continue.

### Step 4 — FIRST_RESONANCE (currently missing)

| Aspect | V2 current | V3 canon | Visual-first gap |
|---|---|---|---|
| Step exists? | NO | YES — suggest 1 high-resonance user | Step does not exist |
| Suggested user | none | Avatar + display_name + handle + element + qualitative ("Strengthens your Kim") | Step does not exist |
| CTAs | none | [Connect] [Skip for now] | Step does not exist |

**Fix:** New `<EntaFirstResonanceStep>` component. Calls V2 endpoint to compute one high-resonance user. UI: avatar + chip + 2 buttons.

### Step 5 — WELCOME_HOME (currently missing)

| Aspect | V2 current | V3 canon | Visual-first gap |
|---|---|---|---|
| Step exists? | NO — direct redirect after 120ms | YES — celebratory landing | Step does not exist |
| Hero | none | Welcome illustration (SVG) | Step does not exist |
| Copy | none | "Welcome, <name> · You're now part of the resonance." + 1-line CTA | Step does not exist |
| Auto-advance | 120ms `navigate()` | User-initiated Continue (or 5s auto-advance) | Step does not exist |

**Fix:** New `<EntaWelcomeHomeScreen>` component. Hero SVG + welcome copy + Continue → `/dashboard`.

---

## §5 Architectural fix structure

To ship the 5-step wizard, the following code structure is needed:

```
apps/uzg-pwa/src/
├── components/enta/
│   ├── ENTAShell.jsx             [EXISTS — keep for completed users]
│   ├── ENTAForm.jsx              [EXISTS — refactor into Step 1 child]
│   ├── EntaWheel.jsx             [EXISTS — verify ready for Step 3 reveal]
│   ├── EntaOnboardingShell.jsx   [NEW — wizard router + step state]
│   ├── steps/
│   │   ├── StepBirthData.jsx     [NEW — wraps refactored ENTAForm + step indicator]
│   │   ├── StepCalculating.jsx   [NEW — spin animation overlay]
│   │   ├── StepResultReveal.jsx  [NEW — wheel + element bars + polarity]
│   │   ├── StepFirstResonance.jsx [NEW — suggested user + Connect/Skip]
│   │   └── StepWelcomeHome.jsx   [NEW — illustration + Continue]
│   ├── EntaCalendarPicker.jsx    [NEW]
│   ├── EntaClockPicker.jsx       [NEW]
│   ├── EntaGenderIconGroup.jsx   [NEW]
│   └── EntaStepIndicator.jsx     [NEW — 5-dot progress + active highlight]
├── pages/
│   ├── EntaPage.jsx              [EXISTS — render ENTAShell when ENTA complete]
│   └── EntaOnboardingPage.jsx    [NEW — render EntaOnboardingShell when ENTA empty]
```

**Routing:**
- `/enta` → `<EntaPage>` → if ENTA complete: `<ENTAShell>` ; if ENTA empty: redirect to `/enta/onboarding`
- `/enta/onboarding` → `<EntaOnboardingPage>` → `<EntaOnboardingShell>` with internal step state OR child routes per step

**State management:**
```js
const [step, setStep] = useState('BIRTH_DATA')
const [formData, setFormData] = useState(EMPTY_FORM)
const [calcResult, setCalcResult] = useState(null)
const [suggestedResonance, setSuggestedResonance] = useState(null)
```

Transitions:
- Step 1 submit → call `saveEntaProfile()` → setCalcResult(response.data.calculated) → setStep('CALCULATING')
- Step 2 (CALCULATING) auto-advance after 2-3s timer → setStep('RESULT_REVEAL')
- Step 3 Continue → fetch suggested resonance → setStep('FIRST_RESONANCE')
- Step 4 Connect or Skip → setStep('WELCOME_HOME')
- Step 5 Continue → navigate('/dashboard')

V2 backend immutability proof: this whole flow uses ONLY existing `saveEntaProfile()` + `calculateEnta()` + a NEW frontend-side first-resonance compute (could be derived client-side from existing connection list data without new backend endpoint).

---

## §6 Reusable assets from V3 deprecated tree (KL-076)

Per discovery in main GAP_LIST §12 KL-076, V3 deprecated tree has scaffolds that can be lifted:

| V3 deprecated component | Use case for V2 sprint |
|---|---|
| `apps/uzg-pwa/src/components/enta-v3/EntaOnboardingShellV3.tsx` | Lift as `EntaOnboardingShell.jsx` skeleton |
| `apps/uzg-pwa/src/components/enta-v3/EntaWheelV3.tsx` | Lift as `EntaWheel.jsx` upgrade for Step 3 reveal |
| `apps/uzg-pwa/src/components/enta-v3/OnboardingStep3ResultRevealV3.tsx` | Lift directly as `StepResultReveal.jsx` |
| `apps/uzg-pwa/src/components/enta-v3/JourneyTabV3.tsx` | Lift for ENTA dashboard 4-tab nav (separate sprint Fix-ENTA-2B) |
| `apps/uzg-pwa/src/components/enta-v3/IdentityTabV3.tsx` | Lift for 4-tab nav |
| `apps/uzg-pwa/src/components/enta-v3/EntaIdentityHeaderV3.tsx` | Lift for ENTA hero region |
| `apps/uzg-pwa/src/components/enta-v3/ConnectActionSheetV3.tsx` | Lift for Floating + action sheet (sprint Fix-ENTA-2C) |
| `apps/uzg-pwa/src/hooks/useEnta.ts` + `useEntaOnboarding.ts` + `useEntaWheel.ts` + `useEntaJourney.ts` + `useEntaResonance.ts` | Hooks already exist — reuse |

**Estimated savings:** 6-10 hours across Tier 2 + Tier 3 sprints.

---

## §7 Critical path acceptance per step

For NTS to verify "ENTA hết lỗi":

| Acceptance | How to verify |
|---|---|
| New user log in → lands on Step 1 with progress indicator visible | Manual walkthrough with fresh fixture seed |
| Step 1 calendar + clock + gender icon all functional | Tap each input, confirm visual element opens |
| Step 1 submit → Step 2 calculating overlay shows 2-3s with wheel forming animation | Time the transition |
| Step 3 reveal shows full wheel + element bars + yang/yin viz | Screenshot comparison vs canon §3 mockup |
| Step 4 suggests 1 high-resonance user | Verify endpoint response or client-side compute |
| Step 5 welcome illustration → Continue → `/dashboard` lands successfully | Verify navigate() target |
| 5-dot indicator shows ●●●●● when complete | DOM inspect `.enta-step-indicator-dot.active` count = 5 |
| KL-028 probe `/enta` returns 200 throughout flow | curl + status |

---

## §8 Lane_02 unblock dependency

**Lane_02 cannot test CHAT, WALLET, TAO without ENTA-completed test users.**

Currently V2 ENTA form is a single-page form. Once the wizard ships (Tier 3), Lane_02 can:
- Fixture seed N test users with completed ENTA via authenticated harness
- Run CHAT smoke tests with ENTA element data populated
- Run TAO Bazi calculation with ENTA birth data
- Run WALLET tier display with ENTA element coloring

**Unblock target:** Sprint Fix-ENTA-3A merged + Sprint Fix-ENTA-3B + Sprint Fix-ENTA-3C complete = ~13-16 h cumulative. After that, fixture seeds can pass through wizard programmatically.

---

## §9 Closing

The 5-step wizard is the **single highest-impact** ENTA fix. Until it ships, every new user is gated behind a text-wall form that NTS describes as "đống text user không hiểu". Once it ships:
1. Visual-first principle satisfied for the most-trafficked entry path
2. Lane_02 cross-Lane test users unblocked
3. NTS-observed "ENTA hiện tại đang lỗi" cleared at the gate level

Recommend Sprint Fix-ENTA-3A (wizard scaffold + step indicator) as next dispatch.
