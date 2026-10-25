# ReceiptRelay MVP

A small React + Vite MVP for bookkeepers to track missing client documents and draft follow-up messages.

## Requirements
- Node.js 20+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## MVP features
- Add and search clients
- Track document items as missing/received
- Draft friendly/direct reminders for email or WhatsApp
- Copy reminders to clipboard
- Export all checklist items to CSV
- Persist demo data in browser localStorage

## Important limitations
- No authentication or payment processing is implemented.
- Data is stored in the current browser only; it does not sync across devices or users.
- Do not enter real client financial data into this demo.
- No reminders are automatically sent. Users must review and send drafts themselves.
- The starter client is illustrative demo data.

## Fast deployment
### Vercel
1. Push this folder to a new GitHub repository.
2. In Vercel, import the repository.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. No environment variables are required.

### Netlify
1. Push this folder to a GitHub repository.
2. Import the repository in Netlify.
3. Build command: `npm run build`; publish directory: `dist`.
4. Deploy.

## Before charging money
1. Add hosted authentication and server-side storage (e.g. Supabase Auth + Postgres).
2. Enforce per-user access controls and row-level security.
3. Add a payment provider that supports your business and target customers, and verify payment server-side.
4. Add privacy policy, terms, deletion/export flow, and support contact.
5. Test checkout, access after payment, failed payment, refund, and mobile UX.
6. Never describe the current browser-only version as secure multi-user storage.


## Landing page and waitlist
The app opens on a landing page with a Try the Demo action, feature summary, prototype disclaimer, planned $1 offer, and waitlist form.

### Configure real waitlist collection before public promotion
The form is wired to Formspree when `VITE_FORMSPREE_ENDPOINT` is configured:
1. Create a form at https://formspree.io/ and copy its endpoint.
2. Copy `.env.example` to `.env`.
3. Replace the placeholder with your actual endpoint, e.g. `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-real-id`.
4. Restart the Vite server or redeploy.

Without that endpoint, the form intentionally runs in preview mode and saves submissions only in the visitor's browser. It displays a warning and does NOT send signups to the product owner. Do not launch a waitlist campaign until a real endpoint is configured and tested.
