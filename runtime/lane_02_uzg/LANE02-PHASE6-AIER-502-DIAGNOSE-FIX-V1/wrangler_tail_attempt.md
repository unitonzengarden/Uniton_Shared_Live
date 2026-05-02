# wrangler_tail_attempt — LANE02-PHASE6-AIER-502-DIAGNOSE-FIX-V1

## Goal

Capture CF Workers logs during 502 to identify root cause directly (rather than bisect via diagnostic short-circuit deploys).

## Attempts

### Attempt 1: bare command
```bash
$ npx wrangler pages deployment tail --project-name uzgplus-app
✘ ERROR: Must specify a deployment in non-interactive mode.
```

### Attempt 2: with environment flag
```bash
$ npx wrangler pages deployment tail --project-name uzgplus-app --environment production
✘ ERROR: Must specify a deployment in non-interactive mode.
```

The CLI help says `--environment production` should "grab the latest production deployment", but it requires interactive mode (which is not available via Bash tool — `-NonInteractive` enforced).

### Attempt 3: explicit deployment URL
```bash
$ npx wrangler pages deployment tail https://2a274cb0.uzgplus-app.pages.dev --project-name uzgplus-app
✘ ERROR: Could not find deployment match url: https://2a274cb0.uzgplus-app.pages.dev
```

The deployment URL pattern from build logs (`https://2a274cb0.***.pages.dev`) doesn't match the format wrangler expects.

### Attempt 4: get deployment ID via list
```bash
$ npx wrangler pages deployment list --project-name uzgplus-app --environment production
```

Lists deployment IDs but only shows oldest entries (1 month ago), not newest. Pagination via wrangler CLI is limited.

## Conclusion

`wrangler tail` is unreachable in this environment without:
- Interactive mode (blocked by Bash `-NonInteractive`)
- OR explicit deployment ID (pagination doesn't show recent deploys)

**Fallback strategy adopted**: Incremental diagnostic short-circuit deploys. Each ~3-5 min cycle (commit + PR + merge + deploy). Bisect 502 via `?diagnostic=N` query param returning early at progressive stages of the handler. This worked successfully — root cause identified in 3 PR cycles.

## Future improvement

Trigger `wrangler tail` via GitHub Actions workflow_dispatch with `CLOUDFLARE_API_TOKEN` from GH secrets. The runner has interactive-equivalent permissions when env vars are set. Could create one-shot workflow:

```yaml
name: CF Workers Log Tail
on:
  workflow_dispatch:
    inputs:
      duration:
        default: "60"
jobs:
  tail:
    runs-on: ubuntu-latest
    steps:
      - name: Tail Workers logs
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: |
          timeout ${{ inputs.duration }} \
            npx wrangler pages deployment tail --project-name uzgplus-app --environment production --format json \
            | tee tail.log || true
      - uses: actions/upload-artifact@v4
        with:
          name: tail-log
          path: tail.log
```

This was NOT done in V502 because incremental diagnostic deploys solved root cause faster (~30 min total).
