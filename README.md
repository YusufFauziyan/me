# ✦ Yusuf Fauziyan Malik — Portfolio

A modern, interactive developer portfolio built with **Next.js 16**, **Framer Motion**, and **Tailwind CSS 4**. Features a clean design system with light/dark theming, smooth scroll-driven animations, and interactive 3D elements.

## ✨ Features

- **Interactive 3D ID Card** — Tilt-responsive card with glare effects using Framer Motion spring physics
- **Dark / Light Theme** — Seamless theme switching with CSS custom properties and `next-themes`
- **Scroll Animations** — Viewport-triggered entrance animations on every section
- **Loading Screen** — Polished loading state on initial page load
- **Responsive Design** — Mobile-first layout that adapts across all screen sizes
- **Smooth Scrolling** — Scroll-to-top button and anchor-based navigation
- **Static Export** — Fully pre-rendered for fast load times

## 🧱 Tech Stack

| Layer       | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org) (App Router)   |
| Language    | TypeScript                                       |
| Styling     | Tailwind CSS 4 + CSS Custom Properties           |
| Animations  | Framer Motion                                    |
| Icons       | Lucide React                                     |
| Fonts       | Syne · DM Sans · JetBrains Mono (Google Fonts)   |
| Deployment  | Vercel                                           |

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css        # Design tokens & utility classes
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Single-page composition
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   └── ContactSection.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── ThemeProvider.tsx
│   ├── AnimatedSection.tsx
│   ├── ScrollToTop.tsx
│   ├── LoadingScreen.tsx
│   └── Icons.tsx
├── lib/
│   └── data.ts            # Projects, experiences, skills & config
└── public/
    └── me.png             # Profile photo
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yusuffauziyan/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

The portfolio uses a minimal CSS custom property system defined in `globals.css`:

```
Light                    Dark
──────────────────       ──────────────────
--bg:     #F5F2ED        --bg:     #0D0D0F
--fg:     #0D0D0F        --fg:     #F5F2ED
--card:   #ECEAE4        --card:   #161618
--border: #D8D4CC        --border: #2A2A2E
--muted:  #8C8882        --muted:  #6B6B72
--accent: #E8FF47        --accent: #E8FF47
```

## 🌐 Environment Variables

Configure personal information via environment variables:

```env
NAME=
FIRST_NAME=
LAST_NAME=
NICKNAME=
USERNAME=

# Job
JOB_TITLE='["Fullstack Developer"]'
JOB_DESCRIPTION=

# Social Media
EMAIL_ADDRESS=
GITHUB_ADDRESS=
LINKEDIN_ADDRESS=
X_ADDRESS=
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
