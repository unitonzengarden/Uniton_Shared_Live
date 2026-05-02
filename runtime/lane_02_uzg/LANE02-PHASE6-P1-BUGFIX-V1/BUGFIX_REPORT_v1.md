# LANE02-PHASE6-P1-BUGFIX-V1 — Bug Fix Report v1

**Task ID:** LANE02-PHASE6-P1-BUGFIX-V1  
**Executor:** CURSOR-2 (Desktop stream)  
**Date:** 2026-05-02  
**Commit:** `ef9bf33`  
**Authority:** handoff #2 Phase 6 §5 + Lane_division_v1 + AMD_NTS_FULL_TECH_AUTONOMY

---

## Executive Summary

4 bugs fixed (2 P1 + 2 P2) from Track A audit findings:

| Bug | Severity | Status | Approach |
|-----|----------|--------|----------|
| BUG-CHAT-01 ENTA gate English error | P1 | ✅ FIXED | Detect ENTA_REQUIRED flag, show Vietnamese CTA |
| BUG-CHAT-02 English message localization | P2 | ✅ FIXED | Auto-fixed via BUG-CHAT-01 |
| BUG-WALLET-01 Convert black background | P1 | ✅ FIXED | Option B: render wallet state behind overlay |
| BUG-WALLET-02 Empty state no CTA | P2 | ✅ FIXED | Add "Bắt đầu kiếm U →" button |

**Re-run audit:** 22/24 pass (20/21 original baseline maintained — **0 regressions**)

---

## Bug Fix Details

### BUG-CHAT-01 + BUG-CHAT-02 (P1 + P2)

**Root cause:** V2 Worker returns `409 ENTA_ROOT_REQUIRED` when user has no ENTA profile. Frontend passed raw English server message to UI.

**Fix 1 — `src/hooks/useInbox.ts`** (+ `apps/uzg-pwa` copy):
```typescript
} catch (err) {
  const msg = err instanceof Error ? err.message : '...';
  const isEntaRequired =
    msg.includes('ENTA_ROOT_REQUIRED') ||
    msg.includes('409') ||
    (err as Record<string, unknown>)?.code === 'ENTA_ROOT_REQUIRED';
  setError(isEntaRequired ? 'ENTA_REQUIRED' : msg);  // flag, not raw message
  setState('ERROR');
}
```

**Fix 2 — `src/components/chat-v3/ChatInboxV3.tsx`** (+ `apps/uzg-pwa` copy):
```tsx
{state === 'ERROR' && error === 'ENTA_REQUIRED' ? (
  <div data-error-type="enta-required">
    <p>🌿</p>
    <p>Hoàn tất ENTA Root để dùng Chat</p>
    <p>Bạn cần hoàn thành thiết lập ENTA trước khi có thể nhắn tin.</p>
    <button onClick={() => navigate('/v3/onboarding')}>
      Thiết lập ENTA ngay →
    </button>
  </div>
) : state === 'ERROR' ? (
  // original error display
) : null}
```

**Constraint respected:** `/v3/onboarding` (Lane_01 ENTA page) is NOT modified — only linked to.

---

### BUG-WALLET-01 (P1) — Approach B selected

**Root cause:** `V3ConvertPage` rendered `ConvertOverlayV3` (position:fixed overlay) over an empty page div with no background content → pure black screen.

**Approach chosen:** Option B — render appropriate wallet state (skeleton/empty/overview) as background layer behind the fixed overlay. Uses existing `useWallet()` call already in the component.

**Fix — `src/pages/v3/V3ConvertPage.jsx`** (+ `apps/uzg-pwa` copy):
```jsx
return (
  <div className="v3-page v3-wallet-convert">
    {/* Background layer: render wallet state behind the fixed overlay */}
    {(loadState === 'INITIAL' || loadState === 'LOADING') && <WalletSkeletonV3 />}
    {(loadState === 'EMPTY' || (loadState === 'LOADED' && assets.length === 0)) && (
      <WalletEmptyStateV3 />
    )}
    {loadState === 'LOADED' && assets.length > 0 && (
      <WalletOverviewV3 assets={assets} onAssetTap={...} onConvertTap={() => {}} />
    )}
    <ConvertOverlayV3 convert={convertWithNav} uBalance={uBalance} />
  </div>
)
```

Also fixed: `navigate('/wallet')` → `navigate('/v3/wallet')` (correct V3 route).

---

### BUG-WALLET-02 (P2)

**Fix — `src/components/wallet-v3/WalletEmptyStateV3.tsx`** (+ `apps/uzg-pwa` copy):
```tsx
export function WalletEmptyStateV3() {
  const navigate = useNavigate();
  return (
    <div>
      <div>💎</div>
      <p>Ví chưa được kích hoạt</p>
      <p>Tham gia hoạt động để nhận tài sản đầu tiên.</p>
      <button onClick={() => navigate('/v3/u-reward')}>
        Bắt đầu kiếm U →
      </button>
    </div>
  );
}
```

---

## Files Changed

| File | Bug | Change |
|------|-----|--------|
| `src/hooks/useInbox.ts` | CHAT-01 | Add ENTA_ROOT_REQUIRED detection |
| `src/components/chat-v3/ChatInboxV3.tsx` | CHAT-01/02 | Add ENTA_REQUIRED error branch |
| `src/components/chat-v3/ChatInboxV3.module.css` | CHAT-01/02 | Add entaGate* CSS classes |
| `src/pages/v3/V3ConvertPage.jsx` | WALLET-01 | Add wallet background layer; fix /v3/wallet route |
| `src/components/wallet-v3/WalletEmptyStateV3.tsx` | WALLET-02 | Add CTA button |
| `src/components/wallet-v3/WalletEmptyStateV3.module.css` | WALLET-02 | Add ctaBtn CSS class |
| `apps/uzg-pwa/src/...` (6 files) | All | Mirror fixes in apps/uzg-pwa |

---

## Re-run Audit Results

| Tests | Count | vs Track A baseline |
|-------|-------|---------------------|
| Total | 24 | +3 new bugfix verify |
| Passed | 22 | 20/21 original maintained |
| Failed | 2 | ureward-04 (P2 test infra, known) + chat-fix-01 (pre-deploy) |
| Regressions | **0** | ✅ |

**ureward-04:** P2 test infrastructure issue — `page.request` doesn't carry localStorage auth. Not a production bug. Same as Track A.

**chat-fix-01:** Verify spec checks production `https://uzg.plus` which still has the old build. Fix is committed in source. Will show after CI deploy (commit `ef9bf33`).

---

## Deployment

Commit `ef9bf33` pushed to main. CI run: 5 checks expected.  
Cloudflare Pages will build + deploy the fixes automatically.  
**After deploy:** BUG-CHAT-01 shows Vietnamese CTA, BUG-WALLET-01 shows wallet background, BUG-WALLET-02 shows "Bắt đầu kiếm U →" button.

---

## Constraints Verified

- ✅ V2 backend NOT modified (`dist/_worker.js`, `server/aier_server.js`)
- ✅ Lane_01 namespace NOT modified (`auth-v3`, `enta-v3`, `home-v3`, `settings-v3`, `profile-v3`)
- ✅ TAO frontend NOT modified (`tao-v3`, `v3-tao-data-layer.ts`)
- ✅ `useAierTaoChat.ts` NOT modified
- ✅ `/v3/onboarding` page NOT modified — only linked
- ✅ Zero secrets in commit
- ✅ ASCII commit message
