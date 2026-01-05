# SPICY NFT CLUB - Premium Membership NFT Landing Page

This is the landing page for SPICY NFT CLUB, built with React, Vite, and Tailwind CSS.

## 🚀 Project Overview

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Deployment**: Vercel (Static Site)

## 🛠️ Setup & Development

### Prerequisites
- Node.js (v20 or later recommended)
- pnpm (recommended) or npm

### Installation
```bash
pnpm install
```

### Local Development
Start the development server:
```bash
pnpm dev
```
Access the site at `http://localhost:5173`.

### Build
Build for production:
```bash
pnpm build
```
The output will be in the `dist` directory.

## 📦 Deployment Guide (Vercel)

This project is configured for deployment on Vercel.

### Important: Git Author Identity
**Crucial for Vercel Deployment:**
Vercel's security settings require that the Git commit author matches your Vercel account email. If they do not match, Vercel may reject the deployment with a "Deployment has failed" error.

**How to configure Git user:**
Before pushing changes, ensure your local Git config matches your Vercel account:

```bash
git config user.email "mail@nishiyama.work"
git config user.name "248ma"
```

### Configuration Files
- **`vite.config.ts`**: Configured to output build artifacts to `dist`.
- **`vercel.json`**: Configured to serve the `dist` directory and handle SPA routing (rewrites all requests to `index.html`).

### Troubleshooting Deployments
If a deployment fails or doesn't trigger:
1. **Check Git Author**: Ensure the latest commit was authored by your Vercel email.
2. **Check Project**: Ensure you are looking at the correct project in Vercel (e.g., `spicy-nft-club-lp-main`).
3. **Manual Redeploy**: Go to Vercel Dashboard > Deployments > Redeploy (uncheck "Use existing Build Cache").

## 📂 Project Structure

```
/
├── client/             # Frontend source code
│   ├── public/         # Static assets
│   ├── src/            # React components and logic
│   └── index.html      # Entry HTML
├── dist/               # Production build output
├── vercel.json         # Vercel configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies and scripts
```
