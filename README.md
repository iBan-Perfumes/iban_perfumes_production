# i-BAN Perfumes

Luxury perfume brand website — Next.js App Router with a Neon-backed catalog and `/admin` product management.

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in DATABASE_URL, BLOB_READ_WRITE_TOKEN, ADMIN_*, AUTH_SECRET, NEXT_PUBLIC_*
npm run db:push    # or: npm run db:generate && npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

## Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon Postgres connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for image uploads |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin login credentials |
| `AUTH_SECRET` | JWT signing secret for admin session cookie |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Buy Now WhatsApp number |
| `ALLOW_INDEXING` | `"true"` to allow search indexing |

Admin uploads are always converted to **WebP** with `sharp` before storage on Vercel Blob. Seeded products may still use existing `public/images/` PNG/JPEG paths until re-uploaded.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply migrations |
| `npm run db:push` | Push schema directly (dev) |
| `npm run db:seed` | Seed categories + products from the legacy catalog |

## Stack

- Next.js (App Router)
- TypeScript + Tailwind CSS
- Neon Postgres + Drizzle ORM
- Vercel Blob (WebP product images)
- Admin session via `jose` JWT cookie
