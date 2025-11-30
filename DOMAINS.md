# Domains inventory and consolidation plan

This document collects every domain, hostname, and external host referenced in this repository (code, workflows, redirects), where each appears, DNS facts we observed, and recommended next steps to consolidate everything to Shopify (graceandgoldcompany.com).

---

## Summary (recommendation)

- Canonical domain: `graceandgoldcompany.com` (recommended).
- Primary destination / storefront: Shopify (admin/store: your-store.myshopify.com; public domain: graceandgoldcompany.com).
- Action: Make `graceandgoldcompany.com` the Shopify primary domain and ensure other domains (graceandgoldco.com, www variants) redirect to the primary.

---

## Domains & where they appear in this repo

- graceandgoldcompany.com
  - Where: `middleware.js` (redirect target), `pages/build-your-charm.js` (getServerSideProps redirect destination)
  - Purpose: canonical public storefront. Current code redirects visitors to this host.
  - DNS check (observed): A record → 23.227.38.65 (Shopify IP). (Source: external DNS checks run during troubleshooting.)

- graceandgoldco.com
  - Where: `pages/contact.js` (contact email: `hello@graceandgoldco.com`), site content mentioning Instagram handle `@graceandgold.co`.
  - Purpose: secondary / legacy domain and contact address. DNS check (observed): also resolving to Shopify IPs (23.227.38.65) in current DNS.

- your-store.myshopify.com (placeholder)
  - Where: `.github/workflows/*` docs & scripts (`.github/workflows/README.md`, `.github/workflows/docs/SHOPIFY_UPLOAD_README.md`, `.github/workflows/scripts/upload-create-charm-products.js`)
  - Purpose: used as `SHOP_DOMAIN` / `SHOPIFY_STORE_URL` in GitHub Actions and scripts. Replace with your real myshopify domain (e.g., `your-store.myshopify.com`) and put the admin token in repository secrets.

- shops.myshopify.com (Shopify CNAME target)
  - Where: Not explicitly in repo code, but observed as DNS CNAME for `www` variants when checking DNS (public DNS results show `www.graceandgoldcompany.com` CNAME→ `shops.myshopify.com.`)
  - Purpose: Shopify-managed CNAME target for `www` host.

- cdn.tailwindcss.com
  - Where: `pages/_document.js` (script src)
  - Purpose: external CDN used to load Tailwind in development/temporary mode.

Other findings
- `.vercel/` is in `.gitignore` and there is no `vercel.json` or explicit Vercel configuration file in the repo. The project may be connected to Vercel via the Vercel dashboard (not visible in source). If the site is deployed on Vercel with a custom domain, that should be checked in the Vercel project settings.

No explicit references were found to Etsy, Netlify, or GitHub Pages in the codebase. (If you have live content on Etsy or other storefronts, those are external platforms and not part of this repository.)

---

## DNS / HTTP facts (collected during troubleshooting)

- graceandgoldcompany.com — A → 23.227.38.65 (Shopify)
- www.graceandgoldcompany.com — CNAME → shops.myshopify.com.
- graceandgoldco.com — A → 23.227.38.65 (Shopify)
- www.graceandgoldco.com — CNAME → shops.myshopify.com.

These indicate the domains are already pointed at Shopify at the DNS level. If your goal is "everything points to Shopify", DNS is already set up that way. The remaining work is consolidating where traffic is redirected and cleaning up any other hosting or redirects (Vercel, GitHub, etc.).

---

## Recommended consolidation steps (concrete)

1. Choose your canonical public domain (recommended: `graceandgoldcompany.com`).

2. In Shopify admin
   - Set `graceandgoldcompany.com` as the primary domain (Online Store > Domains). Add `graceandgoldco.com` and other variants as domains that redirect to the primary.
   - Ensure SSL is active for each domain in Shopify (Shopify provides certs when domains are connected correctly).

3. DNS records (what to set at your domain registrar) — copy/paste
   - For the root/apex domain (example for `graceandgoldcompany.com`):
     - Type: A
     - Name/Host: @
     - Value: 23.227.38.65
     - TTL: automatic or 3600
   - For the www subdomain:
     - Type: CNAME
     - Name/Host: www
     - Value: shops.myshopify.com
     - TTL: automatic or 3600
   - Repeat for `graceandgoldco.com` if you own it (point to same targets). Let Shopify handle redirecting to the canonical domain.

### Registrar-specific copy/paste instructions

Below are quick, copy/paste instructions for several common registrars. If your registrar isn't listed, the steps are the same: add an A for the apex and a CNAME for `www`.

