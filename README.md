# Jayanta Pawar — Personal Portfolio

A complete, production-ready personal developer portfolio for **Jayanta Rajendra Pawar**, built with React, Vite, Three.js and Framer Motion.

Live demo: [deploy to Vercel and add URL here]

---

## 1. Project Overview

This is a single-page portfolio website with the following sections:

| Section | Description |
|---|---|
| Hero | Full-screen intro with animated typing, profile image, stat cards and CTA buttons |
| About | Bio, personal detail cards and resume download |
| Education | Animated timeline of BCA and HSC qualifications |
| Skills | Filterable cards with honest status labels (Comfortable / Familiar / Currently Learning) |
| Currently Learning | Expandable course curriculum with per-module progress |
| Experience | Work/internship timeline (Quick Heal Foundation Cyber Security Intern) |
| Projects | Filterable cards with full detail modal for 6 academic projects |
| Contact | Validated form with EmailJS support and mailto fallback |
| Footer | Social links, quick nav, resume download |

Extras: Sticky glass navbar, scroll progress bar, back-to-top button, dark/light theme, Three.js particle background, Voice Assistant (English + Marathi), loading screen.

---

## 2. Features

- Dark / Light mode with localStorage persistence
- Smooth scroll with active section indicator
- Framer Motion scroll-reveal animations
- Three.js floating particle field + wireframe sphere (lazy-loaded)
- Mouse-follow glow effect (desktop)
- Voice introduction via Web Speech API (English + Marathi)
- Fully filterable skills and projects sections
- Project detail modals with overview, features, challenges and learning outcomes
- Contact form with client-side validation, honeypot, EmailJS + mailto fallback
- Responsive down to 320 px — no horizontal scroll
- WCAG-oriented: semantic HTML, ARIA labels, visible focus, keyboard navigation
- Skip-to-content link
- Reduced-motion support
- SEO metadata, Open Graph, Twitter Card, JSON-LD Person schema
- Vercel-ready (vercel.json included)

---

## 3. Technology Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| 3D | Three.js, @react-three/fiber, @react-three/drei |
| Animations | Framer Motion |
| Icons | Lucide React |
| Voice | Web Speech API (browser built-in) |
| Styling | Plain CSS with CSS custom properties (no UI framework) |
| Fonts | Space Grotesk (headings), Inter (body) via Google Fonts |
| Deployment | Vercel (or Netlify / GitHub Pages) |

---

## 4. Folder Structure

```
jayanta-portfolio/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── profile-placeholder.png   ← replace with real photo
│   │   ├── project-ticket-booking.svg
│   │   ├── project-ai-chat.svg
│   │   ├── project-ngo.svg
│   │   ├── project-mental-health.svg
│   │   ├── project-xai.svg
│   │   └── project-student-management.svg
│   └── resume/
│       └── Jayanta_Rajendra_Pawar_Resume.pdf  ← add your PDF here
│
├── src/
│   ├── components/       ← one file per section/widget
│   ├── data/
│   │   └── portfolioData.js  ← ALL personal content lives here
│   ├── hooks/
│   │   ├── useTheme.js
│   │   └── useSpeech.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── responsive.css
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 5. Installation

```bash
# Clone or download the project
cd jayanta-portfolio

# Install dependencies
npm install
```

---

## 6. Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 7. How to Replace the Profile Photo

1. Prepare a square photo (recommended: 400 × 400 px minimum, JPG or PNG).
2. Name the file exactly: `profile-placeholder.png`
3. Copy it to: `public/images/profile-placeholder.png` (overwrite the existing placeholder).
4. The site will display it automatically — no code change needed.

> The hero section shows an animated "JP" initials fallback if the image fails to load.

---

## 8. How to Add Your Resume PDF

1. Export your resume as a PDF.
2. Name the file exactly: `Jayanta_Rajendra_Pawar_Resume.pdf`
3. Copy it to: `public/resume/Jayanta_Rajendra_Pawar_Resume.pdf`
4. All "Download Resume" buttons across the site will work immediately.

> If the file is missing, the browser will show a 404. The buttons still render; only the download fails gracefully.

---

## 9. How to Edit Personal Details

Open `src/data/portfolioData.js`. Every piece of content on the site is defined here:

```js
export const personal = {
  name:       'Jayanta Rajendra Pawar',
  email:      'your@email.com',        // ← edit
  phone:      '+91 XXXXX XXXXX',       // ← edit or leave as-is to hide
  github:     'https://github.com/...',// ← edit
  linkedin:   'https://linkedin.com/in/...', // ← edit
  location:   'Maharashtra, India',
  resumePath: '/resume/Jayanta_Rajendra_Pawar_Resume.pdf',
  profileImage: '/images/profile-placeholder.png',
  ...
}
```

Fields marked `← EDIT THIS` in the file are placeholders to replace before publishing.

---

## 10. How to Add GitHub and LinkedIn Links

In `src/data/portfolioData.js`:

```js
github:   'https://github.com/YOUR_USERNAME',
linkedin: 'https://linkedin.com/in/YOUR_PROFILE',
```

These values are used in the Hero social icons, Navbar, Contact section and Footer automatically.

---

## 11. How to Add Project Screenshots

1. Export a screenshot as PNG (recommended: 800 × 450 px).
2. Name it to match the project, e.g. `project-ticket-booking.png`.
3. Place it in `public/images/`.
4. Update the `image` field for that project in `portfolioData.js`:

```js
image: '/images/project-ticket-booking.png',
```

All project cards and modals will display the real screenshot immediately.

---

## 12. How to Configure EmailJS

1. Create a free account at [https://www.emailjs.com](https://www.emailjs.com).
2. Create a service and an email template.
3. In `src/data/portfolioData.js`, fill in:

```js
export const contactInfo = {
  emailjs: {
    serviceId:  'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID',
    publicKey:  'YOUR_PUBLIC_KEY',
  },
}
```

4. In your EmailJS template, use these variables:
   - `{{from_name}}` — sender name
   - `{{from_email}}` — sender email
   - `{{subject}}` — subject line
   - `{{message}}` — message body
   - `{{to_name}}` — recipient name (Jayanta)

> If all three values are empty strings (default), the form falls back to opening the user's default email client via `mailto:`.

**Important:** Never commit real API keys to a public repository. For production, use environment variables:

```bash
# .env (not committed — already in .gitignore)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then read them in `portfolioData.js`:

