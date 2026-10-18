This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CRM (leads and site activity)

A small private dashboard lives at `/crm/<CRM_KEY>`. There is no login screen: access is the secret link, so
keep it private. It is excluded from search engines and returns 404 for any other key.

- **Leads**: everything submitted through the contact / quotation form, with status tracking
  (new, contacted, quoted, won, lost), search, per-lead detail and a CSV export.
- **Website activity**: anonymous page views, sources, devices, countries (when the host supplies it),
  product interest and taps on phone, email and WhatsApp. No cookies, no IP addresses stored; Do Not Track
  and bots are ignored.
- **Storage**: one JSON file, `.data/crm.json` (change the folder with `CRM_DATA_DIR`). There is no
  database. It needs a host with a writable, persistent disk (a VPS, your own server or a Docker volume).
  Serverless hosts such as Vercel cannot keep the file, and the CRM shows a warning there.
- **Setup**: copy `.env.example`. In development open `/crm/local`. In production set `CRM_KEY` to a long
  random value and open `/crm/<CRM_KEY>`.
