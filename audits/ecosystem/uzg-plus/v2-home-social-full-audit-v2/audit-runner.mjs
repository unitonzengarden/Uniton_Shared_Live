// LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2 — Audit runner
// Read-only Playwright probe. Captures screenshots + i18n leaks + assertions.
// Authenticates via sovereign user using same pattern as tests/lane01/fixtures/auth-bypass.fixture.js
// but runs standalone from the audit companion folder. NOT committed to uzgplus-app.

import { chromium } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'node:path'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = __dirname

config({ path: resolve(REPO_ROOT, '.env') })
config({ path: resolve(REPO_ROOT, '.env.local') })

const COMPANION_OUT = resolve('C:/workspace/Uniton_Shared/audits/ecosystem/uzg-plus/v2-home-social-full-audit-v2')

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const PROJECT_REF = 'kkhhpecofolmrodyeslp'
const LS_KEY = `sb-${PROJECT_REF}-auth-token`
const SOVEREIGN_EMAIL = 'lane02-test-sovereign@uzg.local'
const BASE = 'https://uzg.plus'

const SCREENSHOTS_DIR = resolve(COMPANION_OUT, 'screenshots')
if (!existsSync(SCREENSHOTS_DIR)) mkdirSync(SCREENSHOTS_DIR, { recursive: true })

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE env vars')
  process.exit(2)
}

async function getSessionForEmail(email) {
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { data, error } = await admin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: { redirectTo: 'https://uzg.plus/' },
  })
  if (error) throw new Error(`generateLink: ${error.message}`)
  const emailOtp = data?.properties?.email_otp
  if (!emailOtp) throw new Error('No email_otp')

  const verifyRes = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email, token: emailOtp, type: 'email', gotrue_meta_security: {} }),
    redirect: 'manual',
  })

  if (verifyRes.status >= 300 && verifyRes.status < 400) {
    const location = verifyRes.headers.get('location') || ''
    const url = new URL(location)
    const params = new URLSearchParams(url.hash.slice(1))
    const accessToken = params.get('access_token')
    if (!accessToken) throw new Error('no token in redirect')
    return {
      access_token: accessToken,
      refresh_token: params.get('refresh_token'),
      expires_in: parseInt(params.get('expires_in') || '3600', 10),
      expires_at: Math.floor(Date.now() / 1000) + parseInt(params.get('expires_in') || '3600', 10),
      token_type: 'bearer',
    }
  }

  if (!verifyRes.ok) {
    const errText = await verifyRes.text().catch(() => String(verifyRes.status))
    throw new Error(`verify ${verifyRes.status}: ${errText.slice(0, 200)}`)
  }

  return await verifyRes.json()
}

async function injectSession(page, session, email) {
  const sessionData = {
    access_token: session.access_token,
    refresh_token: session.refresh_token || null,
    token_type: 'bearer',
    expires_in: session.expires_in || 3600,
    expires_at: session.expires_at || (Math.floor(Date.now() / 1000) + 3600),
    user: session.user || { email },
    provider_token: null,
    provider_refresh_token: null,
  }
  await page.addInitScript(({ key, data }) => {
    localStorage.setItem(key, JSON.stringify(data))
  }, { key: LS_KEY, data: sessionData })
}

const ROUTES = [
  { id: '00_root', path: '/' },
  { id: '01_dashboard', path: '/dashboard' },
  { id: '02_compose', path: '/compose' },
  { id: '06_notifications', path: '/notifications' },
  { id: '07_search', path: '/search' },
  { id: '08_connect', path: '/connect' },
  { id: '09_profile_me', path: '/profile/me' },
  { id: '10_enta', path: '/enta' },
  { id: '11_settings', path: '/settings' },
]

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'desktop', width: 1280, height: 800 },
]

