export const projects = [
  {
    id: 1,
    title: "YUMA AI",
    description: "A premium, full-stack AI chatbot SaaS application powered by Google Gemini. Features real-time streaming responses, Google SSO authentication, multi-conversation support, and a beautiful landing page with smooth Framer Motion animations.",
    tech: ["Next.js", "Express", "Tailwind", "MySQL", "Prisma", "Framer Motion", "Google Gemini", "Google SSO"],
    image: "https://github.com/YusufFauziyan/yuma_ai/blob/main/frontend/public/screenshot-landing.png?raw=true",
    demo: "https://yuma-ai-azure.vercel.app",
    github: "https://github.com/YusufFauziyan/yuma_ai",
    featured: true,
  },
  {
    id: 2,
    title: "YuBooth",
    description: "YuBooth is a modern, scalable, and interactive photobooth system. It comes with a beautiful Next.js frontend and a robust Node.js + Prisma backend. You can use this platform to capture photos with friends, generate QR codes, save memories online, and even manage physical prints!",
    tech: ["Next.js", "Express", "Tailwind", "MySQL", "Socket.IO", "Prisma", "Framer Motion", "Google SSO", "Cloudflare R2"],
    image: "https://github.com/YusufFauziyan/YuBooth/blob/main/docs/landing.png?raw=true",
    demo: "https://yu-booth.vercel.app",
    github: "https://github.com/YusufFauziyan/YuBooth",
    featured: true,
  },
  {
    id: 3,
    title: "Fix My Road",
    description: "FixMyRoad is a distributed open-source project spanning across Mobile, Web, and backend Artificial Intelligence tailored for automated, real-time pothole detection on public roads.",
    tech: ["Next.js", "Python", "TensorFlow", "Keras", "FastAPI", "PostgreSQL", "Flutter (Android/iOS)", "Cloudflare R2", "Yolo v8"],
    image: "https://github.com/YusufFauziyan/fixmyroad/blob/main/docs/app-screenshot-1.png?raw=true",
    demo: "#",
    github: "https://github.com/YusufFauziyan/fixmyroad",
    featured: false,
  },
  {
    id: 4,
    title: "CloudVault",
    description: "Secure file storage and collaboration platform with end-to-end encryption, version control, and team workspaces.",
    tech: ["Next.js", "AWS S3", "PostgreSQL", "Prisma", "TypeScript"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    demo: "#",
    github: "#",
    featured: false,
  },
];

export const experiences = [
  {
    id: 1,
    role: "Senior Fullstack Engineer",
    company: "Vercel",
    duration: "Jan 2023 — Present",
    description: "Lead development of Next.js-based SaaS platforms. Architected microservices infrastructure serving 2M+ users. Reduced API response times by 60% through caching and query optimization.",
    current: true,
  },
  {
    id: 2,
    role: "Fullstack Developer",
    company: "Shopify",
    duration: "Mar 2021 — Dec 2022",
    description: "Built merchant-facing features for the Shopify admin. Developed custom React components used by 100k+ merchants. Contributed to internal design system and component library.",
    current: false,
  },
  {
    id: 3,
    role: "Backend Developer",
    company: "Stripe",
    duration: "Jul 2019 — Feb 2021",
    description: "Maintained and extended core payment processing APIs. Built webhook infrastructure handling 50M+ events/day. Improved developer documentation and API SDKs.",
    current: false,
  },
  {
    id: 4,
    role: "Junior Web Developer",
    company: "Accenture",
    duration: "Aug 2017 — Jun 2019",
    description: "Developed enterprise web applications for Fortune 500 clients. Worked across full stack using React, Node.js, and Oracle databases. Participated in agile development cycles.",
    current: false,
  },
];

export const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML", "CSS", "JavaScript"],
  backend: ["Node.js", "Express", "Python", "REST APIs", "GraphQL", "Firebase", "Socket IO"],
  database: ["PostgreSQL", "MySQL", "Prisma", "Supabase"],
  mobile: ["Flutter"],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];


export const socialMedia = {
  NAME: process.env.NAME,
  FIRST_NAME: process.env.FIRST_NAME,
  LAST_NAME: process.env.LAST_NAME,
  NICKNAME: process.env.NICKNAME,
  USERNAME: process.env.USERNAME,

  // JOB
  JOB_TITLE: process.env.JOB_TITLE ? JSON.parse(process.env.JOB_TITLE) : null,
  JOB_DESCRIPTION: process.env.JOB_DESCRIPTION,

  // SOCIAL MEDIA
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
  GITHUB_ADDRESS: process.env.GITHUB_ADDRESS,
  LINKEDIN_ADDRESS: process.env.LINKEDIN_ADDRESS,
  X_ADDRESS: process.env.X_ADDRESS,
};