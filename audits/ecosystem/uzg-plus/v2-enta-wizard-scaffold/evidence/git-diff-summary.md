# Git diff summary — PR #116 (Sprint Fix-ENTA-3A)

**PR:** https://github.com/unitonzengarden/uzgplus-app/pull/116
**Merge commit:** `d539225f054c66e6f60e13ebac11f54c4ff40a15`
**Merged at:** 2026-05-02T18:00:46Z
**Cloudflare deploy run:** 25258276270 (SUCCESS in 1m18s)

## Files changed in PR #116

```
$ git diff d539225f^1..d539225f --stat
 apps/uzg-pwa/src/App.jsx                                          |  10 +
 apps/uzg-pwa/src/components/enta/ENTAShell.jsx                    |  19 +-
 apps/uzg-pwa/src/components/enta/onboarding/EntaOnboardingShell.jsx | 88 +  (NEW)
 apps/uzg-pwa/src/components/enta/onboarding/Step1BirthData.jsx    | 388 +  (NEW)
 apps/uzg-pwa/src/components/enta/onboarding/Step2Calculating.jsx  | 104 +  (NEW)
 apps/uzg-pwa/src/components/enta/onboarding/StepPlaceholder.jsx   |  73 +  (NEW)
 apps/uzg-pwa/src/components/enta/onboarding/WizardStepIndicator.jsx | 143 + (NEW)
 apps/uzg-pwa/src/hooks/useEntaWizardState.js                      | 266 +  (NEW)
 apps/uzg-pwa/src/pages/EntaOnboardingPage.jsx                     |   7 +  (NEW)
 apps/uzg-pwa/src/styles.css                                       | 754 +
 src/App.jsx                                                       |  10 +  (KL-05 mirror)
 src/components/enta/ENTAShell.jsx                                 |  19 +- (KL-05 mirror)
 src/components/enta/onboarding/EntaOnboardingShell.jsx            |  88 +  (KL-05 mirror)
 src/components/enta/onboarding/Step1BirthData.jsx                 | 388 +  (KL-05 mirror)
 src/components/enta/onboarding/Step2Calculating.jsx               | 104 +  (KL-05 mirror)
 src/components/enta/onboarding/StepPlaceholder.jsx                |  73 +  (KL-05 mirror)
 src/components/enta/onboarding/WizardStepIndicator.jsx            | 143 +  (KL-05 mirror)
 src/hooks/useEntaWizardState.js                                   | 266 +  (KL-05 mirror)
 src/pages/EntaOnboardingPage.jsx                                  |   7 +  (KL-05 mirror)
 src/styles.css                                                    | 754 +  (KL-05 mirror)
 20 files changed, 3702 insertions(+), 2 deletions(-)
```

## V2 backend untouched proof

```
$ git diff d539225f^1..d539225f -- 'aier_server.js' '_worker.js' 'supabase/functions/**'
(no output — zero changes)

$ git diff d539225f^1..d539225f -- 'apps/uzg-pwa/src/services/productV2Service.js'
(no output — zero changes)

$ git diff d539225f^1..d539225f -- 'src/services/productV2Service.js'
(no output — zero changes)
```

## V3 deprecated tree untouched proof

```
$ git diff d539225f^1..d539225f -- 'apps/uzg-pwa/src/components/enta-v3/' 'src/components/enta-v3/'
(no output — zero changes)
```

V3 deprecated tree was used as inspiration only; no .tsx files were edited.

## Commit body summary

5-step onboarding wizard scaffold + step indicator. Replaces V2
single-page form text-wall with visual-first wizard:
- Step 1 BIRTH_DATA: calendar grid + clock face + gender icon cards
- Step 2 CALCULATING: animated 5-element wheel forming
- Step 3-5: clean placeholder cards (full content in 3B/3C)
- Step indicator: 5 SVG icons + progressive connector + done overlay
- State machine + localStorage persistence (resume mid-wizard)
- Auth gate redirect: /enta with no profile → /enta/onboarding