async function captureRoute(browser, session, route, viewport) {
  const ctx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  await injectSession(page, session, SOVEREIGN_EMAIL)

  const networkErrors = []
  const consoleErrors = []
  page.on('response', (r) => {
    if (r.status() >= 400) networkErrors.push({ url: r.url(), status: r.status() })
  })
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })

  const url = `${BASE}${route.path}`
  let httpStatus = 0
  let actualUrl = url
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    httpStatus = resp ? resp.status() : 0
    actualUrl = page.url()
  } catch (e) {
    consoleErrors.push(`goto failed: ${e.message}`)
  }

  await page.waitForTimeout(1500)

  const i18nLeaks = await page.evaluate(() => {
    const html = document.documentElement.outerHTML
    const matches = []
    const reBracket = /\[\[([^\]]+)\]\]/g
    const reCurly = /\{\{([^}]+)\}\}/g
    let m
    while ((m = reBracket.exec(html)) !== null) {
      matches.push({ kind: 'bracket', text: m[0], inner: m[1] })
    }
    while ((m = reCurly.exec(html)) !== null) {
      matches.push({ kind: 'curly', text: m[0], inner: m[1] })
    }
    return matches.slice(0, 50)
  })

  let layoutMetrics = null
  try {
    layoutMetrics = await page.evaluate(() => {
      const shell = document.querySelector('[data-testid="app-shell"], .app-shell, [data-app-shell]')
      const nav = document.querySelector('[data-testid="bottom-nav"], .bottom-nav, [data-bottom-nav]')
      const composer = document.querySelector('[data-testid="post-composer"], .post-composer, [data-post-composer]')
      const reactions = document.querySelectorAll('[data-testid^="reaction-"], .ngu-hanh-reaction')
      const postCards = document.querySelectorAll('[data-testid="post-card"], .post-card, .feed-item')
      const get = (el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        return {
          width: r.width,
          height: r.height,
          left: r.left,
          right: r.right,
          maxWidth: cs.maxWidth,
          backgroundColor: cs.backgroundColor,
          fontFamily: cs.fontFamily,
        }
      }
      return {
        shell: get(shell),
        bottomNav: get(nav),
        composer: get(composer),
        reactionsCount: reactions.length,
        postCardsCount: postCards.length,
        bodyBg: getComputedStyle(document.body).backgroundColor,
        bodyFont: getComputedStyle(document.body).fontFamily,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      }
    })
  } catch (e) {
    layoutMetrics = { error: e.message }
  }

  const filename = `${route.id}_${viewport.name}.png`
  await page.screenshot({ path: resolve(SCREENSHOTS_DIR, filename), fullPage: true })

  await ctx.close()

  return {
    route: route.path,
    viewport: viewport.name,
    httpStatus,
    actualUrl,
    redirected: actualUrl !== url,
    i18nLeaks,
    layoutMetrics,
    networkErrors: networkErrors.slice(0, 10),
    consoleErrors: consoleErrors.slice(0, 10),
    screenshotFile: filename,
  }
}

async function main() {
  console.log('Authenticating sovereign user...')
  const session = await getSessionForEmail(SOVEREIGN_EMAIL)
  console.log('Session OK:', session.access_token.slice(0, 12) + '...')

  const browser = await chromium.launch()
  const results = []

  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      console.log(`Capturing ${route.path} @ ${viewport.name}...`)
      try {
        const r = await captureRoute(browser, session, route, viewport)
        results.push(r)
      } catch (e) {
        console.error(`FAIL ${route.path} ${viewport.name}: ${e.message}`)
        results.push({
          route: route.path,
          viewport: viewport.name,
          error: e.message,
        })
      }
    }
  }

  await browser.close()

  writeFileSync(
    resolve(COMPANION_OUT, 'audit-results.json'),
    JSON.stringify(results, null, 2),
    'utf8'
  )

  // Build i18n-broken-keys.txt
  const lines = ['# i18n broken keys discovered — V2 HOME social audit V2', '']
  for (const r of results) {
    if (!r.i18nLeaks || r.i18nLeaks.length === 0) continue
    lines.push(`## ROUTE: ${r.route} @ ${r.viewport}`)
    const seen = new Set()
    for (const leak of r.i18nLeaks) {
      if (seen.has(leak.text)) continue
      seen.add(leak.text)
      lines.push(`- ${leak.kind}: \`${leak.text}\``)
    }
    lines.push('')
  }
  writeFileSync(resolve(COMPANION_OUT, 'i18n-broken-keys.txt'), lines.join('\n'), 'utf8')

  console.log(`Done. ${results.length} captures. Output written to audit-results.json + i18n-broken-keys.txt`)
}

main().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
