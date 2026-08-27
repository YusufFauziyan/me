export const site = {
  name: "Yusuf Fauziyan Malik",
  firstName: "Yusuf",
  lastName: "Fauziyan",
  username: "yusuffauziyan",
  role: "Fullstack Developer",
  location: "Jakarta, Indonesia",
  headline: "Fullstack, engineered.",
  tagline:
    "I build fast, scalable web applications with a focus on clean code and exceptional UX. React, Next.js, Node.js.",
  email: "yusuffauziyan@gmail.com",
  github: "https://github.com/yusuffauziyan",
  linkedin: "https://www.linkedin.com/in/yusuffauziyan",
  cv:
    process.env.NEXT_PUBLIC_CV_URL ||
    "https://drive.google.com/file/d/1YiEvdg_OlaoFEpbC2obQVXsK7B20pPMy/view?usp=sharing",
  // Set NEXT_PUBLIC_SITE_URL in production so OG images and the sitemap use absolute URLs.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yusuffauziyan.vercel.app",
};

export type Project = {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: { label: string; tone: string }[];
};

export const projects: Project[] = [
  {
    title: "YuMa",
    description:
      "An intelligent AI workspace for document intelligence, data analysis, and multimodal conversations. Go + React 19, PDF/Office parsing, WebGL wave interactions, streaming SSE.",
    href: "https://yuma.maleqq.com",
    image: "/readmes/yuma/landing.png",
    tags: [
      { label: "React 19", tone: "t-node" },
      { label: "Go", tone: "t-ai" },
      { label: "Postgres", tone: "t-db" },
      { label: "Docker", tone: "t-next" },
    ],
  },
  {
    title: "Ngantry",
    description:
      "A digital queue management system: customers pull tickets themselves, watch the queue live, and admins run the flow from one dashboard.",
    href: "https://ngantry.my.id",
    image: "/readmes/landing-page.png",
    tags: [
      { label: "React", tone: "t-node" },
      { label: "Go / Gin", tone: "t-ai" },
      { label: "GORM", tone: "t-db" },
      { label: "Docker", tone: "t-next" },
    ],
  },
  {
    title: "YuBooth",
    description:
      "A scalable photobooth system: capture, QR handoff, online galleries, and physical print management.",
    href: "https://yu-booth.vercel.app",
    image:
      "https://github.com/YusufFauziyan/YuBooth/blob/main/docs/landing.png?raw=true",
    tags: [
      { label: "Next.js", tone: "t-next" },
      { label: "Socket.IO", tone: "t-node" },
      { label: "MySQL", tone: "t-db" },
      { label: "R2", tone: "t-ui" },
    ],
  },
  {
    title: "Fix My Road",
    description:
      "Real-time pothole detection across mobile, web, and a YOLOv8 inference backend. Open source, distributed.",
    href: "https://github.com/YusufFauziyan/fixmyroad",
    image:
      "https://github.com/YusufFauziyan/fixmyroad/blob/main/docs/app-screenshot-1.png?raw=true",
    tags: [
      { label: "Python", tone: "t-py" },
      { label: "YOLOv8", tone: "t-ai" },
      { label: "Flutter", tone: "t-next" },
      { label: "Postgres", tone: "t-db" },
    ],
  },
  {
    title: "NikahIn",
    description:
      "A SaaS for elegant digital wedding invitations: modern templates, live customisation, Midtrans checkout.",
    href: "https://nikah-in.vercel.app",
    image:
      "https://github.com/YusufFauziyan/NikahIn/blob/main/public/screenshot-landing.png?raw=true",
    tags: [
      { label: "Next.js", tone: "t-next" },
      { label: "Supabase", tone: "t-db" },
      { label: "Midtrans", tone: "t-ui" },
    ],
  },
  {
    title: "Boothly",
    description:
      "Capture, customise, and download photo strips entirely in the browser. No upload, no account, no wait.",
    href: "https://boothly-chi.vercel.app",
    image:
      "https://github.com/YusufFauziyan/Boothly/blob/main/public/screenshot-landing.png?raw=true",
    tags: [
      { label: "Next.js", tone: "t-next" },
      { label: "Tailwind", tone: "t-ui" },
    ],
  },
  {
    title: "AttendEase",
    description:
      "Employee attendance wired straight into Google Sheets, recorded and synced in real time.",
    href: "https://github.com/YusufFauziyan/attendance-nextjs",
    image:
      "https://github.com/YusufFauziyan/attendance-nextjs/blob/main/public/screnshoot-landing.png?raw=true",
    tags: [
      { label: "Next.js", tone: "t-next" },
      { label: "Sheets API", tone: "t-ui" },
    ],
  },
];

export const featured = {
  title: "YuMa",
  description:
    "An intelligent AI workspace: document intelligence over PDF and Office files, data profiling, generative media, and multimodal conversation. Go and Gin on the back, React 19 and WebGL on the front, answers streamed over SSE.",
  image: projects[0].image,
  href: projects[0].href,
  meta: [
    { label: "Stack", value: "Go · Gin · React 19" },
    { label: "Data", value: "PostgreSQL · GORM · R2" },
    { label: "Year", value: "2026" },
  ],
};

export const skills = [
  {
    n: "01",
    title: "Frontend",
    description:
      "Component architecture, state management, and interfaces that hold up under real data.",
    chips: ["React", "Next.js", "TypeScript", "Tailwind", "Redux"],
  },
  {
    n: "02",
    title: "Backend",
    description:
      "Go and Node services, REST and SSE streams, auth, and integrations that don't fall over.",
    chips: ["Go", "Gin", "Node.js", "Express", "Python", "Docker"],
  },
  {
    n: "03",
    title: "Data",
    description:
      "Schema design, migrations, and query work that keeps the dashboard fast at scale.",
    chips: ["PostgreSQL", "MySQL", "GORM", "Prisma", "Supabase"],
  },
  {
    n: "04",
    title: "Mobile",
    description:
      "Cross-platform iOS and Android from one codebase, native where it actually matters.",
    chips: ["Flutter", "REST", "Offline sync"],
  },
];

export const experience = [
  {
    period: "24 — Now",
    role: "Software Engineer",
    company: "PT Bodha Padma Nawadhya",
    description:
      "High-impact web and mobile apps including the EMAS enterprise platform. Cross-platform iOS/Android, robust state management, REST integrations, pixel-perfect responsive UI.",
  },
  {
    period: "22 — 24",
    role: "Software Engineer",
    company: "PT Bodha Dharmaja Aryadhana",
    description:
      "Fullstack work on the Khayangan VM management platform and Sapujagad big-data platform. Complex APIs, real-time streaming, infrastructure monitoring, interactive dashboards.",
  },
  {
    period: "2022",
    role: "Fullstack Developer",
    company: "DumbWays Bootcamp",
    description:
      "PERN stack from scratch: an e-commerce platform and a music player, with REST APIs, real database schemas, and Midtrans payments.",
  },
  {
    period: "17 — 22",
    role: "Barista",
    company: "PT Sari Coffee Indonesia",
    description:
      "Communication, teamwork, and problem-solving at speed. The attention to detail carried straight over.",
  },
];
