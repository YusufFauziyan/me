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
    title: "Boothly",
    description: "Modern Web Photobooth — capture, customize, and download beautiful photo strips right in your browser.",
    tech: ["Next.js", "Tailwind"],
    image: "https://github.com/YusufFauziyan/Boothly/blob/main/public/screenshot-landing.png?raw=true",
    demo: "https://boothly-chi.vercel.app",
    github: "https://github.com/YusufFauziyan/Boothly",
    featured: true,
  },
  {
    id: 5,
    title: "NikahIn",
    description: "NikahIn is a SaaS (Software as a Service) platform for creating elegant and easily customizable digital wedding invitations. With an intuitive interface and modern templates, couples can create their digital invitations quickly and easily.",
    tech: ["Next.js", "Tailwind", "Supabase", "Framer Motion", "Jest", "Midtrans"],
    image: "https://github.com/YusufFauziyan/NikahIn/blob/main/public/screenshot-landing.png?raw=true",
    demo: "https://nikah-in.vercel.app",
    github: "https://github.com/YusufFauziyan/NikahIn",
    featured: true,
  },
];

export const experiences = [
  {
    id: 1,
    role: "Front end & Mobile Developer",
    company: "PT BODHA PADMA NAWADHYA",
    duration: "Sep 2024 — Present",
    description: "Spearheaded the development of high-impact web and mobile applications, including the EMAS enterprise platform. Engineered seamless cross-platform experiences for iOS and Android, focusing on robust state management, efficient REST API integrations, and delivering pixel-perfect, responsive user interfaces.",
    current: true,
  },
  {
    id: 2,
    role: "Front end Developer",
    company: "PT BODHA DHARMAJA ARYADHANA",
    duration: "Jun 2022 — Sep 2024",
    description: "Architected scalable frontend solutions for data-intensive enterprise systems, including Khayangan (VM monitoring) and Sapujagad (Big Data platform). Collaborated closely with backend teams to integrate complex APIs, transforming massive datasets into intuitive, real-time interactive dashboards.",
    current: false,
  },
  {
    id: 3,
    role: "Fullstack Developer",
    company: "DUMBWAYS BOOTCAMP",
    duration: "Feb 2022 — Jun 2022",
    description: "Built full-stack web applications from scratch using the PERN stack (PostgreSQL, Express, React, Node.js). Designed and deployed a functional E-commerce platform and a Music Player app, featuring robust REST APIs, complex database schemas, and seamless Midtrans payment gateway integration.",
    current: false,
  },
  {
    id: 4,
    role: "Barista",
    company: "PT SARI COFFEE INDONESIA",
    duration: "Nov 2017 — Jan 2022",
    description: "Developed strong communication, teamwork, and problem-solving skills in a fast-paced environment. The strict attention to detail and commitment to user satisfaction cultivated here seamlessly translate into my approach to building high-quality, user-centric software.",
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