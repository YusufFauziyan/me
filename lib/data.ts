export const projects = [
  {
    id: 1,
    title: "NexCommerce",
    description: "A full-featured e-commerce platform with real-time inventory, Stripe payments, and a headless CMS. Built for scale with microservices architecture.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe", "Docker"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    demo: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "FlowBoard",
    description: "Real-time collaborative project management tool with Kanban boards, WebSocket sync, and AI-powered task prioritization.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "OpenAI"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    demo: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "DataPulse",
    description: "Analytics dashboard with customizable widgets, data visualization, and automated reporting for SaaS businesses.",
    tech: ["Next.js", "D3.js", "Express", "MySQL", "Chart.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    demo: "#",
    github: "#",
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
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GraphQL"],
  backend: ["Node.js", "Express", "Python", "REST APIs"],
  database: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  devops: ["Docker"],
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