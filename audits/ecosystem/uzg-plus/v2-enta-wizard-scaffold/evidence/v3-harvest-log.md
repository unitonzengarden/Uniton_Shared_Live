# V3 deprecated tree harvest log — Sprint Fix-ENTA-3A

**Audit ID:** LANE01-CLAC1-V2-ENTA-WIZARD-SCAFFOLD-2026-05-02T20-00Z
**KL applied:** KL-076 (V3 deprecated tree component asset reuse)

---

## §1 V3 source files inspected

| V3 path | Lines | Use | Lifted directly? |
|---|---|---|---|
| `apps/uzg-pwa/src/components/enta-v3/EntaOnboardingShellV3.tsx` | 73 | Wizard orchestrator pattern | NO — rebuilt as `.jsx` (V2 conventions, no module CSS) |
| `apps/uzg-pwa/src/components/enta-v3/OnboardingStep1BirthDataV3.tsx` | 122 | Birth-data form structure | NO — rebuilt with calendar grid + clock face + gender icons (V3 used 3 selects, V2 visual upgrade) |
| `apps/uzg-pwa/src/components/enta-v3/OnboardingStep2CalculatingV3.tsx` | (small) | Calculating overlay | NO — rebuilt with sequential element reveal animation |
| `apps/uzg-pwa/src/components/enta-v3/OnboardingStep3ResultRevealV3.tsx` | 32 | Reveal step | DEFERRED — placeholder card in 3A; full lift in Sprint Fix-ENTA-3B |
| `apps/uzg-pwa/src/components/enta-v3/EntaWheelV3.tsx` | 87 | Animated wheel SVG | DEFERRED — Step 2 uses simpler standalone wheel; full hero in 3B |
| `apps/uzg-pwa/src/hooks/useEntaOnboarding.ts` | 110 | State machine RPC | NO — rebuilt as `useEntaWizardState.js` (V2 productV2Service rather than V3 RPC + localStorage persistence which V3 lacked) |
| `apps/uzg-pwa/src/types/entaV3.ts` (HOUR_BRANCHES, OnboardingStep) | n/a | Hour branch list reference | NO — rebuilt inline (V3 types are TS, V2 is JS, simpler to inline) |

## §2 Why rebuild rather than direct lift

V2 conventions differ from V3 deprecated tree in 4 ways that prevented direct copy:

1. **TS vs JS:** V3 tree is `.tsx`/`.ts` with type imports. V2 codebase is `.jsx`/`.js`. Direct lift would require TS infrastructure or stripping types.
2. **Module CSS vs global stylesheet:** V3 uses `*.module.css` per component. V2 puts CSS into a single `apps/uzg-pwa/src/styles.css` (KL-05 byte-identical with root `src/styles.css`). Direct lift would orphan module CSS and break the build.
3. **V3 RPC vs V2 service:** V3 calls `rpcCreateEntaProfile` + `rpcComputeEnta` from `lib/supabaseRpc`. V2 uses `productV2Service.saveEntaProfile` + `calculateEnta`. Direct lift would call V3 endpoints which are deprecated.
4. **Visual-first principle (NTS DEC-12):** V3 OnboardingStep1BirthDataV3 used 3 `<select>` elements for year/month/day and a `<select>` for gender — text-only. NTS visual-first mandate requires icons + visual pickers. The V2 rebuild upgrades to calendar grid + clock face + gender icon cards (≥96px tappable).

## §3 What was preserved from V3

