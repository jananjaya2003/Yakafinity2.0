import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { AiAssistant } from "@/components/ai-assistant";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
export const metadata: Metadata = { title: { default: "Yakafinity — Digital Innovation Studio", template: "%s | Yakafinity" }, description: "Yakafinity builds high-performance digital products, AI automation, brands and cloud systems for ambitious businesses.", metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"), icons: { icon: "/yakafinity-logo.png", apple: "/yakafinity-logo.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${manrope.variable} ${space.variable}`}>{children}<AiAssistant/><WhatsAppButton/></body></html>; }
