# React + Vite + GitHub Pages Starter

A blank React app pre-configured to deploy to GitHub Pages.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure for your repo** — you MUST edit two things before deploying:

   - `vite.config.ts` → change `base: '/YOUR_REPO_NAME/'` to your actual repo name
     (e.g. if your repo is `github.com/alice/my-app`, use `base: '/my-app/'`)
     - Exception: if this repo is named `YOUR_USERNAME.github.io`, use `base: '/'` instead.

   - `package.json` → change `"homepage"` to your actual GitHub Pages URL:
     ```
     "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
     ```

3. **Run locally**
   ```bash
   npm run dev
   ```

## Deploy to GitHub Pages

1. Push this project to a new GitHub repo (main branch):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. Deploy (builds the app and pushes `dist/` to the `gh-pages` branch):
   ```bash
   npm run deploy
   ```

3. On GitHub: go to **Settings → Pages** → set **Source** to "Deploy from a branch" →
   select branch **`gh-pages`**, folder **`/ (root)`** → Save.

4. Your site will be live at the `homepage` URL within a minute or two.

## Notes

- Never manually edit or commit anything to the `gh-pages` branch — it's fully
  managed by the `gh-pages` npm package and gets overwritten on every deploy.
- Keep developing on `main`; run `npm run deploy` whenever you want to publish.