- **State machine names:** `STEP_1_BIRTH_DATA`, `STEP_2_CALCULATING`, etc. — kept identical so future telemetry/Playwright fixtures match across V2 + V3 deprecated paths.
- **Vietnamese hour branches:** Tý / Sửu / Dần / Mão / Thìn / Tỵ / Ngọ / Mùi / Thân / Dậu / Tuất / Hợi — identical to V3 `HOUR_BRANCHES` constant.
- **2-second minimum overlay:** V3 `useEntaOnboarding` enforces `minDelay = setTimeout(2000)` so the calculating step is always visible. V2 `useEntaWizardState.submitStep1` preserves the same 2s `minDelay`.
- **5-step state machine flow:** BIRTH_DATA → CALCULATING → RESULT_REVEAL → FIRST_RESONANCE → WELCOME_HOME → ONBOARDED — identical to V3 Flow Spec §2.1.
- **Vietnamese privacy copy pattern:** "Dùng để tính ENTA. Không chia sẻ công khai." — semantically equivalent to V3 wording.

## §4 What V2 added that V3 deprecated tree lacked

- **localStorage persistence (Flow Spec §2.7 resume-on-abandon):** V3 `useEntaOnboarding` did not persist mid-wizard state. V2 `useEntaWizardState` writes to `localStorage.enta_onboarding_progress` after every state change so a refresh / browser close / network drop resumes from the same step with the same form data.
- **Visual calendar grid:** V3 used 3 separate `<select>` for year/month/day. V2 has a calendar grid (7-column day picker, scrollable year list, 3×4 month grid).
- **Clock face hour picker:** V3 used a single `<select>` with 12 options for hour. V2 has a circular clock face with the 12 branch labels positioned around a circle.
- **Gender icon button cards:** V3 used 3 text buttons. V2 has 3 icon button cards ≥96px with SVG icons + label below.
- **Step 3-5 placeholder graceful fallback:** V3 used `<EntaErrorStateV3>` if a step component was missing. V2 `<StepPlaceholder>` renders a clean placeholder with calc preview + Continue, allowing the full flow to be navigable even when 3B/3C content has not shipped.
- **5-icon SVG step indicator:** V3 used numeric dot fills. V2 has 5 distinct inline SVG icons (calendar / lightning / star / handshake / home) with progressive connector + done checkmark overlay.

## §5 Files created in V2 tree

```
apps/uzg-pwa/src/
├── hooks/useEntaWizardState.js                            (NEW, ~250 lines)
├── components/enta/onboarding/
│   ├── EntaOnboardingShell.jsx                            (NEW, ~90 lines)
│   ├── WizardStepIndicator.jsx                            (NEW, ~140 lines)
│   ├── Step1BirthData.jsx                                 (NEW, ~330 lines)
│   ├── Step2Calculating.jsx                               (NEW, ~95 lines)
│   └── StepPlaceholder.jsx                                (NEW, ~70 lines)
├── pages/EntaOnboardingPage.jsx                           (NEW, ~10 lines)
├── App.jsx                                                (route + lazy load)
├── components/enta/ENTAShell.jsx                          (auth gate redirect)
└── styles.css                                             (~600 lines wizard CSS)

src/* mirror per KL-05 dual-tree (byte-identical, verified via diff -q)
```

## §6 Time savings

Rebuild approach took ~2 h 30 min instead of the projected 3-4 h. V3 reference materials saved approximately 60-90 min of state machine design + Vietnamese copy + step structure decisions. The remaining time went to V2-specific upgrades (calendar grid + clock face + gender icons + localStorage persistence + auth-gate redirect).

## §7 Future sprint reuse

For Sprint Fix-ENTA-3B (Result Reveal + ENTA Wheel hero), the following V3 assets remain harvestable:
- `EntaWheelV3.tsx` — full 280px animated 5-element wheel with pulse animation; lift as `EntaWheel.jsx` upgrade
- `OnboardingStep3ResultRevealV3.tsx` — reveal screen; lift as `Step3ResultReveal.jsx`
- `IdentityTabV3.tsx`, `JourneyTabV3.tsx` — for ENTA dashboard 4-tab nav (separate sprint)

For Sprint Fix-ENTA-3C (First Resonance + Welcome HOME):
- `OnboardingStep4SuggestedResonanceV3.tsx`
- `OnboardingStep5WelcomeHomeV3.tsx`