```js
serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || '',
templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '',
```

---

## 13. How the Voice Assistant Works

The Voice Assistant widget (floating mic button, bottom-right) uses the browser's built-in **Web Speech API** — no paid service, no API key.

- Click the mic button to open the panel.
- Select **English** or **मराठी** (Marathi).
- Click **Play Introduction** — speech starts after the user gesture (required by browsers).
- Use **Pause / Resume / Stop / Replay** controls.
- Adjust volume and speed with the sliders.
- Click **Transcript** to read the script as text (accessibility).

The introduction is remembered in `sessionStorage` so it does not replay automatically on every page visit.

---

## 14. Browser Autoplay Restrictions

Browsers block audio/speech that starts without a user interaction. This portfolio handles this correctly:

- Speech synthesis **never starts automatically**.
- The "Play Introduction" button must be clicked **before** any audio starts.
- The pulsing mic icon only activates **after** the user clicks Play.
- On browsers that do not support the Web Speech API (e.g. older Firefox), a clear fallback message is shown.

---

## 15. Deploying to Vercel (Recommended)

1. Push the project folder to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and sign in.
3. Click **Add New → Project** and import your GitHub repository.
4. Vercel auto-detects Vite. Confirm these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

The included `vercel.json` handles SPA routing (all paths serve `index.html`).

> Add your EmailJS environment variables in **Vercel → Project → Settings → Environment Variables** if using EmailJS.

---

## 16. Deploying to Netlify

1. Push to GitHub.
2. Go to [https://app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Connect GitHub and select the repository.
4. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.
6. Add a `_redirects` file to `public/` for SPA routing:

```
/*  /index.html  200
```

---

## 17. Deploying to GitHub Pages

1. Install the gh-pages package:

```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:

```json
"homepage": "https://YOUR_USERNAME.github.io/jayanta-portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. In `vite.config.js`, add:

```js
base: '/jayanta-portfolio/',
```

4. Run:

```bash
npm run deploy
```

---

## 18. Build Command

```bash
npm run build
```

Output is generated in the `dist/` folder. Preview the production build locally:

```bash
npm run preview
```

---

## 19. Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID | Optional (uses mailto fallback) |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Optional |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | Optional |

Create a `.env` file in the project root (already excluded from git via `.gitignore`).

---

## 20. Troubleshooting

**`npm` is blocked by PowerShell execution policy**

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
```

**Voice assistant is silent**

- Ensure you clicked the Play button (autoplay is blocked until a user gesture).
- Test in Chrome or Edge — best Speech API support.
- On mobile, the browser may require an additional gesture.

**Profile photo not showing**

- Check the filename is exactly `profile-placeholder.png`.
- Check the file is in `public/images/`.
- The site shows an animated "JP" initials fallback automatically.

**Resume download shows 404**

- The PDF must be placed at `public/resume/Jayanta_Rajendra_Pawar_Resume.pdf`.
- Check the filename matches exactly (case-sensitive on Linux servers).

**Three.js background not visible**

- WebGL may be disabled in your browser or device.
- A CSS gradient fallback is shown automatically.
- On low-end devices, the particle count is reduced.

**Build warning: chunk larger than 500 kB**

- This is Three.js and is expected. It is not an error.
- Three.js is lazy-loaded and only requested when the Hero section mounts.
- The `chunkSizeWarningLimit` in `vite.config.js` is set to 900 kB to suppress the warning.

**Changes to `portfolioData.js` not appearing**

- Save the file — Vite hot-reloads automatically in dev mode.
- For production, run `npm run build` again and redeploy.

---

## Credits

Built by Kiro AI for Jayanta Rajendra Pawar.  
Stack: React · Vite · Three.js · Framer Motion · Lucide React · Web Speech API
