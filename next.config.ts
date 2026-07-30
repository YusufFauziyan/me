import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
  env: {
    // NAME
    NAME: "Yusuf Fauziyan Malik",
    FIRST_NAME: "Yusuf",
    LAST_NAME: "Fauziyan",
    NICKNAME: "Malik",
    USERNAME: "yusuffauziyan",

    // JOB 
    JOB_TITLE: '["Fullstack", "Developer"]',
    JOB_DESCRIPTION: 'I build fast, scalable web applications with a focus on clean code and exceptional UX. Specializing in React, Next.js, and Node.js.',

    // SOCIAL MEDIA
    EMAIL_ADDRESS: "yusuffauziyan@gmail.com",
    GITHUB_ADDRESS: "https://github.com/yusuffauziyan",
    LINKEDIN_ADDRESS: "https://www.linkedin.com/in/yusuffauziyan",
    X_ADDRESS: "",
    NEXT_PUBLIC_CV_URL: process.env.NEXT_PUBLIC_CV_URL || "https://drive.google.com/file/d/1FKu9QqWFGHOu4OxVZfcE-JpRNnYW2cgm/view?usp=sharing"
  }
};

export default nextConfig;
