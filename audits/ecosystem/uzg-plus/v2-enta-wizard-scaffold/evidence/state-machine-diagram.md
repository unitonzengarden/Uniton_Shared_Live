# Wizard state machine diagram — useEntaWizardState

**Audit ID:** LANE01-CLAC1-V2-ENTA-WIZARD-SCAFFOLD-2026-05-02T20-00Z
**Source:** `apps/uzg-pwa/src/hooks/useEntaWizardState.js` + `EntaOnboardingShell.jsx`

---

## §1 State diagram

```
                          ┌──────────────────────┐
   localStorage hydrate → │  STEP_1_BIRTH_DATA   │ ← resetWizard()
                          └──────────┬───────────┘
                                     │ submitStep1() — validates + saveEntaProfile + minDelay 2s
                                     │     ↓ on validation error: setErrors(), stay STEP_1
                                     │     ↓ on backend error: setErrors(), step → STEP_1
                                     │     ↓ on success after 2s delay:
                                     ▼
                          ┌──────────────────────┐
                          │  STEP_2_CALCULATING  │
                          └──────────┬───────────┘
                                     │ minDelay 2s already elapsed inside submitStep1
                                     │ → setStep(STEP_3_RESULT_REVEAL) immediately
                                     ▼
                          ┌──────────────────────┐
                          │ STEP_3_RESULT_REVEAL │  (Sprint 3A: placeholder card; 3B will add full reveal)
                          └──────────┬───────────┘
                                     │ continueFromReveal() — setStep(STEP_4_FIRST_RESONANCE)
                                     ▼
                          ┌──────────────────────┐
                          │STEP_4_FIRST_RESONANCE│  (Sprint 3A: placeholder card; 3C will add suggestion)
                          └──────────┬───────────┘
                                     │ continueFromResonance() — setStep(STEP_5_WELCOME_HOME)
                                     ▼
                          ┌──────────────────────┐
                          │  STEP_5_WELCOME_HOME │  (Sprint 3A: placeholder card; 3C will add illustration)
                          └──────────┬───────────┘
                                     │ completeOnboarding() — setStep(ONBOARDED) + clear localStorage
                                     ▼
                          ┌──────────────────────┐
                          │      ONBOARDED       │ (Shell useEffect: navigate('/enta', replace))
                          └──────────────────────┘
```

## §2 Persistence model

Every `setStep` and `setFormData` triggers a `useEffect` that writes the current state to `localStorage.enta_onboarding_progress` as JSON:

```json
{
  "step": "STEP_2_CALCULATING",
  "formData": { "gender": "male", "birth_year": "1992", ... },
  "calcResult": { "flow_energy": { "dominant_element": "moc" }, ... }
}
```

On mount, the hook calls `readPersistedProgress()` synchronously inside the `useState` initializer — no flash of default state. If a refresh happens while in `STEP_2_CALCULATING` or `STEP_3_RESULT_REVEAL` (post-submitStep1), the user lands back on `STEP_3_RESULT_REVEAL` with `calcResult` intact (no need to re-submit Step 1).

Cleanup: `completeOnboarding()` calls `clearEntaOnboardingProgress()` so a finished user does not see stale state on a future onboarding flow.

## §3 Error handling

- **Step 1 validation errors:** `validateStep1BirthData(formData)` returns Vietnamese error array. Surfaced via `errors` state + rendered as `<ul class="enta-wizard-errors">`. Wizard stays on `STEP_1_BIRTH_DATA`.
- **Step 1 backend save failure:** `submitStep1()` catches via try/catch, surfaces the error message, returns to `STEP_1_BIRTH_DATA` with `submitting=false`.
- **Step 1 calc fallback:** If `productV2Service.saveEntaProfile` returns no `calculated` field (e.g., backend partial success), the hook falls back to client-side `calculateEnta(body)` so the user still proceeds with a calc result they can act on.

## §4 Auth gate redirect

`apps/uzg-pwa/src/components/enta/ENTAShell.jsx` has a `useEffect` that fires after the bootstrap:
- When `loading=false` AND `savedResult=null` AND user is at `/enta` (exact match) AND has `session.access_token` + `user.id`,
- Calls `navigate('/enta/onboarding', { replace: true })`.

This prevents users without an ENTA Root from seeing the legacy single-page form. Direct navigation to `/enta/onboarding` is allowed and the wizard handles its own ONBOARDED → `/enta` redirect when complete.

## §5 Events / triggers

| Event | Caller | Effect |
|---|---|---|
| `setField(key, value)` | Form input onChange | Updates `formData[key]`; auto-derives `birth_timezone` when country changes |
| `setHourUnknown(flag)` | Hour-unknown checkbox | Toggles `birth_hour_unknown`; clears `birth_hour_group` if true |
| `submitStep1()` | Step 1 form submit | Validates → STEP_2 → minDelay 2s + saveEntaProfile → STEP_3 |
| `continueFromReveal()` | Step 3 Continue button | STEP_4 |
| `continueFromResonance()` | Step 4 Continue/Skip button | STEP_5 |
| `completeOnboarding()` | Step 5 Continue button | ONBOARDED + clearLocalStorage |
| `resetWizard()` | (manual) | STEP_1 + clear all |

## §6 Step index resolution

For the visual indicator (5 dots):

| State | stepIndex |
|---|---|
| `STEP_1_BIRTH_DATA` | 1 |
| `STEP_2_CALCULATING` | 2 |
| `STEP_3_RESULT_REVEAL` | 3 |
| `STEP_4_FIRST_RESONANCE` | 4 |
| `STEP_5_WELCOME_HOME` | 5 |
| `ONBOARDED` | 5 |
| `ERROR` | 1 |

Resolved via `STEP_INDEX[step]` constant in `useEntaWizardState.js`.

The indicator component receives `currentStep` and renders dots `1..5`:
- `stepNumber < activeIndex` → `done` (checkmark overlay)
- `stepNumber === activeIndex` → `active` (filled + scale 1.06)
- `stepNumber > activeIndex` → `pending` (outline only)

Connector lines between dots fill progressively from left to right based on the active index.
