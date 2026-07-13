# Yakafinity

Yakafinity is a production-ready digital innovation studio website built with Next.js, React, TypeScript, Tailwind CSS, Prisma, Resend, and Google Gemini.

The application includes a responsive marketing website, video hero, light/dark themes, enquiry management, email notifications, a protected admin dashboard, a Gemini AI assistant with image understanding, a WhatsApp shortcut, and the owner's external portfolio.

## Features

### Public website

- Responsive home, About, and Contact pages.
- Full-screen looping MP4 hero background.
- Custom Yakafinity logo and favicon.
- Floating glass-effect navigation.
- Persistent day/night theme selection using browser storage.
- GSAP and Framer Motion animations.
- Responsive service, process, work, and call-to-action sections.
- Modern glass cards, gradients, ambient decorations, and hover effects.
- Accessible navigation labels and responsive mobile menu.

### Contact and enquiries

- Validated project enquiry form.
- Server-side validation with Zod.
- PostgreSQL lead persistence through Prisma.
- Temporary in-memory lead storage during development when no database is configured.
- Resend email notifications sent to the configured contact address.
- The visitor's email is set as the reply-to address.
- Floating WhatsApp button for `+94 72 100 5844` with a predefined message.

### Gemini AI assistant

- Floating AI task window available throughout the website.
- Text questions and answers through Gemini 3 Flash.
- JPEG, PNG, WebP, and GIF image uploads for analysis.
- Maximum client image size of 7 MB.
- Server-only API key usage; the Gemini key is never sent to the browser.
- Loading, validation, failure, and empty-response handling.
- The current assistant analyzes images; it does not generate downloadable images.

### Administration

- Protected admin login using an HTTP-only session cookie.
- Signed sessions using `jose` and `AUTH_SECRET`.
- Lead dashboard with enquiry totals and status counts.
- Lead workflow statuses: `NEW`, `CONTACTED`, `QUALIFIED`, `WON`, and `CLOSED`.
- Lead status updates through a protected API route.
- Eight-hour admin sessions.

### Portfolio

- The footer and About page link to the owner's external portfolio at [tharindujb.vercel.app](https://tharindujb.vercel.app/).
- `/admin.html` redirects permanently to `/admin`.

## Technology

| Area | Technology |
| --- | --- |
| Framework | Next.js 15 App Router |
| Interface | React 19 and TypeScript |
| Styling | Tailwind CSS 3 and custom CSS |
| Animation | GSAP and Framer Motion |
| Database | PostgreSQL and Prisma |
| Authentication | Signed HTTP-only cookies with `jose` |
| Validation | Zod |
| Email | Resend |
| AI | Google Gemini Developer API |
| Icons | Lucide React and inline WhatsApp SVG |
| Deployment | Vercel |

## Project structure

```text
Yakafinity/
|-- app/
|   |-- about/                 About page
|   |-- admin/                 Admin dashboard and login
|   |-- api/
|   |   |-- ai/                Gemini server endpoint
|   |   |-- auth/              Login and logout endpoints
|   |   |-- contact/           Enquiry submission endpoint
|   |   `-- leads/             Lead status endpoint
|   |-- contact/               Contact page
|   |-- globals.css            Global design system and themes
|   |-- layout.tsx             Metadata and global floating tools
|   `-- page.tsx               Home page
|-- components/
|   |-- ai-assistant.tsx       Gemini chat and image interface
|   |-- contact-form.tsx       Enquiry form
|   |-- header.tsx             Navigation and theme switcher
|   |-- hero.tsx               Video hero
|   |-- whatsapp-button.tsx    WhatsApp shortcut
|   `-- ...                    Shared website/admin components
|-- lib/
|   |-- auth.ts                Session helpers
|   |-- leads.ts               Database and development lead storage
|   `-- site-data.ts           Navigation and service content
|-- prisma/
|   `-- schema.prisma          PostgreSQL lead model
|-- public/
|   |-- 0712-1.mp4             Hero background video
|   `-- yakafinity-logo.png    Website logo and icon
|-- .env.example               Environment template
|-- eslint.config.mjs          ESLint flat configuration
|-- next.config.ts             Images and redirects
|-- tailwind.config.ts         Tailwind theme
`-- package.json               Scripts and dependencies
```

Generated directories such as `.next/`, `node_modules/`, Vercel metadata, logs, local environment files, and TypeScript build caches are excluded by `.gitignore`.

## Requirements

- Node.js 20 or newer is recommended.
- npm.
- PostgreSQL for persistent production enquiries.
- A Google AI Studio API key for the AI assistant.
- A Resend account and verified sender domain for enquiry emails.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create the local environment file:

```powershell
Copy-Item .env.example .env.local
```

3. Replace the example values in `.env.local`.

4. Apply the Prisma schema when using PostgreSQL:

```bash
npm run db:push
```

5. Start development:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Production | PostgreSQL connection string used by Prisma. |
| `ADMIN_EMAIL` | Production | Admin dashboard login email. |
| `ADMIN_PASSWORD` | Production | Admin dashboard login password. Use a strong unique value. |
| `AUTH_SECRET` | Production | Long random secret used to sign admin session tokens. |
| `GEMINI_API_KEY` | For AI | Server-side Google Gemini API credential. |
| `RESEND_API_KEY` | For email | Resend API credential for enquiry notifications. |
| `CONTACT_TO_EMAIL` | For email | Address that receives new enquiries. |
| `CONTACT_FROM_EMAIL` | For email | Sender identity on a verified Resend domain. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical deployment URL used as the metadata base. |

Example:

```env
DATABASE_URL="postgresql://user:password@host:5432/yakafinity"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="replace-with-a-strong-password"
AUTH_SECRET="replace-with-a-long-random-secret"
GEMINI_API_KEY="your-gemini-api-key"
RESEND_API_KEY="your-resend-api-key"
CONTACT_TO_EMAIL="jananjayabandara2003@gmail.com"
CONTACT_FROM_EMAIL="Yakafinity <website@your-verified-domain.com>"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

