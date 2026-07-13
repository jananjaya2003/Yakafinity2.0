import { Bot, Code2, CloudCog, Palette, ShieldCheck, Sparkles } from "lucide-react";

export const services = [
  { slug: "ai-automation", title: "AI & Automation", icon: Bot, number: "01", description: "Intelligent agents, workflow automation and practical AI systems designed around measurable business outcomes.", tags: ["AI agents", "Automation", "Integrations"] },
  { slug: "web-development", title: "Web Development", icon: Code2, number: "02", description: "High-performance websites and web applications built with scalable, modern engineering foundations.", tags: ["Next.js", "E-commerce", "Web apps"] },
  { slug: "brand-experience", title: "Brand & Experience", icon: Palette, number: "03", description: "Distinct visual identities and digital experiences that turn attention into trust and lasting customer value.", tags: ["UI/UX", "Brand systems", "Motion"] },
  { slug: "growth-marketing", title: "Growth Marketing", icon: Sparkles, number: "04", description: "Creative campaigns and conversion systems that connect your brand with the right audience at the right moment.", tags: ["Strategy", "Content", "Campaigns"] },
  { slug: "cloud-managed-it", title: "Cloud & Managed IT", icon: CloudCog, number: "05", description: "Secure cloud infrastructure, dependable hosting and proactive technical support that keeps your business moving.", tags: ["Cloud", "Hosting", "Support"] },
  { slug: "cybersecurity", title: "Cybersecurity", icon: ShieldCheck, number: "06", description: "Practical security hardening, risk reviews and resilient systems that protect your data and reputation.", tags: ["Audits", "Hardening", "Monitoring"] }
];

export const nav = [{ label: "Services", href: "/#services" }, { label: "Work", href: "/#work" }, { label: "Process", href: "/#process" }, { label: "About", href: "/about" }];