- Cloudflare
  - Add an A record
    - Name: @
    - IPv4 address: 23.227.38.65
    - Proxy status: DNS only (important — set the cloud icon to gray)
  - Add a CNAME
    - Name: www
    - Target: shops.myshopify.com
    - Proxy status: DNS only (gray cloud)

- GoDaddy
  - In DNS Management > Records:
    - A record — Host: @ — Points to: 23.227.38.65 — TTL: 1 Hour
    - CNAME record — Host: www — Points to: shops.myshopify.com — TTL: 1 Hour

- Namecheap
  - Advanced DNS or domain dashboard:
    - A record — Host: @ — Value: 23.227.38.65 — TTL: Automatic
    - CNAME record — Host: www — Value: shops.myshopify.com — TTL: Automatic

- Google Domains
  - DNS > Custom resource records:
    - A — Host: @ — IPv4 address: 23.227.38.65 — TTL: 1h
    - CNAME — Host: www — Data: shops.myshopify.com — TTL: 1h

Notes:
- Always set the `www` record as a CNAME to `shops.myshopify.com` and ensure the registrar or DNS provider doesn't attempt to proxy/alter the traffic (Cloudflare Orange Cloud must be disabled for Shopify to provision SSL correctly).
- DNS changes can take some minutes to a few hours to propagate. Shopify may take several minutes to provision SSL after DNS is updated.

4. Vercel / other hosts
   - Check Vercel project settings: remove any custom domains pointing to this repository (or change them to redirect to Shopify). If you prefer to keep a Vercel preview/staging site, do not use the public custom domain there.
   - If you used Vercel to serve the public domain previously, remove the custom domain from the Vercel project so DNS will not conflict.

5. GitHub Actions / repo scripts
   - Update `.github/workflows/*` and `scripts/upload-create-charm-products.js` env variables to use the actual Shopify admin domain and repository secrets:
     - Set `SHOP_DOMAIN` or `SHOPIFY_SHOP_DOMAIN` to your-shop.myshopify.com (replace `your-shop` with your shop name).
     - Ensure `SHOPIFY_ACCESS_TOKEN` secret contains a valid Admin API token with the required scopes (write_files, write_products, etc.).

6. Code-level redirects
  - The repository currently includes `middleware.js` that redirects non-local traffic to `https://graceandgoldcompany.com` and `pages/build-your-charm.js` which redirects to the Shopify charm bar — keep these while you confirm DNS and Shopify primary settings. Once DNS and Shopify settings are stable and canonical, you can remove the middleware (recommended) or keep it as a guard-rail.

### How to remove the middleware safely (optional)

If you want me to remove the middleware file from the repo, here's a safe, reproducible way to do it locally or in CI. The script `scripts/remove_middleware.sh` (added to this repo) contains the exact commands you'll run. It:

- Removes `middleware.js`.
- Commits the change with a clear message.
- Pushes to `origin/main` (or to a feature branch if you prefer).

I added `scripts/remove_middleware.sh` to the repository so you can inspect or run it. If you want, I can run these changes now and push them (I'll do that only if you confirm).

7. Update contact details
   - Ensure `pages/contact.js` email `hello@graceandgoldco.com` is the correct contact email and that email DNS (MX records) is configured with your email provider.

8. Optional: add repository-level documentation
   - Keep this `DOMAINS.md` in the repo root as the single source of truth for domains and hosting decisions.

---

## Quick troubleshooting checklist

- If visitors see the Next.js site instead of Shopify:
  - Confirm DNS for the requested domain points to Shopify (run dig or use registrar panel).
  - Confirm Shopify domain is added and SSL issued.
  - Confirm Vercel or other hosting providers do not own the domain in their settings.

- If the GitHub Actions workflow needs to upload to Shopify:
  - Verify `SHOP_DOMAIN` points to the myshopify domain (not the public domain) and `SHOPIFY_ACCESS_TOKEN` is set in repo secrets.

---

## Next steps I can take for you (pick which you'd like)

1. Produce registrar-specific DNS instructions (GoDaddy, Cloudflare, Namecheap, Google Domains) — copy/paste records and screenshots. (Done - added above.)
2. Prepare an idempotent removal script for the middleware (added `scripts/remove_middleware.sh`) so you or I can remove it safely when ready. I will not execute it until you confirm. 
3. Update GitHub Actions to include your real `SHOP_DOMAIN` and create example workflow-run instructions (I will not add secrets to the repo). 
4. Audit Vercel project settings (I need access or you can grant me a Vercel project invite) and prepare steps to remove the custom domain or configure redirects.

If you want, say which of the above to do next and I will implement it.

---

Generated on: 2025-11-30
