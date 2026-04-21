# Better Living Systems

Marketing website for Better Living Systems, a family-owned firm in Winter Garden, FL that's been doing security, commercial fire, and smart home work since 1979.

Static HTML. No build step. Edit and ship.

## Structure

```
index.html          Home
security.html       Security & Automation
fire.html           Commercial Fire Protection
smart-home.html     Smart Home & Theater
about.html          About
contact.html        Contact, multi-step quote form
shared/
  styles.css        Design tokens, typography, nav, footer
  shared.js         Nav + footer renderers, reveal on scroll, parallax
images/             Photography (JPEG + WebP) and logos (PNG)
```

## Local preview

```sh
python3 -m http.server 8765
open http://localhost:8765
```

Any static file server works. No dependencies.

## Contact form

Posts JSON to Formspree. Endpoint lives in `contact.html` as `FORMSPREE_ENDPOINT`. To move to a different provider, replace the `fetch` in the `submit()` function.

## Deployment

Connected to Cloudflare Pages. Pushing to `main` triggers a deploy.

## Design system

Editorial, family-firm voice. Referenced Dwell / Architectural Digest, not typical security-company tropes. All tokens live in `shared/styles.css`:

- Ivory and paper backgrounds, deep ink text, oxidized brass accent
- Instrument Serif for display, Inter Tight for body, JetBrains Mono for eyebrows and meta
- No em-dashes anywhere (commas only, per client preference)
- Sparse shadows, no rounded corners except on pill buttons

Phone: (407) 696-4411. Serving Orlando, Winter Garden, and Central Florida.
