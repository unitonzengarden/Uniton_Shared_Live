# Component tree — Sprint Fix-ENTA-3A

```
apps/uzg-pwa/src/                                                       lines added  KL-05 mirror
├── App.jsx                                              (modified)              +10  src/App.jsx
│     ├── lazy load loadEntaOnboardingPage
│     └── Route /enta/onboarding → <EntaOnboardingPage>
├── components/enta/
│   ├── ENTAShell.jsx                                    (modified)              +19  src/components/enta/ENTAShell.jsx
│   │     └── auth-gate useEffect: no profile → redirect /enta/onboarding
│   └── onboarding/                                                                    src/components/enta/onboarding/
│       ├── EntaOnboardingShell.jsx                      (NEW 88)                       (mirror)
│       │     ├── Mounts at /enta/onboarding
│       │     ├── Owns no state — delegates to useEntaWizardState
│       │     ├── Renders <WizardStepIndicator currentStep={...} />
│       │     ├── Renders active step component switch
│       │     └── On ONBOARDED → navigate('/enta', replace)
│       ├── WizardStepIndicator.jsx                       (NEW 143)                      (mirror)
│       │     ├── 5 inline SVG icons: Calendar / Lightning / Star / Handshake / Home
│       │     ├── status per dot: done / active / pending
│       │     ├── connector lines progressive fill
│       │     └── done dots get checkmark overlay (CheckOverlayIcon)
│       ├── Step1BirthData.jsx                            (NEW 388)                      (mirror)
│       │     ├── CalendarPicker (month grid + scroll year)
│       │     ├── ClockFacePicker (12 Vietnamese branches Tý-Sửu-...-Hợi)
│       │     ├── Gender icon button cards (MaleIcon / FemaleIcon / OtherIcon)
│       │     ├── Country select + auto-derived timezone
│       │     ├── LockIcon + privacy note
│       │     └── Errors list + Submit button
│       ├── Step2Calculating.jsx                          (NEW 104)                      (mirror)
│       │     ├── Animated 5-element wheel forming
│       │     ├── Element labels reveal sequentially
│       │     └── Polarity reveal text fade-in @ 95% progress
│       └── StepPlaceholder.jsx                           (NEW 73)                       (mirror)
│             ├── Used for STEP_3 / STEP_4 / STEP_5 in this sprint
│             ├── Renders dominantElement preview if calc complete
│             └── Continue button bound to onContinue prop
├── hooks/
│   └── useEntaWizardState.js                            (NEW 266)                      src/hooks/useEntaWizardState.js
│         ├── const WIZARD_STEPS frozen object
│         ├── const STEP_INDEX frozen object
│         ├── readPersistedProgress / persistProgress / clearEntaOnboardingProgress
│         ├── validateStep1BirthData (Vietnamese errors)
│         ├── toV2ProfileBody (KL-067 V2 EXACT body shape)
│         └── useEntaWizardState({ user, session })
│               ├── state: step / formData / calcResult / errors / submitting
│               ├── effect: persist on every state change
│               ├── action: setField / setHourUnknown
│               ├── action: submitStep1 (async, 2s minDelay, saveEntaProfile)
│               ├── action: continueFromReveal / continueFromResonance
│               ├── action: completeOnboarding (clears localStorage)
│               └── action: resetWizard
├── pages/
│   └── EntaOnboardingPage.jsx                           (NEW 7)                        src/pages/EntaOnboardingPage.jsx
│         └── thin wrapper for the route — renders <EntaOnboardingShell>
└── styles.css                                            (modified)             +754  src/styles.css
      └── ~600 lines under .enta-onboarding-shell + .enta-wizard-* tree
            ├── .enta-onboarding-shell + .enta-onboarding-canvas
            ├── .enta-wizard-step-indicator (5 dots + connectors)
            ├── .enta-wizard-step + .enta-wizard-section + .enta-wizard-row + .enta-wizard-field
            ├── .enta-wizard-pill + .enta-wizard-year-list + .enta-wizard-month-grid
            ├── .enta-wizard-calendar + .enta-wizard-calendar-day
            ├── .enta-wizard-clock + .enta-wizard-clock-branch
            ├── .enta-wizard-gender-row + .enta-wizard-gender-card
            ├── .enta-wizard-select + .enta-wizard-toggle
            ├── .enta-wizard-privacy + .enta-wizard-lock-icon + .enta-wizard-errors
            ├── .enta-wizard-submit + .enta-wizard-submit-secondary
            ├── .enta-wizard-step-calculating
            ├── .enta-wizard-calc-wheel + .enta-wizard-calc-base + .enta-wizard-calc-pulse
            ├── .enta-wizard-calc-elements + .enta-wizard-calc-element + .enta-wizard-calc-element-dot
            ├── .enta-wizard-calc-polarity
            └── .enta-wizard-placeholder-card + variants

Total: 9 NEW files + 4 modified files. 1,851 lines added in apps/uzg-pwa/src
       + identical 1,851 in src/ mirror = 3,702 insertions per git diff stat.
```
