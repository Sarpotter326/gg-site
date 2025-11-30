# Vercel project audit checklist

This checklist helps you confirm whether a Vercel project has any custom domains that conflict with the Shopify setup, and how to remove them safely.

What I can check automatically from this repo:
- Presence of `vercel.json` (none found). If no config is present, the project may still be connected in the Vercel dashboard.

Manual steps to audit Vercel (do these in the Vercel dashboard):

1. Sign in to https://vercel.com and open the project associated with this repository.
2. Go to the "Domains" tab for the project.
   - Look for `graceandgoldcompany.com`, `www.graceandgoldcompany.com`, `graceandgoldco.com`, or any other custom domain pointing at this project.
   - If present, remove the custom domain from the Vercel project OR change it to a placeholder subdomain (like `staging.graceandgoldcompany.com`) that is not publicly used.
3. If you remove the domain from Vercel, ensure your registrar's DNS points to Shopify as documented in `DOMAINS.md`.
4. Check Vercel redirects and rewrites (if any): Settings → Redirects / Rewrites. Remove any rules that forward the apex to Vercel.

Notes & safety
- Removing a domain from a Vercel project does not change DNS records. DNS changes are made at your domain registrar.
- If you're not sure which Vercel project is connected, search for projects by repository name or contact team members with Vercel access.
- If you'd like, I can prepare exact removal steps for a given Vercel project if you provide the Vercel team/org and project name or grant temporary access.
