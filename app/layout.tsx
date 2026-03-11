import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Buddy | $1 开启 AI 实战之旅",
    template: "%s | AI Buddy",
  },
  description: "实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。从 $1 开始，即刻上手。",
  keywords: ["AI", "Agent", "OpenClaw", "MCP", "教程", "配置", "AI工具", "智能体"],
  authors: [{ name: "AI Buddy" }],
  creator: "AI Buddy",
  metadataBase: new URL("https://aibuddy.ltd"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://aibuddy.ltd",
    siteName: "AI Buddy",
    title: "AI Buddy | $1 开启 AI 实战之旅",
    description: "实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。从 $1 开始，即刻上手。",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Buddy | $1 开启 AI 实战之旅",
    description: "实战 AI 教程、开箱即用的 Agent 配置、OpenClaw 工作流模板。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}