Never commit `.env.local`. Any key shared in a chat, screenshot, source file, or commit history must be revoked and replaced before deployment.

## Application routes

### Pages

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page and video hero. |
| `/about` | Public | Studio information and owner portfolio link. |
| `/contact` | Public | Project enquiry form and contact information. |
| `/admin/login` | Public | Admin authentication form. |
| `/admin` | Protected | Lead-management dashboard. |

### API routes

| Route | Method | Description |
| --- | --- | --- |
| `/api/ai` | `POST` | Sends validated text and optional images to Gemini. |
| `/api/contact` | `POST` | Validates, stores, and emails project enquiries. |
| `/api/auth/login` | `POST` | Validates admin credentials and creates a session. |
| `/api/auth/logout` | `POST` | Clears the admin session. |
| `/api/leads/[id]` | `PATCH` | Updates a protected lead status. |

## Database

The Prisma schema defines a `Lead` model containing:

- Contact name and email.
- Optional phone and company.
- Requested service and estimated budget.
- Project message.
- Workflow status.
- Creation and update timestamps.

Run the following after setting `DATABASE_URL`:

```bash
npm run db:push
```

Without `DATABASE_URL`, leads use process-memory storage. This is suitable only for local demonstrations because data disappears when the process restarts and does not persist across Vercel functions.

## Email delivery

The contact endpoint sends email only when both `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are configured. For production delivery:

1. Add and verify a sending domain in Resend.
2. Set `CONTACT_FROM_EMAIL` to an address on that domain.
3. Add all Resend variables to Vercel.
4. Submit a test enquiry after deployment.

If Resend rejects an email, the form returns an error instead of incorrectly showing a success state.

## AI assistant security

- Gemini requests pass through `/api/ai`; browser code never reads the API key.
- Text prompts are limited to 4,000 characters.
- Encoded image data is limited server-side.
- Supported image MIME types are restricted.
- Rotate the Gemini key immediately if it has been exposed.
- Add rate limiting before high-traffic public use to control abuse and API costs.

## Vercel deployment

1. Push the project to a Git repository.
2. Import the repository into Vercel.
3. Select **Next.js** as the framework preset.
4. Keep the install command as `npm install` and build command as `npm run build`.
5. Add the production environment variables in **Project Settings → Environment Variables**.
6. Provision PostgreSQL and set `DATABASE_URL`.
7. Apply the Prisma schema to the production database with `npm run db:push`.
8. Configure and verify the Resend sender domain.
9. Rotate the exposed Gemini credential and add the replacement key.
10. Deploy, then test the home page, contact form, email delivery, AI assistant, admin login, and lead updates.

The 43 MB MP4 hero is served as a static asset. Monitor Vercel bandwidth usage; for higher traffic, consider moving and compressing the video through a dedicated media CDN.

## Validation before deployment

```bash
npm run lint
npm run build
```

The production build performs Prisma Client generation, Next.js compilation, type checking, static-page generation, and server-route tracing.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint across the source project. |
| `npm run build` | Generate Prisma Client and create a production build. |
| `npm start` | Run the generated production build. |
| `npm run db:push` | Synchronize the Prisma schema with PostgreSQL. |
| `npm run db:studio` | Open Prisma Studio for database inspection. |

## Production checklist

- [ ] Rotate the Gemini API key that was previously exposed.
- [ ] Configure a production PostgreSQL database.
- [ ] Use strong admin credentials.
- [ ] Generate a long random `AUTH_SECRET`.
- [ ] Configure the canonical site URL.
- [ ] Verify the Resend sender domain.
- [ ] Add all environment variables to Vercel.
- [ ] Run lint and the production build.
- [ ] Test enquiry persistence and email delivery.
- [ ] Test Gemini text and image requests.
- [ ] Test admin login, logout, and lead status updates.
- [ ] Test mobile navigation, theme selection, WhatsApp, and portfolio links.
- [ ] Monitor Gemini, Resend, database, and Vercel usage after launch.

## License

This is a private Yakafinity project. No open-source license is currently provided.
