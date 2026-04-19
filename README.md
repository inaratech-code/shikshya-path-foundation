# Shikshya Path Foundation

Next.js site for **Shikshya Path Foundation** — study abroad consultancy (Kathmandu, Nepal).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal).

## Brand assets

- **`public/images/Shikshya_Path_Foundation_cropped-removebg-preview.png`** — Main PNG logo (navbar, footer, Open Graph, admin login, JSON-LD). Sized large in the header via `BrandLogo`.
- **`public/images/SPK.jpeg`** — Compact mark for **favicon** and **admin sidebar** only.

Paths: `MAIN_SITE_LOGO_PATH` and `NAVBAR_LOGO_PATH` in `src/data/siteContent.ts`.

## Deploy

Production uses **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare/get-started):

```bash
npm run deploy
```

Wrangler config: `wrangler.jsonc`. To remove an old **Vercel** project, delete it in the [Vercel dashboard](https://vercel.com/dashboard) (Settings → Danger Zone); this repo no longer depends on Vercel.
